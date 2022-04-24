import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JogadoresService } from './jogadores.service';
import { CreateJogadoreDto } from './dto/create-jogadore.dto';
import { UpdateJogadoreDto } from './dto/update-jogadore.dto';

@Controller('jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  create(@Body() createJogadoreDto: CreateJogadoreDto) {
    return this.jogadoresService.create(createJogadoreDto);
  }

  @Get()
  findAll() {
    return this.jogadoresService.findAll();
  }

  @Get(':cpf')
  findOne(@Param('cpf') cpf: string) {
    return this.jogadoresService.findOne(cpf);
  }

  @Post('/login')
  login(@Body() data: {cpf: string}) {
    return this.jogadoresService.findOne(data.cpf);
  }

  @Patch(':cpf')
  update(@Param('cpf') cpf: string, @Body() updateJogadoreDto: UpdateJogadoreDto) {
    return this.jogadoresService.update(cpf, updateJogadoreDto);
  }

  @Delete(':cpf')
  remove(@Param('cpf') cpf: string) {
    return this.jogadoresService.remove(cpf);
  }
}
