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
import { ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { EventRule } from './model/event-rule.schema';
import { EventTimesDto } from './dto/event-times.dto';
import { EventCountDto } from './dto/event-count.dto';

@ApiTags('event-rule')
@Controller('event-rule')
export class EventRuleController {
  constructor(private readonly erService: EventRuleService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get event rule by ID' })
  @ApiResponse({
    status: 200,
    description: 'Event Rule',
    type: EventRule,
  })
  findById(@Param('id', ParseMongoIdPipe) id: string) {
    return this.erService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new Event Rule' })
  @ApiResponse({
    status: 201,
    description: 'Event Rule',
    type: EventRule,
  })
  create(@Body() dto: CreateERDto) {
    return this.erService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an Event Rule by ID' })
  @ApiResponse({
    status: 201,
    description: 'Event Rule',
    type: EventRule,
  })
  update(@Param('id', ParseMongoIdPipe) id: string, @Body() dto: UpdateERDto) {
    return this.erService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an Event Rule by ID' })
  @ApiResponse({ status: 200 })
  delete(@Param('id', ParseMongoIdPipe) id: string) {
    return this.erService.deleteById(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get event rules by page' })
  @ApiResponse({
    status: 200,
    description: 'List of Event Rules',
    type: [EventRule],
  })
  @Get()
  findByPage(@Query('page', ParseIntPipe) page: number) {
    return this.erService.findByPage(page);
  }

  @Get('times/:id')
  @ApiOperation({
    summary: 'Get event occurrence times per Agent by Event Rule ID',
  })
  @ApiResponse({
    status: 200,
    description: 'List of timestamps',
    type: [EventTimesDto],
  })
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
  @Get('times/:id')
  @ApiOperation({ summary: 'Get event const per Agent by Event Rule ID' })
  @ApiResponse({
    status: 200,
    description: 'List of timestamps',
    type: [EventCountDto],
  })
  getAgentCountsByRule(@Param('id', ParseMongoIdPipe) ruleId: string) {
    return this.erService.getAgentCountsByRule(ruleId);
  }
}
