import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUdiDto {
  @ApiProperty({ default: 47.009 })
  @IsNumber()
  @IsNotEmpty()
  value: number;

  @ApiProperty({ default: '2022/08/23' })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @Transform(({ value }) => new Date(value))
  currentDate: Date;
}
