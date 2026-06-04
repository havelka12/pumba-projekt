/**
 * Data Catalog - Datový číselník fitness aktivit
 * Obsahuje surová data (plain objects) o dostupných aktivitách
 * Tyto data se později "nažívají" na objekty tříd v main.ts
 */

/**
 * Interface ActivityData
 * Definuje strukturu datového objektu reprezentujícího fitness aktivitu
 */
export interface ActivityData {
    id: number;              // unikátní identifikátor
    name: string;            // název aktivity
    type: 'cardio' | 'strength'; // typ aktivity
    calorieRate: number;     // kalorická sazba (za minutu nebo za sérii)
}

/**
 * Katalog dostupných aktivit
 * Pole se surými daty představujícími nabídku fitness aktivit
 * 
 * Kardio aktivity:
 * - calorieRate = kalorie za minutu
 * 
 * Silové aktivity:
 * - calorieRate = kalorie za sérii
 */
export const activities: ActivityData[] = [
    { id: 1, name: 'Běh', type: 'cardio', calorieRate: 10 }, // 10 kcal/min
    { id: 2, name: 'Plavání', type: 'cardio', calorieRate: 8 }, // 8 kcal/min
    { id: 3, name: 'Cyklistika', type: 'cardio', calorieRate: 7 }, // 7 kcal/min
    { id: 4, name: 'Silový trénink', type: 'strength', calorieRate: 5 }, // 5 kcal/série
    { id: 5, name: 'Cvičení s kettlebell', type: 'strength', calorieRate: 6 }, // 6 kcal/série
    { id: 6, name: 'Jóga', type: 'cardio', calorieRate: 3 }, // 3 kcal/min
    { id: 7, name: 'Nordic walking', type: 'cardio', calorieRate: 6 }, // 6 kcal/min
    { id: 8, name: 'Rychlá chůze', type: 'cardio', calorieRate: 5 }, // 5 kcal/min
    { id: 9, name: 'Skákání přes švihadlo', type: 'cardio', calorieRate: 12 }, // 12 kcal/min
    { id: 10, name: 'Box', type: 'cardio', calorieRate: 10 }, // 10 kcal/min
    { id: 11, name: 'Kickbox', type: 'cardio', calorieRate: 11 }, // 11 kcal/min
    { id: 12, name: 'Plank + core', type: 'strength', calorieRate: 4 }, // 4 kcal/série
    { id: 13, name: 'Crossfit', type: 'strength', calorieRate: 8 }, // 8 kcal/série
    { id: 14, name: 'Calisthenics', type: 'strength', calorieRate: 7 }, // 7 kcal/série
    { id: 15, name: 'Turistika', type: 'cardio', calorieRate: 6 }, // 6 kcal/min
    { id: 16, name: 'Lezení na stěně', type: 'cardio', calorieRate: 9 }, // 9 kcal/min
    { id: 17, name: 'Paddleboarding', type: 'cardio', calorieRate: 8 }, // 8 kcal/min
    { id: 18, name: 'Squash', type: 'cardio', calorieRate: 11 }, // 11 kcal/min
    { id: 19, name: 'Tenis', type: 'cardio', calorieRate: 9 }, // 9 kcal/min
    { id: 20, name: 'Basketbal', type: 'cardio', calorieRate: 10 }, // 10 kcal/min
    { id: 21, name: 'Fotbal', type: 'cardio', calorieRate: 9 }, // 9 kcal/min
    { id: 22, name: 'Hokej', type: 'cardio', calorieRate: 10 }, // 10 kcal/min
    { id: 23, name: 'Badminton', type: 'cardio', calorieRate: 8 }, // 8 kcal/min
    { id: 24, name: 'Volejbal', type: 'cardio', calorieRate: 8 }, // 8 kcal/min
    { id: 25, name: 'Rugby', type: 'cardio', calorieRate: 10 }, // 10 kcal/min
    { id: 26, name: 'Basketbal 3x3', type: 'cardio', calorieRate: 10 }, // 10 kcal/min
    { id: 27, name: 'Florbal', type: 'cardio', calorieRate: 9 }, // 9 kcal/min
    { id: 28, name: 'Rolování', type: 'cardio', calorieRate: 8 }, // 8 kcal/min
    { id: 29, name: 'Skateboarding', type: 'cardio', calorieRate: 7 }, // 7 kcal/min
    { id: 30, name: 'Kitesurfing', type: 'cardio', calorieRate: 11 }, // 11 kcal/min
    { id: 31, name: 'Surfování', type: 'cardio', calorieRate: 10 }, // 10 kcal/min
    { id: 32, name: 'Tanec', type: 'cardio', calorieRate: 7 }, // 7 kcal/min
    { id: 33, name: 'Veslování', type: 'cardio', calorieRate: 9 }, // 9 kcal/min
    { id: 34, name: 'Silový kruhový trénink', type: 'strength', calorieRate: 7 }, // 7 kcal/série
    { id: 35, name: 'TRX', type: 'strength', calorieRate: 6 }, // 6 kcal/série
    { id: 36, name: 'Zvedání činek', type: 'strength', calorieRate: 7 }, // 7 kcal/série
];