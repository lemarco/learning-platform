import { getEnv } from '@learning-platform-monorepo/env';
import express from 'express';
import jwt from 'jsonwebtoken';
import useragent from 'express-useragent';
import { generateAuthUrl, gooogleSignin } from './google';
import { Request } from 'express';
import { logger } from '@learning-platform-monorepo/logger';
const app = express();
const envs = {
  jwtSecret: getEnv('JWT_SECRET'),
};
app.use(express.json());
app.use(useragent.express());
app.post('/verify', async (req, res) => {
  const accesstoken = req.cookies.access_token || null;
  const refreshtoken = req.cookies.refresh_token || null;
  if (!accesstoken || !refreshtoken) {
    res.status(401);
    return res.end();
  }
  try {
    const result = jwt.verify(accesstoken, envs.jwtSecret);
    return res.json({
      data: result,
    });
  } catch (err) {
    if (err.name !== 'TokenExpiredError') {
      res.status(401);
      res.end();
      return;
    }
    // let redis_token = rediscl.get(decoded.uid, function (err, val) {
    //   return err ? null : val ? val : null;
    // });
    // TODO: LOGIC GETTING REFRESH TOKEN FROM REDIS
    const redis_token = { refresh_token: 'dsfsdf', expires: new Date() };
    if (!redis_token || redis_token.refresh_token !== refreshtoken) {
      // ... we are probably dealing with hack attempt, because either
      // there is no refresh token with that value, or the refresh token
      // from request and storage do not equal for that specific user
      res.status(401);
      res.end();
      return;
    }
    // TODO: CREATE EVENT FOR USER TO RE-LOGIN
    // UNIFY DATA OF SUCCESS RESPONSE = > NEED TO GET SOMEWHERE USER_ID TO
    // ESTABLISH CONNECTION IN GW AND PUT ID AS MAP KEY
    res.status(200);
    res.end();
  }
});
app.get('/google-link', async (_, res) => {
  try {
    const data = await generateAuthUrl();
    res.json(data);
  } catch (e) {
    res.status(400);
    res.end();
  }
});
app.get('/signin/google', async (req: Request & { useragent: string }, res) => {
  const code = req.query.code;
  if (!code) {
    res.status(400);
    res.end();
  }
  const { ip, useragent } = req;
  try {
    const data = await gooogleSignin({
      ip,
      useragent,
      code: String(code),
    });
    return res.json(data);
  } catch (e) {
    res.status(401);
    res.end();
  }
  return {};
  ///req.query;
});
app.get('/logout', async (req, res) => {
  res.clearCookie('_access_token');

  // TODO: DELETE ACCESS TOKEN FROM REDIS (IF EXISTS)
  // TODO: EMIT EVENT to KILL CONNECTION ON GW
  res.redirect('/');
});

export const listen = (port: number) => {
  app.listen(port, 'localhost', () =>
    logger.info('HTTP server establishing success')
  );
};
