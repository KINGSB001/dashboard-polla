# Dashboard Polla Mundialista 2026

Proyecto React + Vite para administrar y publicar la polla del mundial.

## Ubicación del proyecto

- Carpeta principal: `/Volumes/MAC/MAC EXTERNO/Projects/dashboard-polla`
- Acceso directo: `/Volumes/MAC/MAC EXTERNO/Downloads/dashboard-polla`

## Comandos útiles

```bash
cd "/Volumes/MAC/MAC EXTERNO/Projects/dashboard-polla"
source ~/.zshrc
pnpm run dev
pnpm run build
git push
pnpm run deploy
```

## Dónde vive cada cosa

- UI principal: `src/components`
- Tipos: `src/types/polla.ts`
- Configuración general: `src/config/pollaConfig.ts`
- Partidos: `src/data/matches`
- Resultados reales: `src/data/results`
- Participantes: `src/data/participants`
- Guía de actualización: `docs/ACTUALIZAR_POLLADATA.md`
- Insumos futuros: `insumos`

## Cómo quedó organizado

- Las predicciones ahora se guardan por `id` de partido.
- Los bonos quedaron separados de los partidos.
- Los participantes se dividieron por bloques para no crecer en un solo archivo.
- Los resultados reales están aparte para que podamos actualizarlos sin tocar la UI.

## Flujo de actualización

1. Me mandas el archivo Excel, CSV o captura con nuevos datos.
2. Yo actualizo:
   - participantes
   - partidos
   - resultados
   - puntos
3. Probamos con `pnpm run build`.
4. Si quieres publicarlo, hacemos:

```bash
git add .
git commit -m "actualiza polla"
git push
pnpm run deploy
```
