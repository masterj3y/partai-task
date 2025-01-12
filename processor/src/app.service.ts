import { Injectable } from '@nestjs/common';
import { EventsService } from './modules/events/events.service';
import { CreateEventDto } from './common/dto/create-event.dto';
import { EventRuleMatchService } from './modules/event-rule-match/event-rule-match.service';
import { EventRuleService } from './modules/event-rule/event-rule.service';
import { CreateERDto } from './modules/event-rule/dto/create-er.dto';

@Injectable()
export class AppService {
  constructor(
    private readonly eventsService: EventsService,
    private readonly erService: EventRuleService,
    private readonly ermService: EventRuleMatchService,
  ) {}

  async storeEvent(dto: CreateEventDto) {
    const event = await this.eventsService.create(dto);
    const matchedRules = await this.erService.findMatchedERs(event);
    if (matchedRules.length > 0) {
      await this.ermService.create({
        instanceId: dto.instanceId,
        eventRule: matchedRules[0] as CreateERDto,
        event,
      });
    }
  }
}
