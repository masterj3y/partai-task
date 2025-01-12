import { PressureEvent } from 'src/event/pressure.event';
import { BaseProducer } from './base.producer';

export class PressureProducer extends BaseProducer<PressureEvent> {
  generateRandomEvent(id: number): PressureEvent {
    return {
      id,
      name: 'pressure',
      value: this.randomNumberGenerator.generate(1, 999),
    };
  }
}
