import express from 'express';
import eventRouter from './routers/eventRouter';
import { errorHandler } from './middlewares/errorMiddleware';
var cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/events', eventRouter);

// Error handling middleware
app.use(errorHandler);

app.listen(3000, () => {
  console.log('Listening to port 3000');
});
