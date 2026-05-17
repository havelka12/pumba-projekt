/**
 * Data Catalog - Datový číselník fitness aktivit
 * Obsahuje surová data (plain objects) o dostupných aktivitách
 */

/**
 * Katalog dostupných aktivit
 * Pole se surými daty představujícími nabídku fitness aktivit
 */
const activities = [
    { id: 1, name: 'Běh', type: 'cardio', calorieRate: 10 }, // 10 kcal/min
    { id: 2, name: 'Plavání', type: 'cardio', calorieRate: 8 }, // 8 kcal/min
    { id: 3, name: 'Cyklistika', type: 'cardio', calorieRate: 7 }, // 7 kcal/min
    { id: 4, name: 'Silový trénink', type: 'strength', calorieRate: 5 }, // 5 kcal/série
    { id: 5, name: 'Cvičení s kettlebell', type: 'strength', calorieRate: 6 }, // 6 kcal/série
    { id: 6, name: 'Jóga', type: 'cardio', calorieRate: 3 }, // 3 kcal/min
];

// Export pro main.js
window.activities = activities;
