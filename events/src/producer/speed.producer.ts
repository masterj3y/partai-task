import { BaseProducer } from './base.producer';
import { SpeedEvent } from 'src/event/speed.event';

export class SpeedProducer extends BaseProducer<SpeedEvent> {
  generateRandomEvent(id: number): SpeedEvent {
    return {
      id,
      name: 'speed',
      value: this.randomNumberGenerator.generate(1, 99999),
    };
  }
}
