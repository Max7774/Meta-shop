import { Controller, Get } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('main')
  @Auth('ADMIN' || 'MANAGER')
  getMainStatistics() {
    return this.statisticsService.getMain();
  }
}
