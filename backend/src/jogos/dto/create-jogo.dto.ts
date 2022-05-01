import { IsDate } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateJogoDto {
  @Transform((x) => new Date(x.value))
  @IsDate()
  data_hora_inicio: Date

  @Transform((x) => new Date(x.value))
  @IsDate()
  data_hora_termino: Date

  Ranking_minimo: number
  Ranking_maximo: number
  Reserva_id: number
}
