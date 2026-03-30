import { HttpModuleAsyncOptions } from '@nestjs/axios';
import logLoader from './loaders/logLoader';

export const logConfig: HttpModuleAsyncOptions = {
  useFactory: () => {
    return {
      baseURL: `${logLoader().logEndpoint}`,
      headers: { 'application-token': logLoader().logToken },
    };
  },
};
