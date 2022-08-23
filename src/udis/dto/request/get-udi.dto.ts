import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';

export class GetByDateParams {
  @ApiProperty({ default: '2022/08/23' })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @Transform(({ value }) => new Date(value))
  date: Date;
}
