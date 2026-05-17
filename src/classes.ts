// OOP Classes for Fitness Calculator

export abstract class Activity {
    protected id: number;
    protected name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    abstract calculateCalories(): number;
}

export class CardioActivity extends Activity {
    private time!: number; // in minutes

    constructor(id: number, name: string, private calorieRate: number) {
        super(id, name);
    }

    setTime(time: number): void {
        if (time <= 0) throw new Error('Čas musí být kladný.');
        this.time = time;
    }

    getTime(): number {
        return this.time;
    }

    calculateCalories(): number {
        return this.time * this.calorieRate;
    }
}

export class StrengthActivity extends Activity {
    private sets!: number;

    constructor(id: number, name: string, private calorieRate: number) {
        super(id, name);
    }

    setSets(sets: number): void {
        if (sets <= 0) throw new Error('Počet sérií musí být kladný.');
        this.sets = sets;
    }

    getSets(): number {
        return this.sets;
    }

    calculateCalories(): number {
        return this.sets * this.calorieRate;
    }
}