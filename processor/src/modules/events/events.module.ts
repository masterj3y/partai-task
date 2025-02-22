import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './model/event.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
  ],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
