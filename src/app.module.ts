import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JogadoresModule } from './jogadores/jogadores.module';
import { ReservasModule } from './reservas/reservas.module';

@Module({
  imports: [JogadoresModule, ReservasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
