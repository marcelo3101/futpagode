import { Injectable } from '@nestjs/common';
import { CreateJogadoreDto } from './dto/create-jogadore.dto';
import { UpdateJogadoreDto } from './dto/update-jogadore.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class JogadoresService {
  constructor(private prisma: PrismaService) {}
  async create(createJogadoreDto: CreateJogadoreDto) {
    return await this.prisma.jogador.create({data:createJogadoreDto});
  }

  async findAll() {
    return await this.prisma.jogador.findMany();
  }

  async findOne(cpf: string) {
    return await this.prisma.jogador.findUnique({where: {CPF: cpf}})
  }

  async update(cpf: string, updateJogadoreDto: UpdateJogadoreDto) {
    return await this.prisma.jogador.update({data: updateJogadoreDto, where:{CPF:cpf}})
  }

  async remove(cpf: string) {
    return await this.prisma.jogador.delete({where: {CPF: cpf}})
  }
}
