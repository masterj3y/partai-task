import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EventRule, EventRuleDocument } from './model/event-rule.schema';
import { Model, Types } from 'mongoose';
import { CreateERDto } from './dto/create-er.dto';
import { UpdateERDto } from './dto/update-er.dto';
import { EventDocument } from '../events/model/event.schema';
import { EventRuleMatchService } from '../event-rule-match/event-rule-match.service';

@Injectable()
export class EventRuleService {
  private pageSize = 50;

  constructor(
    @InjectModel(EventRule.name)
    private readonly erModel: Model<EventRuleDocument>,
    private readonly ermService: EventRuleMatchService,
  ) {}

  async findById(id: string) {
    const erm = await this.erModel.findOne({ _id: new Types.ObjectId(id) });
    if (!erm) {
      throw new NotFoundException(`No event-rule-match found with id: ${id}`);
    }
    return erm;
  }

  async create(dto: CreateERDto) {
    const erm = await this.erModel.findOne({
      eventType: dto.eventType,
      operator: dto.operator,
    });
    if (erm) {
      throw new ConflictException('Event-rule-match already exists');
    }
    return this.erModel.create(dto);
  }

  async update(id: string, dto: UpdateERDto) {
    const erm = await this.findById(id);

    return this.erModel.findOneAndUpdate(
      { _id: erm._id },
      { $set: dto },
      { new: true },
    );
  }

  async deleteById(id: string) {
    const erm = await this.findById(id);
    if (!erm) {
      throw new NotFoundException(`No event-rule-match found with id: ${id}`);
    }
    await this.erModel.deleteOne({ _id: new Types.ObjectId(id) });
  }

  findByPage(page: number) {
    return this.erModel
      .find()
      .skip((page - 1) * this.pageSize)
      .limit(this.pageSize);
  }

  findMatchedERs(event: EventDocument) {
    return this.erModel.aggregate([
      {
        $match: {
          eventType: event.name,
        },
      },
      {
        $addFields: {
          isMatch: {
            $switch: {
              branches: [
                {
                  case: { $eq: ['$operator', 'lt'] },
                  then: { $lt: [event.value, '$value'] },
                },
                {
                  case: { $eq: ['$operator', 'eq'] },
                  then: { $eq: [event.value, '$value'] },
                },
                {
                  case: { $eq: ['$operator', 'gt'] },
                  then: { $gt: [event.value, '$value'] },
                },
              ],
              default: false,
            },
          },
        },
      },
      {
        $match: {
          isMatch: true,
        },
      },
    ]);
  }

  getEventTimesByRule(ruleId: string, startDate: Date, endDate: Date) {
    return this.ermService.getEventTimesByRule(ruleId, startDate, endDate);
  }

  async getAgentCountsByRule(ruleId: string) {
    return this.ermService.getAgentCountsByRule(ruleId);
  }
}
