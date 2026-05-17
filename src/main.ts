/**
 * Main Application Logic - Fitness Kalkulačka
 * 
 * Architektura:
 * 1. Načtení surových dat z data.ts (ActivityData interface)
 * 2. "Oživení" dat pomocí factory funkce createActivity()
 * 3. Polymorfní práce s objekty (CardioActivity, StrengthActivity)
 * 4. Komunikace s DOM (HTML prvky)
 * 5. Testování polymorfismu v konzoli
 */

import { activities, ActivityData } from './data.js';
import { Activity, CardioActivity, StrengthActivity } from './classes.js';

// ============================================================================
// DOM ELEMENTY
// ============================================================================

const activitySelect = document.getElementById('activitySelect') as HTMLSelectElement;
const specificInputs = document.getElementById('specificInputs') as HTMLDivElement;
const form = document.getElementById('activityForm') as HTMLFormElement;
const activitiesDiv = document.getElementById('activities') as HTMLDivElement;
const summaryDiv = document.getElementById('summary') as HTMLDivElement;

// ============================================================================
// POLE INSTANCÍ AKTIVIT
// ============================================================================

/** Pole všech přidaných aktivit během dne */
let dailyActivities: Activity[] = [];

// ============================================================================
// FACTORY FUNKCE - "OŽIVENÍ" DAT
// ============================================================================

/**
 * Factory funkce - "oživuje" surová data ActivityData do instancí tříd
 * Toto je klíč k oddělení dat od logiky!
 * 
 * @param data - surový datový objekt z katalogo (data.ts)
 * @returns Instanci příslušné třídy (CardioActivity nebo StrengthActivity)
 * @throws Error pokud je typ aktivity neznámý
 */
function createActivity(data: ActivityData): Activity {
    if (data.type === 'cardio') {
        return new CardioActivity(data.id, data.name, data.calorieRate);
    } else if (data.type === 'strength') {
        return new StrengthActivity(data.id, data.name, data.calorieRate);
    } else {
        throw new Error(`Neznámý typ aktivity: ${data.type}`);
    }
}

// ============================================================================
// TESTOVÁNÍ POLYMORFISMU V KONZOLI
// ============================================================================

/**
 * Funkce pro testování polymorfismu
 * Projde všechny dostupné aktivity z katalogu a vytvoří jejich instance
 * Pak polymorfně zavolá jejich metody a vypíše výsledky do konzole
 * 
 * Toto demonstruje:
 * - Factory pattern (vytváření objektů)
 * - Polymorfismus (různé implementace abstraktní třídy)
 * - Encapsulation (privátní vlastnosti, protected dědičnost)
 */
function testPolymorphism(): void {
    console.log('%c=== TESTOVÁNÍ POLYMORFISMU ===', 'font-weight: bold; color: blue; font-size: 14px;');
    console.log('Vytváření instancí aktivit z surových dat a testování polymorfismu...\n');

    // Pole testovacích instancí
    const testActivities: Activity[] = [];

    // Vytvoříme instance z každé aktivity v katalogu
    activities.forEach(activityData => {
        try {
            const activity = createActivity(activityData);
            testActivities.push(activity);
            console.log(`✓ Vytvořena instance: ${activity.constructor.name}`);
        } catch (error) {
            console.error(`✗ Chyba při vytváření aktivity: ${error}`);
        }
    });

    console.log(`\nCelkem vytvořeno instancí: ${testActivities.length}\n`);

    // Nyní nastavíme specifické hodnoty a testujeme polymorfní chování
    console.log('%c--- Nastavování konkrétních hodnot ---', 'font-weight: bold; color: green;');

    if (testActivities[0] instanceof CardioActivity) {
        (testActivities[0] as CardioActivity).setTime(30);
        console.log(`Běh: nastaveno 30 minut`);
    }

    if (testActivities[1] instanceof CardioActivity) {
        (testActivities[1] as CardioActivity).setTime(45);
        console.log(`Plavání: nastaveno 45 minut`);
    }

    if (testActivities[2] instanceof CardioActivity) {
        (testActivities[2] as CardioActivity).setTime(60);
        console.log(`Cyklistika: nastaveno 60 minut`);
    }

    if (testActivities[3] instanceof StrengthActivity) {
        (testActivities[3] as StrengthActivity).setSets(10);
        console.log(`Silový trénink: nastaveno 10 sérií`);
    }

    if (testActivities[4] instanceof StrengthActivity) {
        (testActivities[4] as StrengthActivity).setSets(12);
        console.log(`Kettlebell: nastaveno 12 sérií`);
    }

    if (testActivities[5] instanceof CardioActivity) {
        (testActivities[5] as CardioActivity).setTime(20);
        console.log(`Jóga: nastaveno 20 minut`);
    }

    // Polymorfní volání metod - KLÍČ K POLYMORFISMU!
    // Každá instance má svou vlastní implementaci calculateCalories()
    console.log('%c--- Polymorfní výpis všech aktivit ---', 'font-weight: bold; color: orange;');
    
    let totalCalories = 0;
    testActivities.forEach((activity, index) => {
        const calories = activity.calculateCalories();
        totalCalories += calories;
        console.log(
            `${index + 1}. ${activity.getName()}: ${calories} kcal (${activity.constructor.name})`
        );
    });

    console.log(`\n%cCelkem spáleno kalorií: ${totalCalories} kcal`, 'font-weight: bold; color: red; font-size: 12px;');
    console.log('%c=== KONEC TESTOVÁNÍ ===', 'font-weight: bold; color: blue; font-size: 14px;');
}

// Spustit testování při načtení stránky
testPolymorphism();

// ============================================================================
// UI FUNKCIONALITA
// ============================================================================

/**
 * Naplnění selectu dostupnými aktivitami z katalogu
 */
activities.forEach(activity => {
    const option = document.createElement('option');
    option.value = activity.id.toString();
    option.textContent = activity.name;
    activitySelect.appendChild(option);
});

/**
 * Event listener - zaznamená změnu výběru aktivity a připraví specifické inputy
 * Kolem selectu jsou specifické fieldy pro čas (cardio) nebo série (strength)
 */
activitySelect.addEventListener('change', () => {
    const selectedId = parseInt(activitySelect.value);
    const activity = activities.find(a => a.id === selectedId);
    if (!activity) return;

    specificInputs.innerHTML = '';
    if (activity.type === 'cardio') {
        const label = document.createElement('label');
        label.textContent = 'Čas (minuty):';
        const input = document.createElement('input');
        input.type = 'number';
        input.id = 'timeInput';
        input.min = '1';
        input.required = true;
        specificInputs.appendChild(label);
        specificInputs.appendChild(input);
    } else if (activity.type === 'strength') {
        const label = document.createElement('label');
        label.textContent = 'Počet sérií:';
        const input = document.createElement('input');
        input.type = 'number';
        input.id = 'setsInput';
        input.min = '1';
        input.required = true;
        specificInputs.appendChild(label);
        specificInputs.appendChild(input);
    }
});

/**
 * Event listener - zpracování odeslání formuláře
 * Vytváří novou instanci apropriátní třídy (factory pattern)
 * a přidává ji do denního seznamu aktivit
 */
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const selectedId = parseInt(activitySelect.value);
    const activityData = activities.find(a => a.id === selectedId);
    if (!activityData) return;

    try {
        // Folosim factory funkci
        let activity = createActivity(activityData);

        // Nastavím specifickou hodnotu
        if (activityData.type === 'cardio') {
            const timeInput = document.getElementById('timeInput') as HTMLInputElement;
            const time = parseInt(timeInput.value);
            (activity as CardioActivity).setTime(time);
        } else {
            const setsInput = document.getElementById('setsInput') as HTMLInputElement;
            const sets = parseInt(setsInput.value);
            (activity as StrengthActivity).setSets(sets);
        }

        dailyActivities.push(activity);
        updateDisplay();
        form.reset();
        specificInputs.innerHTML = '';
    } catch (error) {
        alert(`Chyba: ${error}`);
    }
});

/**
 * Funkce - aktualizace zobrazení denních aktivit a souhrnu
 * Polymorfně volá calculateCalories() na všech instancích
 */
function updateDisplay() {
    activitiesDiv.innerHTML = '';
    dailyActivities.forEach((activity, index) => {
        const div = document.createElement('div');
        div.className = 'activity';
        div.innerHTML = `
            <strong>${activity.getName()}</strong><br>
            Spálené kalorie: ${activity.calculateCalories()}<br>
            <button onclick="removeActivity(${index})">Odstranit</button>
        `;
        activitiesDiv.appendChild(div);
    });

    const totalCalories = dailyActivities.reduce((sum, act) => sum + act.calculateCalories(), 0);
    let motivation = '';
    if (totalCalories < 100) motivation = 'Začátek je důležitý! Pokračuj!';
    else if (totalCalories < 300) motivation = 'Dobře jsi začal, přidej!';
    else if (totalCalories < 500) motivation = 'Skvělá práce! Jsi na dobré cestě!';
    else motivation = 'Wow! Jsi fitness fenomén! 🔥';

    summaryDiv.innerHTML = `
        <p><strong>Celkem spálených kalorií: ${totalCalories} kcal</strong></p>
        <p><em>${motivation}</em></p>
    `;
}

/**
 * Funkce - odebrání aktivity ze seznamu
 * Vystavena do globálního scope pro možnost zavolání z HTML onclick
 * 
 * @param index - pozice aktivity v poli, kterou chceme odstranit
 */
function removeActivity(index: number): void {
    if (index >= 0 && index < dailyActivities.length) {
        dailyActivities.splice(index, 1);
        updateDisplay();
    }
}

// Vystavit removeActivity do globálního scope
(window as any).removeActivity = removeActivity;

(window as any).removeActivity = (index: number) => {
    dailyActivities.splice(index, 1);
    updateDisplay();
};