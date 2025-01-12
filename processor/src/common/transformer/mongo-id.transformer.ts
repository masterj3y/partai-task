import { PipeTransform, BadRequestException } from '@nestjs/common';
import { isMongoId } from 'class-validator';

export class ParseMongoIdPipe implements PipeTransform {
  transform(value: any) {
    if (!isMongoId(value)) {
      throw new BadRequestException(`Invalid MongoDB ObjectId: ${value}`);
    }
    return value;
  }
}
