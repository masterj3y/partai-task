import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  EventRuleMatch,
  EventRuleMatchDocument,
} from './model/event-rule-match.schema';
import { Model, Types } from 'mongoose';
import { CreateERMDto } from './dto/create-erm.dto';
import { RedisClientType } from '@redis/client';
import {
  isDifferenceMoreThan24Hours,
  validateTimeSpan,
} from 'src/common/utils/day-diff.util';

@Injectable()
export class EventRuleMatchService {
  constructor(
    @InjectModel(EventRuleMatch.name)
    private readonly ermModel: Model<EventRuleMatchDocument>,
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType,
  ) {}

  create(dto: CreateERMDto) {
    return this.ermModel.create(dto);
  }

  async appendEventToCache(ruleId: string, newEvent: any) {
    const cacheKey = `rule:${ruleId}:events`;

    await this.redisClient.zAdd(cacheKey, {
      score: newEvent.createdAt.getTime(),
      value: JSON.stringify(newEvent),
    });
  }

  async getEventTimesByRule(ruleId: string, startDate: Date, endDate: Date) {
    if (isDifferenceMoreThan24Hours(startDate, endDate)) {
      throw new BadRequestException(
        'The time span must be equal to or less than one day.',
      );
    }

    if (!validateTimeSpan(startDate, endDate)) {
      throw new BadRequestException(
        'End date must be greater than start date.',
      );
    }

    const cacheKey = `rule:${ruleId}:events`;

    const cachedData = await this.redisClient.zRangeByScore(
      cacheKey,
      startDate.getTime(),
      endDate.getTime(),
    );

    if (cachedData.length > 0) {
      return cachedData.map((item) => JSON.parse(item));
    }

    const result = await this.ermModel.aggregate([
      {
        $match: {
          'eventRule._id': new Types.ObjectId(ruleId),
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: '$instanceId',
          eventTimes: { $push: '$createdAt' },
        },
      },
    ]);

    await Promise.all(
      result.map((doc) =>
        this.redisClient.zAdd(cacheKey, {
          score: doc.eventTimes[0].getTime(),
          value: JSON.stringify(doc),
        }),
      ),
    );

    return result;
  }
  async getAgentCountsByRule(ruleId: string) {
    const cacheKey = `rule:${ruleId}:agentCounts`;
    const cachedData = await this.redisClient.get(cacheKey);

    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const result = await this.ermModel.aggregate([
      {
        $match: {
          'eventRule._id': new Types.ObjectId(ruleId),
        },
      },
      {
        $group: {
          _id: '$instanceId',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    await this.redisClient.setEx(cacheKey, 3600, JSON.stringify(result));
    return result;
  }
}
