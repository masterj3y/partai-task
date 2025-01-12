import { VoltageEvent } from 'src/event/voltage.event';
import { BaseProducer } from './base.producer';

export class VoltageProducer extends BaseProducer<VoltageEvent> {
  generateRandomEvent(id: number): VoltageEvent {
    return {
      id,
      name: 'voltage',
      value: this.randomNumberGenerator.generate(1, 1000),
    };
  }
}
