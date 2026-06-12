import express from 'express';
import Openrouteservice from 'openrouteservice';
import { Profile } from 'openrouteservice/dist/common.js';
import { DirectionsFormat } from 'openrouteservice/dist/directions.js';

const app = express();
app.use(express.json());

const API_KEY = process.env.ORS_API_KEY || 'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImZmMjlhOWU1ZWFlYTQ5ZDBhZmRjMTllMjAwYzA1MzcyIiwiaCI6Im11cm11cjY0In0=';
const ors = new Openrouteservice(API_KEY);

// Directions endpoint
app.post('/api/directions', async (req, res) => {
  const { coordinates } = req.body;

  if (!Array.isArray(coordinates) || coordinates.length < 2) {
    return res.status(400).json({
      error: 'coordinates must be an array of at least two [lng, lat] pairs',
    });
  }

  try {
    const directions = await ors.getDirections(
      Profile.FOOT_WALKING,
      DirectionsFormat.GEOJSON,
      { coordinates }
    );

    res.json(directions);
  } catch (error) {
    console.error('ORS request failed:', error);
    res.status(500).json({ error: error.message || 'ORS request failed' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
