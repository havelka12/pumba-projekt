# Fitness Kalkulačka - Tréninkový Deník

Tento projekt je implementací fitness kalkulačky pomocí OOP principů v TypeScriptu.

## Jak spustit

1. Nainstalujte Node.js a npm (pokud nemáte).
2. Spusťte `npm install` pro instalaci závislostí.
3. Spusťte `npm run build` pro kompilaci TypeScriptu do JavaScriptu.
4. Otevřete `index.html` v prohlížeči.

## Architektura

- `src/data.ts`: Datový číselník aktivit.
- `src/classes.ts`: OOP třídy (Activity, CardioActivity, StrengthActivity).
- `src/main.ts`: Logika aplikace a DOM interakce.
- `index.html`: HTML rozhraní.

## Funkce

- Výběr aktivity z katalogu.
- Zadání specifických hodnot (čas pro kardio, série pro silové).
- Přidání do denního přehledu.
- Zobrazení souhrnu spálených kalorií s motivačním hodnocením.