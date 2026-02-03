import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import passport from 'passport'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply middleware *before* the application starts listening
  app.use(
    session({
      secret: 'yourSecretKey',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 10000 , // 1 minute session duration
        secure: process.env.NODE_ENV === 'production', // Set to true in production with HTTPS
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  // Start the server
  await app.listen(process.env.PORT ?? 4000);
}

bootstrap();
