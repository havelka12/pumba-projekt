# Fitness Kalkulačka - Tréninkový Deník

Kompletní implementace fitness kalkulačky v TypeScriptu s přísným dodržením Object-Oriented Programming principů.
Aplikace demonstruje polymorfismus, factory pattern, validaci dat a čisté kódové architektury.

## Jak spustit

1. Nainstalujte Node.js a npm (pokud nemáte).
2. Spusťte `npm install` pro instalaci závislostí.
3. Spusťte `npm run build` pro kompilaci TypeScriptu do JavaScriptu.
4. Otevřete `index.html` v prohlížeči.
5. Otevřete **Developer Console** (F12) pro bezdotazí polymorfismu a testovací výstupy.

## Architektura

### Object-Oriented Design
- **`src/classes.ts`**: Hierarchie tříd s abstraktní bázovou třídou
  - `Activity` - abstraktní bázová třída s `calculateCalories()` metodou
  - `CardioActivity` - konkrétní implementace pro kardio aktivity (běh, plavání, apod.)
  - `StrengthActivity` - konkrétní implementace pro silové aktivity (posilovna, kettlebell, apod.)
  
- **`src/data.ts`**: Datový číselník - oddělení dat od logiky
  - Pole `ActivityData` objektů se surými daty
  - 6 přednastavených aktivit s kalorůnými sazbami
  
- **`src/main.ts`**: Aplikační logika
  - `createActivity()` - Factory funkce pro "oživení" dat do objektů
  - `testPolymorphism()` - Testovací funkce demonstrující polymorfismus v konzoli
  - Event listenery pro DOM manipulaci
  
- **`index.html`**: Uživatelské rozhraní

## Key Features

✅ **Abstraktní třídy a polymorfismus** - Různé implementace базовой metody
✅ **Factory pattern** - Vytváření objektů z datového katalogu
✅ **Validace dat** - Ochrana proti nevalidním hodnotám v konstruktorech
✅ **Encapsulation** - Správné modifikátory přístupu (private, protected, public)
✅ **JSDoc komentáře** - Dokumentace přímo v kódu
✅ **Oddělení dat od logiky** - SOLID principy

## Funkce Aplikace

- 📋 Výběr fitness aktivity z katalogu
- ⏱️ Zadání specifických hodnot (čas pro kardio, série pro silový trénink)
- 📊 Automatický výpočet spálených kalorií
- 📈 Denní přehled s celkovým souhrnem
- 💪 Motivační zprávy na základě výkonu
- 🗑️ Odstranění jednotlivých aktivit

## Git Historie

Projekt má 3 průběžné commity dokumentující vývoj:

1. **1e0566b** - Vylepšena OOP struktura tříd s validací a komentáři
   - Abstraktní bázová třída Activity
   - Konkrétní potomci CardioActivity a StrengthActivity
   - Detailní JSDoc dokumentace
   - Lepší validace v konstruktorech

2. **5e027c4** - Práce s datovým číselníkem
   - Rozšíření katalogu z 3 na 6 aktivit
   - Oddělení dat od logiky
   - Komentáře vysvětlující datový model

3. **85525ca** - Factory funkce a testování polymorfismu v konzoli
   - Factory funkce `createActivity()`
   - Testovací funkce `testPolymorphism()`
   - Polymorfní volání metod
   - Console.log output demonstrující OOP principy

## Testování v Konzoli

Při načtení stránky se automaticky spustí `testPolymorphism()` funkce, která:
- Vytváří instance všech aktivit z katalogu
- Nastavuje testovací hodnoty (časy a série)
- Polymorfně volá `calculateCalories()` na všech objektech
- Vypíše výsledky s barevným formátováním

**Otevřete Developer Console (F12) pro bezdotazí výstupu!**

## Principy a Patterns

- **OOP**: Dědičnost, abstraktní třídy, polymorfismus
- **Factory Pattern**: Vytváření objektů z dat
- **Encapsulation**: Privátní vlastnosti, chráněné metody
- **SOLID**: Oddělení dat od logiky, jednosměrná odpovědnost
- **Validace**: Ochrana dat v konstruktorech a setterech

## Technologie

- **TypeScript** - Staticky typovaný JavaScript
- **HTML5** - Uživatelské rozhraní
- **CSS** - Základní styling
- **Git** - Správa verzí