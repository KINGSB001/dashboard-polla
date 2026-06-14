# Guía de actualización de datos

## Objetivo

Dejar claro qué archivo tocar según el tipo de cambio que llegue desde Forms, Excel o resultados oficiales.

## Fuentes oficiales actuales

- Respuestas del primer corte: `FORMULARIOS/F1.xlsx`
- Respuestas del segundo corte: `FORMULARIOS/F2.xlsx`
- Respuestas del tercer corte: `FORMULARIOS/F3.xlsx`
- Respuestas del cuarto corte: `FORMULARIOS/F4.xlsx`
- Reglas oficiales: `FORMULARIOS/MUNDIAL2026 REGLAS.pdf`

## Si cambia un participante o entran nuevos participantes

Actualizar uno de estos archivos:

- `src/data/participants/batch-01.ts`
- `src/data/participants/batch-02.ts`

Si ya no caben bien, crear otro:

- `src/data/participants/batch-03.ts`

Y agregarlo en:

- `src/data/index.ts`

## Si aparecen nuevos partidos

Actualizar:

- `src/data/matches/groupStage.ts`
- `src/data/matches/knockoutStage.ts`

Cada partido debe tener:

- `id` único
- `label`
- `stage`
- `t1`
- `t2`
- `fecha`

## Si llegan resultados reales

Actualizar:

- `src/data/results/matchResults.ts`

Ejemplo:

```ts
match1: { t1: 2, t2: 1 }
```

## Si se definen bonos ganados

Actualizar:

- `src/data/results/bonusResults.ts`

Ejemplo:

```ts
campeon: 'España'
```

## Si cambian las reglas de puntos

Actualizar:

- `src/config/pollaConfig.ts`

Valores disponibles:

- `marcadorExacto`
- `resultadoAcertado`
- `bonoCorrecto`

## Orden recomendado cuando me mandes insumos

1. Excel o export del formulario con participantes.
2. Resultado oficial de partidos jugados.
3. Reglas o aclaraciones nuevas.
4. Si hay bonos resueltos, lista final del bono.

## Validación después de cada cambio

```bash
cd "/Volumes/MAC/MAC EXTERNO/Projects/dashboard-polla"
source ~/.zshrc
pnpm run build
```

## Publicación

```bash
git add .
git commit -m "actualiza datos de la polla"
git push
pnpm run deploy
```
