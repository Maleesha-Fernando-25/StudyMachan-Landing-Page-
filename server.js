import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

// Serve all static assets from the current directory
app.use(express.static(__dirname));

// Route root to landing-page.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'landing-page.html'));
});

// Friendly aliases for pages
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

// For any other unmatched GET request, fallback to landing-page.html (per vercel.json rewrite)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'landing-page.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`StudyMachan server running at http://${HOST}:${PORT}`);
});
