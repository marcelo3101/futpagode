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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jogadoresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJogadoreDto: UpdateJogadoreDto) {
    return this.jogadoresService.update(+id, updateJogadoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jogadoresService.remove(+id);
  }
}
