import { Module } from '@nestjs/common';
import { EventRuleMatchService } from './event-rule-match.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  EventRuleMatch,
  EventRuleMatchSchema,
} from './model/event-rule-match.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EventRuleMatch.name, schema: EventRuleMatchSchema },
    ]),
  ],
  providers: [EventRuleMatchService],
  exports: [EventRuleMatchService],
})
export class EventRuleMatchModule {}
