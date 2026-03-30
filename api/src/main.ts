import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  app.enableCors({
    origin: '*',
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Access-Control-Allow-Methods',
      'Access-Control-Request-Headers',
    ],
    credentials: true,
  });
  await app.listen(process.env.NODE_PORT || 3000);
}
bootstrap();
