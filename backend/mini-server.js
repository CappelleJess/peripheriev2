import express from 'express';

const app = express();

app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend opérationnel' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Test: http://localhost:${PORT}`);
});