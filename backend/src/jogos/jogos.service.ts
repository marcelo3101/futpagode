import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { EnterJogoDto } from './dto/enter_jogo.dto';
import { CreateJogoDto } from './dto/create-jogo.dto';
import { UpdateJogoDto } from './dto/update-jogo.dto';

@Injectable()
export class JogosService {
  constructor(private prisma: PrismaService) {}
  async create(createJogoDto: CreateJogoDto) {
    return await this.prisma.jogo.create({data:createJogoDto})
  }

  async enterOrQuitJogo({Jogador_CPF, Jogo_id}: EnterJogoDto) {
    const sql = `
    call InscreverOuDesinscreverJogadorEmJogo('${Jogador_CPF}', ${Jogo_id});
    `
    return await this.prisma.$queryRawUnsafe(sql)
  }

  async jogosJogador(cpf: string) {
    const sql = `
      select * from Jogo
      inner join participacao_em_jogo
      where Jogo.id = participacao_em_jogo.Jogo_id and participacao_em_jogo.Jogador_CPF = ${cpf}
    `
    return await this.prisma.$queryRawUnsafe(sql)
  }

  async jogosCriadosPorJogador(cpf: string){
    const sql = `
    select * from Jogo
    where Jogo.Reserva_id in ( 
      select id from Reserva
        where Reserva.reservador_CPF = '${cpf}'
      );
    `
    return await this.prisma.$queryRawUnsafe(sql)
  }

  async findAll() {
    return await this.prisma.jogo.findMany({include:{participacao_em_jogo: true}})
  }

  async jogosComCriador() {
    const sql = `
    select * from jogo_com_criador;
    `
    return await this.prisma.$queryRawUnsafe(sql)
  }

  async findOne(id: number) {
    return await this.prisma.jogo.findUnique({where: {id:id}})
  }

  async update(id: number, createJogoDto: UpdateJogoDto) {
    return await this.prisma.jogo.update({data: createJogoDto, where: {id: id}})
  }

  async remove(id: number) {
    return await this.prisma.jogo.delete({where: {id:id}})
  }
}