import { ApiProperty } from '@nestjs/swagger';

export class EventCountDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  count: number;
}
