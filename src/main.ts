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
const daySelect = document.getElementById('daySelect') as HTMLSelectElement;
const specificInputs = document.getElementById('specificInputs') as HTMLDivElement;
const form = document.getElementById('activityForm') as HTMLFormElement;
const activitiesDiv = document.getElementById('activities') as HTMLDivElement;
const summaryDiv = document.getElementById('summary') as HTMLDivElement;
const loginSection = document.getElementById('loginSection') as HTMLDivElement | null;

const STORAGE_KEY = 'fitness-activities';

type SavedActivity = ActivityData & {
    day: string;
    time?: number;
    sets?: number;
};

function loadSavedActivities(): SavedActivity[] {
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        return JSON.parse(raw) as SavedActivity[];
    } catch {
        return [];
    }
}

function saveActivities(activities: SavedActivity[]): void {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
}

function renderLoginSection(): void {
    if (!loginSection) return;
    loginSection.innerHTML = `
        <div style="padding:14px; border-radius:16px; background:#eff6ff; border:1px solid #bfdbfe; color:#0c4a6e;">
            <strong>Ukládání lokálně v prohlížeči</strong><br>
            Data se ukládají jen do tohoto zařízení. Pokud chceš, můžeš později přepnout na cloud.
        </div>
    `;
}

function initApp(): void {
    renderLoginSection();
    updateDisplay();
}

// ============================================================================
// POLE INSTANCÍ AKTIVIT
// ============================================================================

/** Pole všech přidaných aktivit během dne */
let dailyActivities: SavedActivity[] = loadSavedActivities();

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
function formatActivitySummary(activity: Activity): { inputLabel: string; inputValue: string } {
    if (activity instanceof CardioActivity) {
        return { inputLabel: 'Doba cvičení', inputValue: `${activity.getTime()} min` };
    }

    if (activity instanceof StrengthActivity) {
        return { inputLabel: 'Počet sérií', inputValue: `${activity.getSets()} ×` };
    }

    return { inputLabel: 'Parametr', inputValue: '-' };
}

function createActivityFromSaved(saved: SavedActivity): Activity {
    const activity = createActivity(saved);
    if (saved.type === 'cardio' && saved.time) {
        (activity as CardioActivity).setTime(saved.time);
    }
    if (saved.type === 'strength' && saved.sets) {
        (activity as StrengthActivity).setSets(saved.sets);
    }
    return activity;
}

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
activitySelect.selectedIndex = 0;

function updateSpecificInputs(): void {
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
}

/**
 * Event listener - zaznamená změnu výběru aktivity a připraví specifické inputy
 * Kolem selectu jsou specifické fieldy pro čas (cardio) nebo série (strength)
 */
activitySelect.addEventListener('change', updateSpecificInputs);
updateSpecificInputs();
initApp();

/**
 * Event listener - zpracování odeslání formuláře
 * Vytváří novou instanci apropriátní třídy (factory pattern)
 * a přidává ji do denního seznamu aktivit
 */
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const selectedId = parseInt(activitySelect.value);
    const activityData = activities.find(a => a.id === selectedId);
    const day = daySelect.value;
    if (!activityData || !day) return;
    try {
        const saved: SavedActivity = {
            ...activityData,
            day,
        };
        if (activityData.type === 'cardio') {
            const timeInput = document.getElementById('timeInput') as HTMLInputElement;
            const time = parseInt(timeInput.value);
            if (Number.isNaN(time) || time <= 0) throw new Error('Čas musí být kladné číslo.');
            saved.time = time;
        } else {
            const setsInput = document.getElementById('setsInput') as HTMLInputElement;
            const sets = parseInt(setsInput.value);
            if (Number.isNaN(sets) || sets <= 0) throw new Error('Počet sérií musí být kladné číslo.');
            saved.sets = sets;
        }
        dailyActivities.push(saved);
        saveActivities(dailyActivities);
        updateDisplay();
        form.reset();
        specificInputs.innerHTML = '';
    } catch (error) {
        alert(`Chyba: ${error}`);
    }
});

function removeActivity(index: number): void {
    if (index >= 0 && index < dailyActivities.length) {
        dailyActivities.splice(index, 1);
        saveActivities(dailyActivities);
        updateDisplay();
    }
}

/**
 * Funkce - aktualizace zobrazení denních aktivit a souhrnu
 * Polymorfně volá calculateCalories() na všech instancích
 */
function updateDisplay(): void {
    activitiesDiv.innerHTML = '';

    const tableWrapper = document.createElement('div');
    tableWrapper.className = 'table-wrapper';

    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>#</th>
                <th>Den</th>
                <th>Aktivita</th>
                <th>Typ</th>
                <th>Doba / série</th>
                <th>Kalorie</th>
                <th>Akce</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;

    const tbody = table.querySelector('tbody') as HTMLTableSectionElement;

    if (dailyActivities.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `
            <td colspan="7" class="no-data">Zatím nejsou přidány žádné aktivity. Vyberte aktivitu a přidejte ji pomocí formuláře.</td>
        `;
        tbody.appendChild(emptyRow);
    } else {
        dailyActivities.forEach((savedActivity, index) => {
            const activity = createActivityFromSaved(savedActivity);
            const { inputLabel, inputValue } = formatActivitySummary(activity);
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${savedActivity.day}</td>
                <td>${activity.getName()}</td>
                <td>${activity instanceof CardioActivity ? 'cardio' : 'strength'}</td>
                <td>${inputValue}</td>
                <td>${activity.calculateCalories()} kcal</td>
                <td></td>
            `;

            const actionCell = row.querySelector('td:last-child') as HTMLTableCellElement;
            const removeButton = document.createElement('button');
            removeButton.type = 'button';
            removeButton.textContent = 'Odstranit';
            removeButton.addEventListener('click', () => removeActivity(index));
            actionCell.appendChild(removeButton);

            tbody.appendChild(row);
        });
    }

    tableWrapper.appendChild(table);
    activitiesDiv.appendChild(tableWrapper);

    const totalCalories = dailyActivities.reduce((sum, savedAct) => {
        const activity = createActivityFromSaved(savedAct);
        return sum + activity.calculateCalories();
    }, 0);
    let motivation = '';
    if (totalCalories < 100) motivation = 'Začátek je důležitý! Pokračuj!';
    else if (totalCalories < 300) motivation = 'Dobře jsi začal, přidej!';
    else if (totalCalories < 500) motivation = 'Skvělá práce! Jsi na dobré cestě!';
    else motivation = 'Wow! Jsi fitness fenomén! 🔥';

    summaryDiv.innerHTML = `
        <div class="report-card">
            <p><strong>Celkem spálených kalorií:</strong> ${totalCalories} kcal</p>
            <p><em>${motivation}</em></p>
        </div>
    `;
}

