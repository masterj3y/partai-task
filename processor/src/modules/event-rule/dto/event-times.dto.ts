import { ApiProperty } from '@nestjs/swagger';

export class EventTimesDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  eventTimes: string[];
}
