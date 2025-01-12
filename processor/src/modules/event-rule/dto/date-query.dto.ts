import { IsDateString } from 'class-validator';

export class DateQueryDto {
  @IsDateString()
  startDate: string;
  @IsDateString()
  endDate: string;
}
