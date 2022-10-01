import { Controller, Get, Query } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { Auth } from 'src/security/auth/decorators/aut.decorator';
import { SearchDto } from './dto/search.dto';
import { SearchHistoryDto } from './dto/searcher-history.dto';
import { SearcherService } from './searcher.service';

@Controller('searcher')
export class SearcherController {
  constructor(private readonly searcherService: SearcherService) {}

  @ApiBody({ type: SearchDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get()
  @Auth()
  find(@Query() searchDto: SearchDto) {
    return this.searcherService.search(searchDto);
  }

  @ApiBody({ type: SearchHistoryDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get('history')
  getHistory(@Query() searchHistoryDto: SearchHistoryDto) {
    return this.searcherService.getHistory(searchHistoryDto);
  }
}
