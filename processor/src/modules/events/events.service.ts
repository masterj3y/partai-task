import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Event, EventDocument } from './model/event.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<EventDocument>,
  ) {}

  create(event: Event) {
    return this.eventModel.create(event);
  }
}
