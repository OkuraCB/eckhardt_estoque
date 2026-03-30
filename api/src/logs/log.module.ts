import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { logConfig } from 'src/config/logConfig';
import { LogApiHttpWrapper } from './wrapper/logApi.wrapper';

@Module({
  imports: [{ ...HttpModule.registerAsync(logConfig) }],
  providers: [{ provide: LogApiHttpWrapper, useExisting: HttpService }],
  exports: [LogApiHttpWrapper],
})
export class LogModule {}
