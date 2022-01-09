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
    .getArtsTest()
    .then((val) => {
      res.json(val);
    })
    .catch((err) => {
      console.error(err);
    });
});

router.post('/search', (_req: Request, res: Response) => {
  console.log(_req.body);
  client
    .getArts(_req.body.data)
    .then((val) => {
      console.log(val);
      res.json(val);
    })
    .catch((err) => {
      console.error(err);
    });
});

router.post('/searchById', (_req: Request, res: Response) => {
  console.log(_req.body);
  client
    .getArtsById(_req.body.data)
    .then((val) => {
      console.log(val);
      res.json(val);
    })
    .catch((err) => {
      console.error(err);
    });
});

router.post('/stock', (_req: Request, res: Response) => {
  console.log(_req.body);
  client
    .setStockList(_req.body.data)
    .then((val) => {
      console.log(val);
      res.json(val);
    })
    .catch((err) => {
      console.error(err);
    });
});

router.get('/stock', (_req: Request, res: Response) => {
  client
    .getStockList()
    .then((val) => {
      res.json(val);
    })
    .catch((err) => {
      console.error(err);
    });
});

router.get('/stockByCode', (_req: Request, res: Response) => {
  const code: string = _req.query.code as string;
  if (code) {
    client
      .getStockByCode(code)
      .then((val) => {
        res.json(val);
      })
      .catch((err) => {
        console.error(err);
      });
  }
});

export default router;
