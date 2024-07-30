/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import diagnoses from '../data/diagnoses';
const router = express.Router();

router.get('/', (_req, res) => {
    res.send(diagnoses);
  });
  
  
  router.post('/', (_req, res) => {
    diagnoses.push(_req.body)
    res.send(_req.body);
  });
  
  export default router;