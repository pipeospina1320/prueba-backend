import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { AxiosResponse } from 'axios';
import { Repository } from 'typeorm';
import { SearchDto } from './dto/search.dto';
import { SearchHistoryDto } from './dto/searcher-history.dto';
import { History } from './entities/history.entity';

@Injectable()
export class SearcherService {
  private readonly logger = new Logger();
  constructor(
    @InjectRepository(History)
    private historyRepository: Repository<History>,
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async search(searchDto: SearchDto): Promise<AxiosResponse<[]>> {
    const API_KEY = this.configService.get('API_KEY');
    const url = this.configService.get('API_GOOGLE');
    const { query, latitude, longitude } = searchDto;
    this.storeHistory(searchDto);
    try {
      const resp = await this.httpService.axiosRef.get(url, {
        params: {
          key: API_KEY,
          radius: 1500,
          type: 'restaurant',
          keyword: query,
          location: `${latitude},${longitude}`,
        },
        headers: {
          Authorization: `Client-ID ${process.env.SEARCHER_ACCESS_KEY}`,
        },
      });
      return resp.data;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Server error');
    }
  }

  async storeHistory(searchDto: SearchDto) {
    const { query, latitude, longitude } = searchDto;
    const history = this.historyRepository.create({
      search: query,
      latitude,
      longitude,
    });
    await this.historyRepository.save(history);
  }

  async getHistory(searchHistoryDto: SearchHistoryDto) {
    console.log(searchHistoryDto);
    const { per_page, page } = searchHistoryDto;

    try {
      const history = await this.historyRepository
        .createQueryBuilder('h')
        .skip((page - 1) * per_page)
        .take(per_page)
        .getMany();

      return history;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Server error');
    }
  }
}
