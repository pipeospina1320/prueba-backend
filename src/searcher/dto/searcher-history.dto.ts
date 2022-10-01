import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class SearchHistoryDto {
  @ApiProperty({
    default: 1,
  })
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  page?: number;

  @ApiProperty({
    default: 10,
  })
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  per_page?: number;
}
