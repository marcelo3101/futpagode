import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const rankings: Prisma.RankingCreateManyInput[] = [
  {
    nivel: 0,
    nome: "iniciante",
    descricao: "primeiro ranking"
  }
]

const donosDeCampo: Prisma.DonoDeCampoCreateManyInput[] = [
  {
    CPF: "00000000000",
    nome: ""
  }
]
const cidades: Prisma.CidadeCreateManyInput[] = [
  {
    nome: "",
    estado: "",
  }
]
const campos: Prisma.CampoCreateManyInput[] = [
  {
    nome: "",
    descricao: "",
    preco_hora: 0,
    horario_de_funcionamento: "",
    CEP: "00000000",
    Complemento: "",
    Bairro: "",
    dono_CPF: "00000000000",
    Cidade_id: 1
  }
]
const jogadores: Prisma.JogadorCreateManyInput[] = [
  {
    CPF: "00000000000",
    nome: "",
    data_de_nascimento: new Date(),
    Ranking: 0
  }
]

const reservas: Prisma.ReservaCreateManyInput[] = [
  {
    preco: 0,
    data_hora_inicio: new Date(),
    data_hora_termino: new Date(),
    Campo_id: 1,
    reservador_CPF: "00000000000"
  }
]

const jogos: Prisma.JogoCreateManyInput[] = [
  {
    data_hora_inicio: new Date(),
    data_hora_termino: new Date(),
    Ranking_minimo: 0,
    Ranking_maximo: 0,
    Reserva_id: 1
  }
]
const anuncios: Prisma.AnuncioCreateManyInput[] = [
  {
    Jogo_id: 1,
    titulo: "",
    descricao: ""
  }
]

const times: Prisma.TimeCreateManyInput[] = [
  {
    nome: "Flamengo",
    criador: "00000000000"
  }
]
const torneios: Prisma.TorneioCreateManyInput[] = [
  {
    data_de_inicio: new Date(),
    data_de_termino: new Date(),
    descricao: "",
    nome: "",
    Ranking_minimo: 0,
    Ranking_maximo: 0,
    Time_vencedor: 1,
    formato: ""
  }
]
const formatos: Prisma.formatoCreateManyInput[] = [
  {
    nome: "",
    descricao: "" 
  }
]

async function main() {
  console.log(`Start seeding ...`)
  await prisma.ranking.deleteMany({where:{}})
  await prisma.ranking.createMany({data:rankings})

  await prisma.donoDeCampo.deleteMany({where:{}})
  await prisma.donoDeCampo.createMany({data:donosDeCampo})

  await prisma.cidade.deleteMany({where:{}})
  await prisma.cidade.createMany({data:cidades})

  await prisma.jogador.deleteMany({where:{}})
  await prisma.jogador.createMany({data: jogadores})

  await prisma.campo.deleteMany({where:{}})
  await prisma.campo.createMany({data: campos})

  await prisma.reserva.deleteMany({where:{}})
  await prisma.reserva.createMany({data:reservas})

  await prisma.jogo.deleteMany({where:{}})
  await prisma.jogo.createMany({data:jogos})

  await prisma.anuncio.deleteMany({where:{}})
  await prisma.anuncio.createMany({data:anuncios})

  await prisma.time.deleteMany({where:{}})
  await prisma.time.createMany({data:times})

  await prisma.formato.deleteMany({where:{}})
  await prisma.formato.createMany({data:formatos})

  await prisma.torneio.deleteMany({where:{}})
  await prisma.torneio.createMany({data:torneios})

  console.log("seeding finished")
}
main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })