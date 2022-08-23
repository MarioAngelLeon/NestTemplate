import { ApiProperty } from '@nestjs/swagger';

export class createOkResponse {
  @ApiProperty({ example: 44.729 })
  value: number;
  @ApiProperty({ example: '2022-08-21T05:00:00.000Z' })
  currentDate: Date;
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({ example: true })
  isActive: boolean;
  @ApiProperty({ example: '2022-08-23T18:37:33.707Z' })
  created_at: Date;
  @ApiProperty({ example: '2022-08-23T18:37:33.707Z' })
  updated_at: Date;
}

export class BadRequestCreateUdi {
  @ApiProperty({ example: 400 })
  statusCode: number;
  @ApiProperty({
    example: [
      'value should not be empty',
      'value must be a number conforming to the specified constraints',
      'currentDate must be a Date instance',
      'currentDate should not be empty',
    ],
  })
  message: string[];
  @ApiProperty({ example: 'Bad Request' })
  error: string;
}
