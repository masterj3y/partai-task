import { LightIntensityEvent } from 'src/event/light-itensity.event';
import { BaseProducer } from './base.producer';

export class LightIntensityProducer extends BaseProducer<LightIntensityEvent> {
  generateRandomEvent(id: number): LightIntensityEvent {
    return {
      id,
      name: 'light-intensity',
      value: this.randomNumberGenerator.generate(1, 5),
    };
  }
}
