import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TracksModule } from './tracks/tracks.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'client') }),
    TracksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
