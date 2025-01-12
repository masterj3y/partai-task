import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { EventRule } from 'src/modules/event-rule/model/event-rule.schema';

export type EventRuleMatchDocument = HydratedDocument<EventRuleMatch>;

@Schema({ _id: false })
class Event {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  value: number;
}

@Schema({ timestamps: true })
export class EventRuleMatch {
  @Prop({ required: true, index: true })
  instanceId: string;
  @Prop({ required: true, type: EventRule })
  eventRule: EventRule;
  @Prop({ required: true })
  event: Event;
  @Prop({ required: true, default: Date.now() })
  createdAt: Date;
}

export const EventRuleMatchSchema =
  SchemaFactory.createForClass(EventRuleMatch);
