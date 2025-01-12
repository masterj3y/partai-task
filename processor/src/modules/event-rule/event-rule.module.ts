import { Module } from '@nestjs/common';
import { EventRuleService } from './event-rule.service';
import { EventRuleController } from './event-rule.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EventRule, EventRuleSchema } from './model/event-rule.schema';
import { EventRuleMatchModule } from '../event-rule-match/event-rule-match.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EventRule.name, schema: EventRuleSchema },
    ]),
    EventRuleMatchModule,
  ],
  providers: [EventRuleService],
  controllers: [EventRuleController],
  exports: [EventRuleService],
})
export class EventRulesModule {}
