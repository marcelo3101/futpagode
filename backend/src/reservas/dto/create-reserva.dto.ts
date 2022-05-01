import { IsDate } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateReservaDto {
  preco: number

  @Transform((x) => new Date(x.value))
  @IsDate()
  data_hora_inicio: Date

  @Transform((x) => new Date(x.value))
  @IsDate()
  data_hora_termino: Date

  Campo_id: number
  reservador_CPF: string
}
