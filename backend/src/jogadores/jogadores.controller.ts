import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { JogadoresService } from './jogadores.service';
import { CreateJogadoreDto } from './dto/create-jogadore.dto';
import { UpdateJogadoreDto } from './dto/update-jogadore.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

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

  @Post(":cpf/avatar")
  @UseInterceptors(
    FileInterceptor("photo", {
      dest: "./uploads"
    })
  )
  uploadAvatar(@Param('cpf') cpf: string, @UploadedFile() fileRef){
    console.log(fileRef)
    return this.jogadoresService.updateImage(fileRef, cpf)
  }

  @Get(":cpf/avatar")
  async downLoadAvatar(@Param('cpf') cpf: string, @Res() response: Response){
    const file = await this.jogadoresService.downloadImage(cpf)
    response.set('Content-Type', 'image/*')
    response.status(200).send(file)
  }

  @Delete(':cpf')
  remove(@Param('cpf') cpf: string) {
    return this.jogadoresService.remove(cpf);
  }
}
