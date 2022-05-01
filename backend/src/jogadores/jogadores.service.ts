import { Injectable } from '@nestjs/common';
import { CreateJogadoreDto } from './dto/create-jogadore.dto';
import { UpdateJogadoreDto } from './dto/update-jogadore.dto';
import { PrismaService } from '../prisma.service';

const userProps = {
  CPF: true,
  nome: true,
  data_de_nascimento: true
}

@Injectable()
export class JogadoresService {
  constructor(private prisma: PrismaService) {}
  async create(createJogadoreDto: CreateJogadoreDto) {
    return await this.prisma.jogador.create({data:createJogadoreDto});
  }

  async findAll() {
    return await this.prisma.jogador.findMany({select: userProps});
  }

  async findOne(cpf: string) {
    return await this.prisma.jogador.findUnique({where: {CPF: cpf}, select: userProps})
  }

  async update(cpf: string, updateJogadoreDto: UpdateJogadoreDto) {
    return await this.prisma.jogador.update({data: updateJogadoreDto, where:{CPF:cpf}, select: userProps})
  }
  async updateImage(fileRef: any, cpf: string){
    const fs = require("fs")
    const data = fs.readFileSync(fileRef.path, null)
    return await this.prisma.jogador.update({data:{foto: data}, where:{CPF:cpf}, select:{foto:true}})
  }
  async downloadImage(cpf: string){
    const foto = (await this.prisma.jogador.findUnique({where:{CPF:cpf}, select:{foto: true}})).foto
    return foto
  }

  async remove(cpf: string) {
    return await this.prisma.jogador.delete({where: {CPF: cpf}})
  }
}
