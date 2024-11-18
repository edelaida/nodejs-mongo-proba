import express from "express";
import pino from 'pino-http';
import cors from 'cors';
import {env} from './utils/env.js'
//import {initMongoConnection} from './db/initMongoConnection.js'

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
    const app = express();
    app.use(express.json());
    app.use(cors());

app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

app.get('/', (req, res)=> {
    res.json({
        message: 'Hello world!',
      });    
});

app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);    
});
};

// async function bootstrap() {
//   try {
//     await initMongoConnection();

//     const PORT = process.env.PORT || 8080;

//     app.listen(PORT, () => {
//       console.log(`Server started on port ${PORT}`);
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }

// bootstrap();
