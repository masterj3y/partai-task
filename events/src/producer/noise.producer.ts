import { NoiseEvent } from 'src/event/noise.event';
import { BaseProducer } from './base.producer';

export class NoiseProducer extends BaseProducer<NoiseEvent> {
  generateRandomEvent(id: number): NoiseEvent {
    return {
      id,
      name: 'noise',
      value: this.randomNumberGenerator.generate(1, 100),
    };
  }
}
