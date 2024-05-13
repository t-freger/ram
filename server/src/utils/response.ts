import { CookieOptions, Response } from 'express';
import { Duration } from 'luxon';
import { CookieResponse, ramCookie } from 'src/dtos/auth.dto';

export const respondWithCookie = <T>(res: Response, body: T, { isSecure, values }: CookieResponse) => {
  const defaults: CookieOptions = {
    path: '/',
    sameSite: 'lax',
    httpOnly: true,
    secure: isSecure,
    maxAge: Duration.fromObject({ days: 400 }).toMillis(),
  };

  const cookieOptions: Record<ramCookie, CookieOptions> = {
    [ramCookie.AUTH_TYPE]: defaults,
    [ramCookie.ACCESS_TOKEN]: defaults,
    // no httpOnly so that the client can know the auth state
    [ramCookie.IS_AUTHENTICATED]: { ...defaults, httpOnly: false },
    [ramCookie.SHARED_LINK_TOKEN]: { ...defaults, maxAge: Duration.fromObject({ days: 1 }).toMillis() },
  };

  for (const { key, value } of values) {
    const options = cookieOptions[key];
    res.cookie(key, value, options);
  }

  return body;
};

export const respondWithoutCookie = <T>(res: Response, body: T, cookies: ramCookie[]) => {
  for (const cookie of cookies) {
    res.clearCookie(cookie);
  }

  return body;
};
