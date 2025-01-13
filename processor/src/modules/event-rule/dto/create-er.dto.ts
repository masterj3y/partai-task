import { IsEnum, IsNumber } from 'class-validator';
import { EventType } from 'src/common/enum/event-type.enum';
import { EROperator } from '../enum/er-operator.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateERDto {
  @ApiProperty()
  @IsEnum(EventType)
  eventType: EventType;
  @ApiProperty()
  @IsEnum(EROperator)
  operator: EROperator;
  @ApiProperty()
  @IsNumber()
  value: number;
}
