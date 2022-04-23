import { IsDate } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateJogadoreDto {
  CPF: string
  nome: string   

  @Transform((x) => new Date(x.value))
  @IsDate()
  data_de_nascimento: Date
  
  Ranking: number
}
