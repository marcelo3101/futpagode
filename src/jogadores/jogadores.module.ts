import { Module } from '@nestjs/common';
import { JogadoresService } from './jogadores.service';
import { JogadoresController } from './jogadores.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [JogadoresController],
  providers: [JogadoresService, PrismaService]
})
export class JogadoresModule {}
