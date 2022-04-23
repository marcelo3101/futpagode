import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';

@Injectable()
export class ReservasService {
  constructor(private prisma: PrismaService) {}
  async create(createReservaDto: CreateReservaDto) {
    return await this.prisma.reserva.create({data:createReservaDto})
  }

  async findAll() {
    return await this.prisma.reserva.findMany()
  }

  async findOne(id: number) {
    return await this.prisma.reserva.findUnique({where: {id:id}})
  }

  async update(id: number, updateReservaDto: UpdateReservaDto) {
    return await this.prisma.reserva.update({data: updateReservaDto, where: {id: id}})
  }

  async remove(id: number) {
    return await this.prisma.reserva.delete({where: {id:id}})
  }
}
