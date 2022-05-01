import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const anuncios = [
  {
    Jogo_id: 1,
    titulo: "",
    descricao: ""
  }
]
const campos = [
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
const cidades = [
  {
    nome: "",
    estado: ""
  }
]
const donosDeCampo = [
  {
    CPF: "00000000000",
    nome: ""
  }
]
const jogadores = [
  {
    CPF: "00000000000",
    nome: "",
    data_de_nascimento: new Date(),
    Ranking: 0
  }
]
const jogos = [
  {
    data_hora_inicio: new Date(),
    data_hora_termino: new Date(),
    Ranking_minimo: 0,
    Ranking_maximo: 0,
    Reserva_id: 1
  }
]
const rankings = [
  {
    nivel: 0,
    nome: "iniciante",
    descricao: "primeiro ranking"
  }
]
const reservas = [
  {
    preco: 0,
    data_hora_inicio: new Date(),
    data_hora_termino: new Date(),
    Campo_id: 1,
    reservador_CPF: "00000000000"
  }
]
const times = [
  {
    nome: "Flamengo",
    criador: "00000000000",
    Jogador: "00000000000"
  }
]
const torneios = [
  {
    data_de_inicio: new Date(),
    data_de_termino: new Date(),
    descricao: "",
    nome: "",
    Ranking_minimo: 0,
    Ranking_maximo: 0,
    Time_vencedor: 1,
    formato: 1
  }
]
const formatos = [
  {
    nome: "",
    descricao: "" 
  }
]

async function main() {
  
}
main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })