const activitySelect = document.getElementById('activitySelect');
const specificInputs = document.getElementById('specificInputs');
const daySelect = document.getElementById('daySelect');
const form = document.getElementById('activityForm');
const activitiesDiv = document.getElementById('activities');
const summaryDiv = document.getElementById('summary');
const loginSection = document.getElementById('loginSection');
const STORAGE_KEY = 'fitness-activities';

function loadLocalActivities() {
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function saveLocalActivities(activities) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
}

function renderLoginSection() {
    if (!loginSection) return;
    loginSection.innerHTML = `
        <div style="padding:14px; border-radius:16px; background:#eff6ff; border:1px solid #bfdbfe; color:#0c4a6e;">
            <strong>Ukládání lokálně v prohlížeči</strong><br>
            Data se ukládají jen do tohoto zařízení. Pokud potřebuješ, můžeš stránku později otevřít na jiném zařízení a začít znovu.
        </div>
    `;
}

function createActivity(data) {
    if (data.type === 'cardio') {
        return new CardioActivity(data.id, data.name, data.calorieRate);
    }
    if (data.type === 'strength') {
        return new StrengthActivity(data.id, data.name, data.calorieRate);
    }
    throw new Error(`Neznámý typ aktivity: ${data.type}`);
}

function createActivityFromSaved(saved) {
    const activity = createActivity(saved);
    if (saved.type === 'cardio' && saved.time) {
        activity.setTime(saved.time);
    }
    if (saved.type === 'strength' && saved.sets) {
        activity.setSets(saved.sets);
    }
    return activity;
}

function updateSpecificInputs() {
    const selectedId = parseInt(activitySelect.value, 10);
    const activity = window.activities.find(a => a.id === selectedId);
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

function updateDisplay() {
    activitiesDiv.innerHTML = '';
    const dailyActivities = loadLocalActivities();

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

    const tbody = table.querySelector('tbody');
    if (!tbody) return;

    if (dailyActivities.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `
            <td colspan="7" class="no-data">Zatím nejsou přidány žádné aktivity. Vyberte aktivitu a přidejte ji pomocí formuláře.</td>
        `;
        tbody.appendChild(emptyRow);
    } else {
        dailyActivities.forEach((savedActivity, index) => {
            const activity = createActivityFromSaved(savedActivity);
            const row = document.createElement('tr');
            const timeLabel = savedActivity.type === 'cardio'
                ? `${savedActivity.time || 0} min`
                : `${savedActivity.sets || 0} ×`;

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${savedActivity.day}</td>
                <td>${savedActivity.name}</td>
                <td>${savedActivity.type === 'cardio' ? 'Cardio' : 'Silový'}</td>
                <td>${timeLabel}</td>
                <td>${activity.calculateCalories()} kcal</td>
                <td><button type="button" onclick="removeActivity(${index})">Odstranit</button></td>
            `;
            tbody.appendChild(row);
        });
    }

    tableWrapper.appendChild(table);
    activitiesDiv.appendChild(tableWrapper);

    const totalCalories = loadLocalActivities().reduce((sum, saved) => {
        const activity = createActivityFromSaved(saved);
        return sum + activity.calculateCalories();
    }, 0);

    let motivation = '';
    if (totalCalories < 100) motivation = 'Začátek je důležitý! Pokračuj!';
    else if (totalCalories < 300) motivation = 'Dobře jsi začal, přidej!';
    else if (totalCalories < 500) motivation = 'Skvělá práce! Jsi na dobré cestě!';
    else motivation = 'Wow! Jsi fitness fenomén! 🔥';

    summaryDiv.innerHTML = `
        <div class="summary-card">
            <p><strong>Celkem spálených kalorií: ${totalCalories} kcal</strong></p>
            <p><em>${motivation}</em></p>
        </div>
    `;
}

function removeActivity(index) {
    const dailyActivities = loadLocalActivities();
    if (index >= 0 && index < dailyActivities.length) {
        dailyActivities.splice(index, 1);
        saveLocalActivities(dailyActivities);
        updateDisplay();
    }
}

function bindQuoteButtons() {
    document.querySelectorAll('.fact-box').forEach(box => {
        const button = box.querySelector('.fact-badge');
        const paragraph = box.querySelector('p');
        const facts = (box.dataset.facts || '').split('|').map(item => item.trim()).filter(Boolean);
        if (!button || !paragraph || facts.length === 0) return;

        let activeIndex = 0;
        button.addEventListener('click', () => {
            activeIndex = (activeIndex + 1) % facts.length;
            paragraph.textContent = facts[activeIndex];
        });
    });
}

function initApp() {
    if (!activitySelect || !specificInputs || !daySelect || !form || !activitiesDiv || !summaryDiv) return;
    renderLoginSection();

    window.activities.forEach(activity => {
        const option = document.createElement('option');
        option.value = activity.id.toString();
        option.textContent = activity.name;
        activitySelect.appendChild(option);
    });
    activitySelect.selectedIndex = 0;
    updateSpecificInputs();

    activitySelect.addEventListener('change', updateSpecificInputs);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const selectedId = parseInt(activitySelect.value, 10);
        const activityData = window.activities.find(a => a.id === selectedId);
        const day = daySelect.value;
        if (!activityData || !day) return;

        const saved = {
            id: activityData.id,
            name: activityData.name,
            type: activityData.type,
            calorieRate: activityData.calorieRate,
            day: day,
            time: undefined,
            sets: undefined
        };

        if (activityData.type === 'cardio') {
            const timeInput = document.getElementById('timeInput');
            const time = parseInt(timeInput.value, 10);
            if (Number.isNaN(time) || time <= 0) {
                return alert('Čas musí být kladné číslo.');
            }
            saved.time = time;
        } else {
            const setsInput = document.getElementById('setsInput');
            const sets = parseInt(setsInput.value, 10);
            if (Number.isNaN(sets) || sets <= 0) {
                return alert('Počet sérií musí být kladné číslo.');
            }
            saved.sets = sets;
        }

        const dailyActivities = loadLocalActivities();
        dailyActivities.push(saved);
        saveLocalActivities(dailyActivities);
        updateDisplay();
        form.reset();
        specificInputs.innerHTML = '';
        updateSpecificInputs();
    });

    updateDisplay();
    bindQuoteButtons();
    window.addEventListener('focus', updateDisplay);
}

window.removeActivity = removeActivity;
initApp();
