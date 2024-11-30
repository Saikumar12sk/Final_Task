import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import 'dotenv/config';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/proxy/tollguru', async (req, res) => {
  const { start, end } = req.body; // Extract start and end locations
  const apiKey = process.env.TOLLGURU_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  if (!start || !end) {
    return res.status(400).json({ error: 'Start and End locations are required' });
  }

  try {
    const response = await fetch('https://api.tollguru.com/v1/route', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({ start, end }), // Pass the input to TollGuru API
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    res.json(data); // Forward the API response to the React app
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => {
  console.log('Proxy server running on http://localhost:5000');
});
