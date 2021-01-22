import { DrawingsController } from './drawings.controller';
import { DrawingsService } from './drawings.service';
import { Module } from '@nestjs/common';

@Module({
    providers: [DrawingsService],
    controllers: [DrawingsController],
    exports: [DrawingsService]
})
export class DrawingsModule {}
