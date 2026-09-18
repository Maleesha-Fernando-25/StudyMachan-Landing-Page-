import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Serve static HTML, CSS, JavaScript, and image files.
app.use(express.static(__dirname));

// Friendly page routes.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'landing-page.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'Contact us.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'signup.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'signup.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

app.get('/tutor-dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'tutor-dashboard.html'));
});

// Fallback for unknown browser routes. Static assets are served above.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'landing-page.html'));
});

// Vercel runs this as a serverless function. Listen locally for npm run dev/start.
if (process.env.VERCEL !== '1') {
  app.listen(PORT, HOST, () => {
    console.log(`StudyMachan server running at http://${HOST}:${PORT}`);
  });
}

export default app;
