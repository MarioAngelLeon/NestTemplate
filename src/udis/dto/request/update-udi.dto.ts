import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateUdiDto {
    @ApiProperty({ default: 47.009 })
    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    value: number;
  
    @ApiProperty({ default: '2022/08/23' })
    @IsNotEmpty()
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    @Transform(({ value }) => new Date(value))
    currentDate: Date;
  }
  