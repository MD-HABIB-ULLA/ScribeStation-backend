import { Router } from 'express';
import { generateSignature } from './upload.controller';

const uploadRouter = Router();

uploadRouter.post('/', generateSignature);

export default uploadRouter;
