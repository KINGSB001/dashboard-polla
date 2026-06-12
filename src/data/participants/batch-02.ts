import type { Participant } from '../../types/polla'

export const PARTICIPANTS_BATCH_02: Participant[] = [
  {
    id: 6,
    nombre: 'Mateo Sánchez',
    correo: 'Sanchezcalebmateo@gmail.com',
    predicciones: {
      partidos: {
        match1: { t1: 2, t2: 1 },
        match2: { t1: 1, t2: 2 },
      },
      bonos: {
        campeon: 'España',
        subcampeon: 'Francia',
        tercer: 'Argentina',
        cuarto: 'Brasil',
        goleador: 'Kylian Mbappé',
        eq_goleador: 'Francia',
        valla_vencida: 'España',
      },
    },
  },
  {
    id: 7,
    nombre: 'Henry Barreto',
    correo: 'gerenciafdv@gmail.com',
    predicciones: {
      partidos: {
        match1: { t1: 2, t2: 0 },
        match2: { t1: 2, t2: 0 },
      },
      bonos: {
        campeon: 'España',
        subcampeon: 'Francia',
        tercer: 'Inglaterra',
        cuarto: 'Argentina',
        goleador: 'Harry Kane',
        eq_goleador: 'Inglaterra',
        valla_vencida: 'Catar',
      },
    },
  },
  {
    id: 8,
    nombre: 'David Gabriel',
    correo: 'david.gabriel.barreto.2008@gmail.com',
    predicciones: {
      partidos: {
        match1: { t1: 2, t2: 0 },
        match2: { t1: 1, t2: 1 },
      },
      bonos: {
        campeon: 'Francia',
        subcampeon: 'España',
        tercer: 'Inglaterra',
        cuarto: 'Argentina',
        goleador: 'Kylian Mbappé',
        eq_goleador: 'Francia',
        valla_vencida: 'Curazao',
      },
    },
  },
  {
    id: 9,
    nombre: 'Santiago Barreto',
    correo: 'santiagobarretogarcia6@gmail.com',
    predicciones: {
      partidos: {
        match1: { t1: 1, t2: 0 },
        match2: { t1: 2, t2: 1 },
      },
      bonos: {
        campeon: 'España',
        subcampeon: 'Portugal',
        tercer: 'Inglaterra',
        cuarto: 'Colombia',
        goleador: 'Kylian Mbappé',
        eq_goleador: 'Francia',
        valla_vencida: 'Panamá',
      },
    },
  },
  {
    id: 10,
    nombre: 'Camilo Muete',
    correo: 'olimac91122@gmail.com',
    predicciones: {
      partidos: {
        match1: { t1: 1, t2: 1 },
        match2: { t1: 2, t2: 0 },
      },
      bonos: {
        campeon: 'Portugal',
        subcampeon: 'España',
        tercer: 'Colombia',
        cuarto: 'Inglaterra',
        goleador: 'Kylian Mbappé',
        eq_goleador: 'España',
        valla_vencida: 'Cabo Verde',
      },
    },
  },
]
