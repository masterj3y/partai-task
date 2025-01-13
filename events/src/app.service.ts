import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { SpeedProducer } from './producer/speed.producer';
import { TemperatureProducer } from './producer/temperature.producer';
import { ClientProxy } from '@nestjs/microservices';
import { BaseEvent } from './event/base.event';
import { ConfigService } from '@nestjs/config';
import { BaseProducer } from './producer/base.producer';
import { interval, map } from 'rxjs';
import { RandomNumberGenerator } from './util/random.util';
import { PressureProducer } from './producer/pressure.producer';
import { VoltageProducer } from './producer/voltage.producer';
import { LightIntensityProducer } from './producer/light-intensity.producer';
import { NoiseProducer } from './producer/noise.producer';
import * as os from 'os';

@Injectable()
export class AppService implements OnModuleInit {
  private readonly instanceId: string;
  private readonly rps: number;
  private readonly randomNumberGenerator: RandomNumberGenerator;
  private readonly producers: BaseProducer<BaseEvent>[];

  constructor(
    configService: ConfigService,
    @Inject('processor') private readonly processorClient: ClientProxy,
  ) {
    this.instanceId = os.hostname();
    this.rps = configService.get<number>('RPS');
    this.randomNumberGenerator = new RandomNumberGenerator();
    this.producers = [
      new SpeedProducer(),
      new TemperatureProducer(),
      new PressureProducer(),
      new VoltageProducer(),
      new NoiseProducer(),
      new LightIntensityProducer(),
    ];
  }

  async onModuleInit() {
    interval(1000 / this.rps)
      .pipe(
        map((count) => {
          const randomProducerNumber = Math.floor(
            this.randomNumberGenerator.generate(0, this.producers.length),
          );

          const event =
            this.producers[randomProducerNumber].generateRandomEvent(count);

          this.emitEvent({ ...event, instanceId: this.instanceId });
        }),
      )
      .subscribe();
  }

  private emitEvent(event: BaseEvent & { instanceId: string }) {
    this.processorClient.emit('event', event);
  }
}
