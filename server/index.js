import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { getFirestore } from './firebase.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

const fallbackCollections = [
  {
    id: 'fabric-care',
    title: 'Fabric Care',
    description: 'Advanced washing systems for delicate textiles.'
  },
  {
    id: 'cold-storage',
    title: 'Cold Storage',
    description: 'Precision cooling for culinary preservation.'
  },
  {
    id: 'visual-arts',
    title: 'Visual Arts',
    description: 'Cinematic displays for immersive viewing.'
  },
  {
    id: 'climate-control',
    title: 'Climate Control',
    description: 'Atmospheric regulation for modern spaces.'
  }
];

const fallbackProducts = [
  {
    id: 'frostline-fridge',
    name: 'Frostline Smart Fridge',
    description: 'Counter-depth cooling with adaptive humidity drawers.',
    price: 1299
  },
  {
    id: 'airstream-ac',
    name: 'Airstream Climate System',
    description: 'Whisper-quiet climate control for modern spaces.',
    price: 899
  },
  {
    id: 'silkguard-washer',
    name: 'Silkguard Washer',
    description: 'Precision fabric care with steam sanitization.',
    price: 749
  },
  {
    id: 'cinema-view-oled',
    name: 'CinemaView OLED',
    description: 'Ultra-thin 65” display with cinematic clarity.',
    price: 1599
  }
];

app.use(cors());
app.use(express.json());

app.get('/api/collections', async (req, res) => {
  const firestore = getFirestore();

  if (!firestore) {
    return res.json(fallbackCollections);
  }

  try {
    const snapshot = await firestore.collection('collections').get();
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    if (!data.length) {
      return res.json(fallbackCollections);
    }
    return res.json(data);
  } catch (error) {
    return res.json(fallbackCollections);
  }
});

app.get('/api/products', async (req, res) => {
  const firestore = getFirestore();

  if (!firestore) {
    return res.json(fallbackProducts);
  }

  try {
    const snapshot = await firestore.collection('products').get();
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    if (!data.length) {
      return res.json(fallbackProducts);
    }
    return res.json(data);
  } catch (error) {
    return res.json(fallbackProducts);
  }
});

app.post('/api/checkout', (req, res) => {
  const { items } = req.body ?? {};
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ status: 'error', message: 'No items provided.' });
  }
  return res.json({
    status: 'success',
    message: 'Payment authorized (prototype).',
    reference: `demo-${Date.now()}`
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
