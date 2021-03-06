import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JogosService } from './jogos.service';
import { CreateJogoDto } from './dto/create-jogo.dto';
import { UpdateJogoDto } from './dto/update-jogo.dto';
import { EnterJogoDto } from './dto/enter_jogo.dto';

@Controller('jogos')
export class JogosController {
  constructor(private readonly jogosService: JogosService) {}

  @Post()
  create(@Body() createJogoDto: CreateJogoDto) {
    return this.jogosService.create(createJogoDto);
  }

  @Post("enter")
  enterJogo(@Body() enterJogoDto: EnterJogoDto ) {
    return this.jogosService.enterOrQuitJogo(enterJogoDto);
  }
  
  @Delete("quit/:cpf/:id")
  quitJogo(@Param('cpf') cpf: string, @Param('id') id: string ) {
    const data: EnterJogoDto = {
      Jogador_CPF: cpf, 
      Jogo_id: +id
    }
    return this.jogosService.enterOrQuitJogo(data);
  }

  @Get()
  findAll() {
    return this.jogosService.findAll();
  }

  @Get('/withcreator')
  findWithCreator() {
    return this.jogosService.jogosComCriador();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jogosService.findOne(+id);
  }

  @Get('joga/:cpf')
  findJoga(@Param('cpf') cpf: string) {
    return this.jogosService.jogosJogador(cpf);
  }

  @Get('criou/:cpf')
  findCriou(@Param('cpf') cpf: string) {
    return this.jogosService.jogosCriadosPorJogador(cpf);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJogoDto: UpdateJogoDto) {
    return this.jogosService.update(+id, updateJogoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jogosService.remove(+id);
  }
}
