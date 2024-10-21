/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app/app.module';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3001',
    // origin: function (origin, callback) {
    //   console.log(origin)
    //   const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
    //   if (!origin || allowedOrigins.indexOf(origin) !== -1) {
    //     // Allow requests with no origin (like mobile apps or curl requests)
    //     callback(null, true);
    //   } else {
    //     callback(new Error('Not allowed by CORS'));
    //   }
    // }, // Replace with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  });

  const port = process.env.PORT || 3000;
  await app.listen(port); // Call listen only once
  Logger.log(`🚀 Application is running on: http://localhost:${port}/`);
}

bootstrap();
