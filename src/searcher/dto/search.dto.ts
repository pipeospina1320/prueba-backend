import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SearchDto {
  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  query?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  latitude?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  longitude?: string;
}
