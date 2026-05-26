import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { firstValueFrom } from 'rxjs';
import { LogApiHttpWrapper } from '../logs/wrapper/logApi.wrapper';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logApiHttpWrapper: LogApiHttpWrapper) {}
  use(req: Request, res: Response, next: NextFunction) {
    if (!process.env.LOG_TOKEN) return null;

    const headers = { headers: { 'application-token': process.env.LOG_TOKEN } };
    const startTime = performance.now();

    res.on('finish', () => {
      const data = {
        httpMethod: req.method,
        contentLength: res.get('content-length'),
        contentType: res.getHeaders()['content-type'],
        userToken: req.headers.authorization.split(' ')[1],
        statusCode: res.statusCode,
        requestDuration: performance.now() - startTime + 'ms',
        message: res.statusMessage,
        userAgent: req.get('user-agent'),
        url: req.url,
      };

      firstValueFrom(this.logApiHttpWrapper.post('/logs', data, headers));

      next();
    });
  }
}
