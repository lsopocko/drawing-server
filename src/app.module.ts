import { DrawingsModule } from './drawings/drawings.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';

@Module({
  imports: [BoardModule, DrawingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
