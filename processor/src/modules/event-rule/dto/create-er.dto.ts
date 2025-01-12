import { IsEnum, IsNumber } from 'class-validator';
import { EventType } from 'src/common/enum/event-type.enum';
import { EROperator } from '../enum/er-operator.enum';

export class CreateERDto {
  @IsEnum(EventType)
  eventType: EventType;
  @IsEnum(EROperator)
  operator: EROperator;
  @IsNumber()
  value: number;
}
