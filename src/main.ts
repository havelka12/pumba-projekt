// Main application logic
import { activities, ActivityData } from './data.js';
import { Activity, CardioActivity, StrengthActivity } from './classes.js';

const activitySelect = document.getElementById('activitySelect') as HTMLSelectElement;
const specificInputs = document.getElementById('specificInputs') as HTMLDivElement;
const form = document.getElementById('activityForm') as HTMLFormElement;
const activitiesDiv = document.getElementById('activities') as HTMLDivElement;
const summaryDiv = document.getElementById('summary') as HTMLDivElement;

let dailyActivities: Activity[] = [];

// Populate select
activities.forEach(activity => {
    const option = document.createElement('option');
    option.value = activity.id.toString();
    option.textContent = activity.name;
    activitySelect.appendChild(option);
});

// Update specific inputs based on selection
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
        input.required = true;
        specificInputs.appendChild(label);
        specificInputs.appendChild(input);
    } else if (activity.type === 'strength') {
        const label = document.createElement('label');
        label.textContent = 'Počet sérií:';
        const input = document.createElement('input');
        input.type = 'number';
        input.id = 'setsInput';
        input.required = true;
        specificInputs.appendChild(label);
        specificInputs.appendChild(input);
    }
});

// Handle form submit
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const selectedId = parseInt(activitySelect.value);
    const activityData = activities.find(a => a.id === selectedId);
    if (!activityData) return;

    let activity: Activity;
    if (activityData.type === 'cardio') {
        const timeInput = document.getElementById('timeInput') as HTMLInputElement;
        const time = parseInt(timeInput.value);
        activity = new CardioActivity(activityData.id, activityData.name, activityData.calorieRate);
        (activity as CardioActivity).setTime(time);
    } else {
        const setsInput = document.getElementById('setsInput') as HTMLInputElement;
        const sets = parseInt(setsInput.value);
        activity = new StrengthActivity(activityData.id, activityData.name, activityData.calorieRate);
        (activity as StrengthActivity).setSets(sets);
    }

    dailyActivities.push(activity);
    updateDisplay();
    form.reset();
    specificInputs.innerHTML = '';
});

function updateDisplay() {
    activitiesDiv.innerHTML = '';
    dailyActivities.forEach((activity, index) => {
        const div = document.createElement('div');
        div.className = 'activity';
        div.innerHTML = `
            <strong>${activity.getName()}</strong><br>
            Spálené kalorie: ${activity.calculateCalories()}
            <button onclick="removeActivity(${index})">Odstranit</button>
        `;
        activitiesDiv.appendChild(div);
    });

    const totalCalories = dailyActivities.reduce((sum, act) => sum + act.calculateCalories(), 0);
    let motivation = '';
    if (totalCalories < 100) motivation = 'Začátek je důležitý! Pokračuj!';
    else if (totalCalories < 300) motivation = 'Dobře jsi začal, přidej!';
    else motivation = 'Skvělá práce! Jsi na dobré cestě!';

    summaryDiv.innerHTML = `
        <p>Celkem spálených kalorií: ${totalCalories}</p>
        <p>${motivation}</p>
    `;
}

// Function to remove activity (exposed to global scope)
(window as any).removeActivity = (index: number) => {
    dailyActivities.splice(index, 1);
    updateDisplay();
};