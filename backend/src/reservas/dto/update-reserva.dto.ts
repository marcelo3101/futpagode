import { PartialType } from '@nestjs/mapped-types';
import { CreateReservaDto } from './create-reserva.dto';
import { IsDate } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateReservaDto extends PartialType(CreateReservaDto) {
  preco: number
  
  @Transform((x) => new Date(x.value))
  @IsDate()
  data_hora_inicio: Date

  @Transform((x) => new Date(x.value))
  @IsDate()
  data_hora_termino: Date
}
