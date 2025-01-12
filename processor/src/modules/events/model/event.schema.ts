import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EventDocument = HydratedDocument<Event>;

@Schema({ timestamps: true })
export class Event {
  @Prop({ required: true, index: true })
  instanceId: string;
  @Prop({ required: true, index: true })
  name: string;
  @Prop({ required: true })
  value: number;
}

export const EventSchema = SchemaFactory.createForClass(Event);
