/**
 * OOP Classes for Fitness Calculator
 * Hierarchie tříd reprezentující různé typy fitness aktivit s polymorfním chováním
 */

/**
 * Abstraktní bázová třída Activity
 * Definuje společné vlastnosti (id, name) a abstraktní metodu pro výpočet kalorií
 * Všechny konkrétní aktivity musí od ní dědit a implementovat calculateCalories()
 */
export abstract class Activity {
    protected id: number;
    protected name: string;

    /**
     * Konstruktor - inicializuje ID a název aktivity
     * @param id - unikátní identifikátor aktivity
     * @param name - jméno aktivity
     * @throws Error pokud je name prázdný řetězec
     */
    constructor(id: number, name: string) {
        if (!name || name.trim() === '') {
            throw new Error('Název aktivity nesmí být prázdný.');
        }
        this.id = id;
        this.name = name;
    }

    /**
     * Vrací ID aktivity
     * @returns identifikátor aktivity
     */
    getId(): number {
        return this.id;
    }

    /**
     * Vrací název aktivity
     * @returns jméno aktivity
     */
    getName(): string {
        return this.name;
    }

    /**
     * Abstraktní metoda pro výpočet spálených kalorií
     * Musí být implementována v každé konkrétní podtřídě
     * @returns počet spálených kalorií jako číslo
     */
    abstract calculateCalories(): number;

    /**
     * Metoda pro získání detailů aktivity
     * @returns textový popis aktivity s počtem spálených kalorií
     */
    getDetails(): string {
        return `${this.name}: ${this.calculateCalories()} kcal`;
    }
}

/**
 * Třída CardioActivity - reprezentuje kardiovaskulární aktivity
 * Dědí z Activity, specifická implementace pro cvičení na vytrvalost (běh, plavání apod.)
 */
export class CardioActivity extends Activity {
    private time: number = 0; // čas v minutách

    /**
     * Konstruktor CardioActivity
     * @param id - identifikátor aktivity
     * @param name - jméno aktivity
     * @param calorieRate - počet spálených kalorií za minutu
     * @throws Error pokud je calorieRate <= 0
     */
    constructor(id: number, name: string, private calorieRate: number) {
        super(id, name);
        if (calorieRate <= 0) {
            throw new Error('Kalorická sazba musí být kladné číslo.');
        }
    }

    /**
     * Nastaví délku trvání kardio cvičení
     * @param time - doba cvičení v minutách
     * @throws Error pokud je time <= 0
     */
    setTime(time: number): void {
        if (time <= 0) {
            throw new Error('Čas cvičení musí být kladný (více než 0 minut).');
        }
        this.time = time;
    }

    /**
     * Vrací dobu trvání cvičení
     * @returns čas v minutách
     */
    getTime(): number {
        return this.time;
    }

    /**
     * Vypočítá spálené kalorie na základě doby cvičení a kalorické sazby
     * @returns počet spálených kalorií
     */
    calculateCalories(): number {
        return this.time * this.calorieRate;
    }

    /**
     * Vrací detailní informace o kardio aktivitě
     * @returns string s popisem aktivity a podrobnostmi
     */
    getDetails(): string {
        return `${this.name} (${this.time} min): ${this.calculateCalories()} kcal`;
    }
}

/**
 * Třída StrengthActivity - reprezentuje silové tréninky
 * Dědí z Activity, specifická implementace pro cvičení na sílu (posilovny apod.)
 */
export class StrengthActivity extends Activity {
    private sets: number = 0; // počet sérií/sad

    /**
     * Konstruktor StrengthActivity
     * @param id - identifikátor aktivity
     * @param name - jméno aktivity
     * @param calorieRate - počet spálených kalorií za sérii
     * @throws Error pokud je calorieRate <= 0
     */
    constructor(id: number, name: string, private calorieRate: number) {
        super(id, name);
        if (calorieRate <= 0) {
            throw new Error('Kalorická sazba musí být kladné číslo.');
        }
    }

    /**
     * Nastaví počet sérií silového tréninku
     * @param sets - počet sad/sérií
     * @throws Error pokud je sets <= 0
     */
    setSets(sets: number): void {
        if (sets <= 0) {
            throw new Error('Počet sérií musí být kladný (více než 0).');
        }
        this.sets = sets;
    }

    /**
     * Vrací počet sérií
     * @returns počet sérií
     */
    getSets(): number {
        return this.sets;
    }

    /**
     * Vypočítá spálené kalorie na základě počtu sérií a kalorické sazby
     * @returns počet spálených kalorií
     */
    calculateCalories(): number {
        return this.sets * this.calorieRate;
    }

    /**
     * Vrací detailní informace o silovém tréninku
     * @returns string s popisem aktivity a podrobnostmi
     */
    getDetails(): string {
        return `${this.name} (${this.sets} sérií): ${this.calculateCalories()} kcal`;
    }
}