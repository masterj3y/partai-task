import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Get,
  Delete,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { EventRuleService } from './event-rule.service';
import { ParseMongoIdPipe } from 'src/common/transformer/mongo-id.transformer';
import { CreateERDto } from './dto/create-er.dto';
import { UpdateERDto } from './dto/update-er.dto';
import { DateQueryDto } from './dto/date-query.dto';

@Controller('event-rule')
export class EventRuleController {
  constructor(private readonly erService: EventRuleService) {}

  @Get(':id')
  findById(@Param('id', ParseMongoIdPipe) id: string) {
    return this.erService.findById(id);
  }

  @Post()
  create(@Body() dto: CreateERDto) {
    return this.erService.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseMongoIdPipe) id: string, @Body() dto: UpdateERDto) {
    return this.erService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseMongoIdPipe) id: string) {
    return this.erService.deleteById(id);
  }

  @Get()
  findByPage(@Query('page', ParseIntPipe) page: number) {
    return this.erService.findByPage(page);
  }

  @Get('times/:id')
  getEventTimesByRule(
    @Param('id') ruleId: string,
    @Query(ValidationPipe) query: DateQueryDto,
  ) {
    return this.erService.getEventTimesByRule(
      ruleId,
      new Date(query.startDate),
      new Date(query.endDate),
    );
  }

  @Get('agents/:id')
  getAgentCountsByRule(@Param('id', ParseMongoIdPipe) ruleId: string) {
    return this.erService.getAgentCountsByRule(ruleId);
  }
}
