// Data catalog: activities with calorie expenditure per unit
export interface ActivityData {
    id: number;
    name: string;
    type: 'cardio' | 'strength';
    calorieRate: number; // for cardio: per minute, for strength: per set
}

export const activities: ActivityData[] = [
    { id: 1, name: 'Běh', type: 'cardio', calorieRate: 10 }, // 10 cal/min
    { id: 2, name: 'Plavání', type: 'cardio', calorieRate: 8 }, // 8 cal/min
    { id: 3, name: 'Silový trénink', type: 'strength', calorieRate: 5 } // 5 cal/set
];