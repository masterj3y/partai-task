import { PartialType } from '@nestjs/mapped-types';
import { CreateERDto } from './create-er.dto';

export class UpdateERDto extends PartialType(CreateERDto) {}
