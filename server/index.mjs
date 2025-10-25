import express from 'express';
import cors from 'cors';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '1mb' }));
app.use(cors());

// Health check
app.get('/health', (_req, res) => res.json({ ok: true }));

// Per-request Python process (avoids long-lived TF process locks on macOS)
const repoRoot = path.resolve(__dirname, '..');
const pythonScript = path.resolve(repoRoot, 'DL', 'app.py');

function runPythonOnce(payload, timeoutMs = 60000) {
  return new Promise((resolve, reject) => {
    const child = spawn('python3', [pythonScript], {
      cwd: repoRoot,
      stdio: ['pipe', 'pipe', 'pipe'],
      env: {
        ...process.env,
        TF_CPP_MIN_LOG_LEVEL: '2',
        OMP_NUM_THREADS: '1',
        TF_NUM_INTRAOP_THREADS: '1',
        TF_NUM_INTEROP_THREADS: '1',
        PYTHONUNBUFFERED: '1',
        OBJC_DISABLE_INITIALIZE_FORK_SAFETY: 'YES',
        KMP_DUPLICATE_LIB_OK: 'TRUE',
        KMP_AFFINITY: 'disabled',
        TF_ENABLE_ONEDNN_OPTS: '0',
      }
    });

    let stdout = '';
    let stderr = '';
    const timer = setTimeout(() => {
      try { child.kill('SIGKILL'); } catch {}
      reject(new Error('Python prediction timed out'));
    }, timeoutMs);

    child.stdout.on('data', (d) => (stdout += d.toString()));
    child.stderr.on('data', (d) => (stderr += d.toString()));
    child.on('error', (err) => {
      clearTimeout(timer);
      reject(new Error('Failed to start Python process: ' + err.message));
    });
    child.on('close', (code) => {
      clearTimeout(timer);
      if (code !== 0 && !stdout.trim()) {
        return reject(new Error(`Python exited with code ${code}. stderr: ${stderr}`));
      }
      try {
        const json = JSON.parse(stdout.trim());
        resolve(json);
      } catch (e) {
        reject(new Error('Invalid JSON from Python. stderr: ' + stderr));
      }
    });

    // Send payload to Python stdin
    child.stdin.write(JSON.stringify(payload));
    child.stdin.end();
  });
}

app.post('/api/predict', async (req, res) => {
  const payload = req.body || {};
  try {
    const result = await runPythonOnce(payload, 60000); // 60s timeout
    if (result && result.error) {
      return res.status(400).json(result);
    }
    return res.json(result);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Bridge server listening on http://localhost:${PORT}`);
});
