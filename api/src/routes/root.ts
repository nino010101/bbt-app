import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(`<h1>this is express rest api + ts boiler plate</h1>`);
  });

export default router;