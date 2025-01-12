import { BaseProducer } from './base.producer';
import { TemperatureEvent } from 'src/event/temperature.event';

export class TemperatureProducer extends BaseProducer<TemperatureEvent> {
  generateRandomEvent(id: number): TemperatureEvent {
    return {
      id,
      name: 'temperature',
      value: this.randomNumberGenerator.generate(-100, 100),
    };
  }
}
