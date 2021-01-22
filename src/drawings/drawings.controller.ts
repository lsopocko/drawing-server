import { DrawingsService } from './drawings.service';
import { Controller, Get } from '@nestjs/common';

@Controller('drawings')
export class DrawingsController {
  constructor(private readonly drawingsService: DrawingsService) {}

  @Get('all')
  all(): any[] {
    return ['asdsd']
  }
}
