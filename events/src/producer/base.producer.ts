import { BaseEvent } from 'src/event/base.event';
import { RandomNumberGenerator } from 'src/util/random.util';

export abstract class BaseProducer<T extends BaseEvent> {
  protected readonly randomNumberGenerator = new RandomNumberGenerator();
  abstract generateRandomEvent(id: number): T;
}
