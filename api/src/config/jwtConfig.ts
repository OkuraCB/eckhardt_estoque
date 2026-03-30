import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import jwtLoader from './loaders/jwtLoader';

export const jwtConfig: JwtModuleAsyncOptions = {
  useFactory: () => {
    return {
      secret: jwtLoader().jwtSecret,
      signOptions: { expiresIn: '24hrs' },
    };
  },
};
