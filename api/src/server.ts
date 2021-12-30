import express from 'express';
import cors from 'cors';
import router from './routes';

// CORS setting
// const allowedOrigins: string[] = [config.get('front.url')];
const options: cors.CorsOptions = {
  origin: '*',
};

const app: express.Express = express();
const PORT = process.env.PORT || 3000;
app.use(cors(options));
app.use(express.json());

app.use(router);
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
