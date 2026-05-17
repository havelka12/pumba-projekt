/**
 * OOP Classes for Fitness Calculator
 * Hierarchie tříd reprezentující různé typy fitness aktivit s polymorfním chováním
 */

/**
 * Abstraktní bázová třída Activity
 * Definuje společné vlastnosti (id, name) a abstraktní metodu pro výpočet kalorií
 */
class Activity {
    constructor(id, name) {
        if (!name || name.trim() === '') {
            throw new Error('Název aktivity nesmí být prázdný.');
        }
        this.id = id;
        this.name = name;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    // Abstraktní metoda - musí být implementována v podtřídách
    calculateCalories() {
        throw new Error('calculateCalories() musí být implementována v podtřídě');
    }

    getDetails() {
        return `${this.name}: ${this.calculateCalories()} kcal`;
    }
}

/**
 * Třída CardioActivity - reprezentuje kardiovaskulární aktivity
 * Dědí z Activity, specifická implementace pro cvičení na vytrvalost
 */
class CardioActivity extends Activity {
    constructor(id, name, calorieRate) {
        super(id, name);
        if (calorieRate <= 0) {
            throw new Error('Kalorická sazba musí být kladné číslo.');
        }
        this.calorieRate = calorieRate;
        this.time = 0; // čas v minutách
    }

    setTime(time) {
        if (time <= 0) {
            throw new Error('Čas cvičení musí být kladný (více než 0 minut).');
        }
        this.time = time;
    }

    getTime() {
        return this.time;
    }

    calculateCalories() {
        return this.time * this.calorieRate;
    }

    getDetails() {
        return `${this.name} (${this.time} min): ${this.calculateCalories()} kcal`;
    }
}

/**
 * Třída StrengthActivity - reprezentuje silové tréninky
 * Dědí z Activity, specifická implementace pro cvičení na sílu
 */
class StrengthActivity extends Activity {
    constructor(id, name, calorieRate) {
        super(id, name);
        if (calorieRate <= 0) {
            throw new Error('Kalorická sazba musí být kladné číslo.');
        }
        this.calorieRate = calorieRate;
        this.sets = 0; // počet sérií/sad
    }

    setSets(sets) {
        if (sets <= 0) {
            throw new Error('Počet sérií musí být kladný (více než 0).');
        }
        this.sets = sets;
    }

    getSets() {
        return this.sets;
    }

    calculateCalories() {
        return this.sets * this.calorieRate;
    }

    getDetails() {
        return `${this.name} (${this.sets} sérií): ${this.calculateCalories()} kcal`;
    }
}

// Export tříd pro main.js
window.Activity = Activity;
window.CardioActivity = CardioActivity;
window.StrengthActivity = StrengthActivity;
