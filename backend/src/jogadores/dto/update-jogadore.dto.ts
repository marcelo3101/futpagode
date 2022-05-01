import { PartialType } from '@nestjs/mapped-types';
import { CreateJogadoreDto } from './create-jogadore.dto';
import { IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateJogadoreDto extends PartialType(CreateJogadoreDto) {  
  nome: string   
  @Type(() => Date)
  @IsDate()
  data_de_nascimento: Date
  Ranking: number
  foto?: Buffer
}
