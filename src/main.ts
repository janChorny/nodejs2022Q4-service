import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger/dist';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { FavoritesModule } from './favorites/favorites.module';
import { AuthModule } from './auth/auth.module';

async function bootstrap() {
  const PORT = Number(process.env.PORT) || 4000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Home library service')
    .setDescription('Simple music service')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [
      AuthModule,
      UserModule,
      TrackModule,
      AlbumModule,
      ArtistModule,
      FavoritesModule,
    ],
  });

  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT, () =>
    console.log(`Server is running on port: ${PORT}`),
  );
}
bootstrap();
