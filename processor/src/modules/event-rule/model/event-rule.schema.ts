import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EventType } from 'src/common/enum/event-type.enum';
import { EROperator } from '../enum/er-operator.enum';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type EventRuleDocument = HydratedDocument<EventRule>;

@Schema({ timestamps: true })
export class EventRule {
  @ApiProperty()
  @Prop({ required: true, index: true, enum: EventType })
  eventType: EventType;
  @ApiProperty()
  @Prop({ required: true, enum: EROperator })
  operator: EROperator;
  @ApiProperty()
  @Prop({ required: true })
  value: number;
}

export const EventRuleSchema = SchemaFactory.createForClass(EventRule);
