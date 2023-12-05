import { getEnv } from '@learning-platform-monorepo/env';
import express from 'express';
import jwt from 'jsonwebtoken';
import useragent from 'express-useragent';
import { generateAuthUrl, gooogleSignin } from './google';
const app = express();
app.use(express.json());
app.use(useragent.express());

// const emitNewTokensEvent = (redis_token) => {
//   if (redis_token.expires > new Date()) {
//     // refresh token expired, we issue refresh token as well
//     const refresh_token = generate_refresh_token(64);

//     // Then we assign this token into httpOnly cookie using response
//     // object. I disabled the secure option - if you're running on
//     // localhost, keep it disabled, otherwise uncomment it if your
//     // web app uses HTTPS protocol
//     res.cookie('__refresh_token', refresh_token, {
//       // secure: true,
//       httpOnly: true,
//     });

//     // Then we refresh the expiration for refresh token. 1 month from now
//     let refresh_token_maxage = new Date() + getEnv('JWT_REFRESH_EXPIRATION');

//     // And then we save it in Redis
//     rediscl.set(
//       decoded.uid,
//       JSON.stringify({
//         refresh_token: refresh_token,
//         expires: refresh_token_maxage,
//       }),
//       rediscl.print
//     );
//   }

//   // Then we issue access token. Notice that we save user ID
//   // inside the JWT payload
//   let token = jwt.sign({ uid: decoded.uid }, jwt_secret, {
//     expiresIn: jwt_expiration,
//   });

//   // Again, let's assign this token into httpOnly cookie.
//   res.cookie('__access_token', token, {
//     // secure: true,
//     httpOnly: true,
//   });
// };
import { Request } from 'express';

app.post('/verify', async (req, res) => {
  const accesstoken = req.cookies.access_token || null;
  const refreshtoken = req.cookies.refresh_token || null;
  if (!accesstoken || !refreshtoken) {
    res.status(401);
    return res.end();
  }
  try {
    const result = jwt.verify(accesstoken, getEnv('JWT_SECRET'));
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
    const { token, opts } = await gooogleSignin({
      ip,
      useragent,
      code: String(code),
    });
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
  app.listen(port);
};
