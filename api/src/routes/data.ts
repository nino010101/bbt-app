// this is test code for data i/o
import express, { Request, Response } from 'express';
import DBClient from '../services/db';

const router = express.Router();
const client = new DBClient();

router.get('/data', (_req: Request, res: Response) => {
  /*
  const name = _req.query.name ? _req.query.name.toString() : '';
  const email = _req.query.email ? _req.query.email.toString() : '';
  if (email === '') {
    res.send(`no parameter`);
    return;
  }
  */
  client
    .getArts(['神格'])
    .then((val) => {
      res.json(val);
    })
    .catch((err) => {
      console.error(err);
    });
});

export default router;
