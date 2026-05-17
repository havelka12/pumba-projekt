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
];