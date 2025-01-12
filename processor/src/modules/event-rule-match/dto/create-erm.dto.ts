import { CreateERDto } from 'src/modules/event-rule/dto/create-er.dto';

export interface Event {
  name: string;
  value: number;
}

export interface CreateERMDto {
  instanceId: string;
  eventRule: CreateERDto;
  event: Event;
}
