import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '4000', 10);

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json({ limit: '50mb' }));
app.use(morgan('dev'));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'dream-building-backend', timestamp: new Date().toISOString() });
});

app.get('/', (_req, res) => {
  res.json({ message: 'Dream Building API', version: '2.0.0', endpoints: ['/health', '/api/designs/generate'] });
});

app.post('/api/designs/generate', (req, res) => {
  const { prompt } = req.body;
  res.json({
    success: true,
    design: {
      style: 'modern',
      totalArea: 1800,
      floors: 2,
      rooms: [
        { name: 'Living Room', dimensions: '20x15', purpose: 'family gathering' },
        { name: 'Kitchen', dimensions: '15x12', purpose: 'cooking' },
        { name: 'Master Bedroom', dimensions: '18x14', purpose: 'sleeping' },
        { name: 'Bedroom 2', dimensions: '14x12', purpose: 'sleeping' },
      ],
      orientation: 'east-facing',
      roofType: 'Flat RCC',
      materials: { walls: 'Brick with plaster', flooring: 'Vitrified tiles', roof: 'RCC' },
      sustainabilityFeatures: ['Solar panels', 'Rainwater harvesting', 'Cross ventilation'],
      estimatedCostRange: { min: 2500000, max: 3500000 },
      vastuSuggestions: ['Kitchen in southeast', 'Master bedroom in southwest'],
      prompt: prompt
    }
  });
});

const server = createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  socket.on('disconnect', () => console.log('Client disconnected:', socket.id));
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 API: http://localhost:${PORT}/api`);
  console.log(`💚 Health: http://localhost:${PORT}/health`);
});

export default app;
