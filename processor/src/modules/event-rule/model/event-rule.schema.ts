import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EventType } from 'src/common/enum/event-type.enum';
import { EROperator } from '../enum/er-operator.enum';
import { HydratedDocument } from 'mongoose';

export type EventRuleDocument = HydratedDocument<EventRule>;

@Schema({ timestamps: true })
export class EventRule {
  @Prop({ required: true, index: true, enum: EventType })
  eventType: EventType;
  @Prop({ required: true, enum: EROperator })
  operator: EROperator;
  @Prop({ required: true })
  value: number;
}

export const EventRuleSchema = SchemaFactory.createForClass(EventRule);
