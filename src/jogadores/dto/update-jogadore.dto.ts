import { PartialType } from '@nestjs/mapped-types';
import { CreateJogadoreDto } from './create-jogadore.dto';

export class UpdateJogadoreDto extends PartialType(CreateJogadoreDto) {}
