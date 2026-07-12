// ==================== DATA ====================
const STATE_2023 = {"AK":35.2,"AL":39.2,"AR":40.0,"AZ":31.9,"CA":27.7,"CO":24.9,"CT":29.4,"DC":23.5,"DE":35.7,"FL":30.1,"GA":35.0,"GU":35.4,"HI":26.1,"IA":37.8,"ID":31.0,"IL":36.0,"IN":37.8,"KS":35.9,"LA":39.9,"MA":27.4,"MD":34.1,"ME":32.6,"MI":35.4,"MN":33.3,"MO":35.3,"MS":40.1,"MT":30.5,"NC":34.0,"ND":35.6,"NE":36.6,"NH":32.8,"NJ":28.9,"NM":35.3,"NV":30.8,"NY":28.0,"OH":36.4,"OK":38.7,"OR":33.6,"PR":36.0,"RI":31.6,"SC":36.0,"SD":36.0,"TN":37.6,"TX":34.4,"US":32.8,"UT":30.2,"VA":34.3,"VI":32.1,"VT":28.8,"WA":30.6,"WI":35.9,"WV":41.2,"WY":33.3};
const ABBREV = {"AK":"Alaska","AL":"Alabama","AR":"Arkansas","AZ":"Arizona","CA":"California","CO":"Colorado","CT":"Connecticut","DC":"District of Columbia","DE":"Delaware","FL":"Florida","GA":"Georgia","HI":"Hawaii","IA":"Iowa","ID":"Idaho","IL":"Illinois","IN":"Indiana","KS":"Kansas","KY":"Kentucky","LA":"Louisiana","MA":"Massachusetts","MD":"Maryland","ME":"Maine","MI":"Michigan","MN":"Minnesota","MO":"Missouri","MS":"Mississippi","MT":"Montana","NC":"North Carolina","ND":"North Dakota","NE":"Nebraska","NH":"New Hampshire","NJ":"New Jersey","NM":"New Mexico","NV":"Nevada","NY":"New York","OH":"Ohio","OK":"Oklahoma","OR":"Oregon","RI":"Rhode Island","SC":"South Carolina","SD":"South Dakota","TN":"Tennessee","TX":"Texas","UT":"Utah","VA":"Virginia","VT":"Vermont","WA":"Washington","WI":"Wisconsin","WV":"West Virginia","WY":"Wyoming"};
const NAME2ABB = Object.fromEntries(Object.entries(ABBREV).map(([k,v])=>[v,k]));
const TREND = {"2011":27.6,"2012":27.9,"2013":28.6,"2014":29.2,"2015":29.3,"2016":29.8,"2017":30.7,"2018":31.3,"2019":32.1,"2020":32.1,"2021":33.5,"2022":33.7,"2023":33.6,"2024":34.0};
const INCOME_DATA = {"Less than $15,000":38.1,"$15,000 - $24,999":37.7,"$25,000 - $34,999":36.9,"$35,000 - $49,999":35.9,"$50,000 - $74,999":35.7,"$75,000 or greater":34.7};
const RACE_DATA = {"Hawaiian/\nPacific Islander":44.6,"Non-Hispanic\nBlack":40.2,"Amer. Indian/\nAlaska Native":39.8,"Hispanic":36.2,"2 or more\nraces":34.7,"Non-Hispanic\nWhite":31.8,"Other":31.2,"Asian":13.8};
const EDU_DATA = {"Less than\nhigh school":36.4,"Some college /\ntech school":36.3,"High school\ngraduate":35.8,"College\ngraduate":28.7};
const INACTIVITY = {"PR":46.6,"MS":33.1,"AR":31.5,"WV":30.5,"KY":30.4,"LA":30.4,"OK":30.1,"AL":30.0,"TN":29.6,"GU":29.4};
const gridColor = 'rgba(0,0,0,0.06)';
const textColor = '#9A9590';

// ==================== NAV ====================
function showPage(id, btn) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(b => b.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  if (btn) btn.classList.add('active');
  if (id === 'map-page') setTimeout(initMap, 100);
  if (id === 'findings') setTimeout(drawFindingsChart, 50);
}

// ==================== TABS ====================
function switchTab(group, tab, btn) {
  document.querySelectorAll(`#page-${group === 'disp' ? 'disparities' : group} .tab-panel`).forEach(p => p.classList.remove('active'));
  document.querySelectorAll(`#page-${group === 'disp' ? 'disparities' : group} .tab-btn`).forEach(b => b.classList.remove('active'));
  document.getElementById(`${group}-tab-${tab}`).classList.add('active');
  btn.classList.add('active');
}

// ==================== CHARTS ====================
const co = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => (c.parsed.y ?? c.parsed.x).toFixed(1) + '%' } } }, scales: { x: { grid: { color: gridColor }, ticks: { color: textColor, font: { size: 11 } } }, y: { grid: { color: gridColor }, ticks: { color: textColor, font: { size: 11 }, callback: v => v + '%' } } } };

new Chart(document.getElementById('trendChart'), {
  type: 'line',
  data: { labels: Object.keys(TREND), datasets: [{ data: Object.values(TREND), borderColor: '#C0392B', backgroundColor: 'rgba(192,57,43,0.07)', fill: true, tension: 0.35, pointRadius: 4, pointBackgroundColor: '#C0392B', borderWidth: 2.5 }] },
  options: { ...co, scales: { x: { grid: { color: gridColor }, ticks: { color: textColor, font: { size: 11 } } }, y: { min: 24, max: 37, grid: { color: gridColor }, ticks: { color: textColor, font: { size: 11 }, callback: v => v + '%' } } } }
});

new Chart(document.getElementById('incomeChart'), {
  type: 'bar',
  data: { labels: ['<$15k','$15-25k','$25-35k','$35-50k','$50-75k','$75k+'], datasets: [{ data: [38.1,37.7,36.9,35.9,35.7,34.7], backgroundColor: ['#A32D2D','#C0392B','#D85A30','#EF9F27','#639922','#1A7A4A'] }] },
  options: { ...co, scales: { x: { grid: { color: gridColor }, ticks: { color: textColor, font: { size: 10 } } }, y: { min: 32, grid: { color: gridColor }, ticks: { color: textColor, font: { size: 11 }, callback: v => v + '%' } } } }
});

new Chart(document.getElementById('activityChart'), {
  type: 'bar',
  data: { labels: Object.keys(INACTIVITY), datasets: [{ label: 'Inactivity %', data: Object.values(INACTIVITY), backgroundColor: '#1558A0' }, { label: 'Obesity %', data: [36.0,40.1,40.0,41.2,null,39.9,38.7,39.2,37.6,35.4], backgroundColor: '#C0392B' }] },
  options: { ...co, plugins: { legend: { display: true, labels: { font: { size: 11 }, color: textColor, boxWidth: 10, boxHeight: 10 } }, tooltip: { callbacks: { label: c => c.dataset.label + ': ' + (c.parsed.y||0).toFixed(1) + '%' } } } }
});

new Chart(document.getElementById('raceChart'), {
  type: 'bar',
  data: { labels: Object.keys(RACE_DATA), datasets: [{ data: Object.values(RACE_DATA), backgroundColor: ['#6B1010','#A32D2D','#B7500A','#D85A30','#EF9F27','#8BB42A','#1A7A4A','#0E6E5A'] }] },
  options: { ...co, indexAxis: 'y', scales: { x: { min: 10, grid: { color: gridColor }, ticks: { color: textColor, font: { size: 11 }, callback: v => v + '%' } }, y: { grid: { display: false }, ticks: { color: textColor, font: { size: 11 } } } } }
});

new Chart(document.getElementById('eduChart'), {
  type: 'bar',
  data: { labels: Object.keys(EDU_DATA), datasets: [{ data: Object.values(EDU_DATA), backgroundColor: ['#A32D2D','#D85A30','#EF9F27','#1A7A4A'] }] },
  options: { ...co, indexAxis: 'y', scales: { x: { min: 24, grid: { color: gridColor }, ticks: { color: textColor, font: { size: 11 }, callback: v => v + '%' } }, y: { grid: { display: false }, ticks: { color: textColor, font: { size: 11 } } } } }
});

new Chart(document.getElementById('incomeChart2'), {
  type: 'bar',
  data: { labels: Object.keys(INCOME_DATA), datasets: [{ data: Object.values(INCOME_DATA), backgroundColor: ['#A32D2D','#C0392B','#D85A30','#EF9F27','#639922','#1A7A4A'] }] },
  options: { ...co, indexAxis: 'y', scales: { x: { min: 32, grid: { color: gridColor }, ticks: { color: textColor, font: { size: 11 }, callback: v => v + '%' } }, y: { grid: { display: false }, ticks: { color: textColor, font: { size: 11 } } } } }
});

function drawFindingsChart() {
  const c = document.getElementById('findingsTrendChart');
  if (c._chart) c._chart.destroy();
  c._chart = new Chart(c, {
    type: 'line',
    data: { labels: Object.keys(TREND), datasets: [{ data: Object.values(TREND), borderColor: '#0E6E5A', backgroundColor: 'rgba(14,110,90,0.07)', fill: true, tension: 0.35, pointRadius: 3, pointBackgroundColor: '#0E6E5A', borderWidth: 2 }] },
    options: { ...co, scales: { x: { grid: { color: gridColor }, ticks: { color: textColor, font: { size: 11 } } }, y: { min: 24, max: 37, grid: { color: gridColor }, ticks: { color: textColor, font: { size: 11 }, callback: v => v + '%' } } } }
  });
}

// ==================== MAP ====================
let mapDrawn = false;
function initMap() {
  if (mapDrawn) return;
  const wrap = document.getElementById('map-svg-wrap');
  const W = wrap.clientWidth || 800, H = 420;
  const colorScale = d3.scaleThreshold().domain([26,30,34,38]).range(['#C0DD97','#EF9F27','#D85A30','#A32D2D','#6B1010']);
  const svg = d3.select(wrap).append('svg').attr('viewBox', `0 0 ${W} ${H}`).attr('width', '100%').attr('height', H);
  const proj = d3.geoAlbersUsa().scale(W * 1.15).translate([W/2, H/2]);
  const path = d3.geoPath(proj);
  const tooltip = document.getElementById('mapTooltip');
  d3.json('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json').then(us => {
    svg.selectAll('path').data(topojson.feature(us, us.objects.states).features).join('path')
      .attr('d', path)
      .attr('fill', d => { const abbr = NAME2ABB[d.properties.name]; return abbr && STATE_2023[abbr] ? colorScale(STATE_2023[abbr]) : '#ddd'; })
      .attr('stroke', '#fff').attr('stroke-width', 0.8)
      .on('mousemove', (event, d) => {
        const abbr = NAME2ABB[d.properties.name]; const val = abbr && STATE_2023[abbr];
        tooltip.style.display = 'block'; tooltip.style.left = (event.clientX+14)+'px'; tooltip.style.top = (event.clientY-36)+'px';
        tooltip.innerHTML = `<strong>${d.properties.name}</strong>${val ? ' — '+val.toFixed(1)+'% obesity (2023)' : ': no data'}`;
      })
      .on('mouseleave', () => tooltip.style.display = 'none');
    mapDrawn = true;
    // count tiers
    let h=0,m=0,l=0;
    Object.values(STATE_2023).forEach(v => { if(v>=38)h++; else if(v>=32)m++; else l++; });
    document.getElementById('highCount').textContent = h;
    document.getElementById('medCount').textContent = m;
    document.getElementById('lowCount').textContent = l;
    buildRiskTierGrid();
  });
}

function buildRiskTierGrid() {
  const groups = { high:[], med:[], low:[] };
  Object.entries(ABBREV).forEach(([abbr, name]) => {
    const v = STATE_2023[abbr]; if(!v) return;
    if(v>=38) groups.high.push({abbr,v}); else if(v>=32) groups.med.push({abbr,v}); else groups.low.push({abbr,v});
  });
  const labels = { high:'Very High Risk (≥38%)', med:'Elevated Risk (32–38%)', low:'Lower Risk (<32%)' };
  document.getElementById('riskTierGrid').innerHTML = ['high','med','low'].map(t =>
    `<div class="tier-card tier-${t}"><div class="tier-title">${labels[t]} — ${groups[t].length} states</div>${groups[t].sort((a,b)=>b.v-a.v).map(s=>`<span class="state-chip" title="${ABBREV[s.abbr]}">${s.abbr} ${s.v}%</span>`).join('')}</div>`
  ).join('');
}

// ==================== ASSESSMENT ====================
let assessStep = 1; const totalSteps = 4;
let assessResult = null;

function buildProgressDots() {
  const el = document.getElementById('progressDots');
  el.innerHTML = Array.from({length:totalSteps}, (_,i) =>
    `<div class="step-dot ${i+1 < assessStep ? 'done' : i+1 === assessStep ? 'active' : ''}"></div>`
  ).join('');
  document.getElementById('stepLabel').textContent = `Step ${assessStep} of ${totalSteps}`;
  document.getElementById('backBtn').style.display = assessStep > 1 ? '' : 'none';
  document.getElementById('nextBtn').textContent = assessStep < totalSteps ? 'Continue →' : 'Calculate My Risk →';
}

function assessNav(dir) {
  if (dir === 1 && assessStep < totalSteps) {
    assessStep++; switchAssessSection();
  } else if (dir === 1 && assessStep === totalSteps) {
    computeResult();
  } else if (dir === -1 && assessStep > 1) {
    assessStep--; switchAssessSection();
  }
}

function switchAssessSection() {
  document.querySelectorAll('.assess-section').forEach(s => s.classList.remove('active'));
  document.getElementById('assess-' + assessStep).classList.add('active');
  buildProgressDots();
}

buildProgressDots();

function selectRadio(el, group) {
  document.querySelectorAll(`[name="${group}"]`).forEach(r => r.closest('.radio-item').classList.remove('selected'));
  el.classList.add('selected');
}

document.querySelectorAll('.check-item input[type=checkbox]').forEach(cb => {
  cb.addEventListener('change', () => cb.closest('.check-item').classList.toggle('checked', cb.checked));
});

function getChecked(containerId) {
  return Array.from(document.querySelectorAll(`#${containerId} input[type=checkbox]:checked`)).map(c => c.value);
}

function getRadio(name) { const el = document.querySelector(`[name="${name}"]:checked`); return el ? el.value : null; }

function computeResult() {
  const heightFt = parseFloat(document.getElementById('heightFt').value) || 0;
  const heightIn = parseFloat(document.getElementById('heightIn').value) || 0;
  const weight = parseFloat(document.getElementById('weight').value) || 0;
  const age = parseFloat(document.getElementById('age').value) || 0;
  const sex = document.getElementById('sex').value;
  const waist = parseFloat(document.getElementById('waist').value) || 0;
  const exercise = parseInt(document.getElementById('exerciseMin').value);
  const sleep = parseFloat(document.getElementById('sleepHrs').value);
  const steps = getRadio('steps');
  const sitting = getRadio('sitting');
  const fruit = getRadio('fruit');
  const veg = getRadio('veg');
  const eatingHabits = getChecked('eatHabits');
  const healthHistory = getChecked('healthHistory');
  const education = document.getElementById('education').value;
  const income = document.getElementById('income').value;
  const stateName = document.getElementById('stateSelect').value;

  const totalInches = heightFt * 12 + heightIn;
  let bmi = totalInches > 0 && weight > 0 ? (weight / (totalInches * totalInches)) * 703 : null;

  let score = 0; const factors = [];

  // BMI score
  if (bmi) {
    if (bmi >= 30) { score += 35; factors.push({ label: `BMI ${bmi.toFixed(1)} — Obese range`, color: 'red' }); }
    else if (bmi >= 25) { score += 20; factors.push({ label: `BMI ${bmi.toFixed(1)} — Overweight`, color: 'amber' }); }
    else if (bmi < 18.5) { score += 5; factors.push({ label: `BMI ${bmi.toFixed(1)} — Underweight`, color: 'amber' }); }
    else { score += 0; factors.push({ label: `BMI ${bmi.toFixed(1)} — Normal range`, color: 'green' }); }
  }

  // Waist
  if (waist > 0) {
    const threshold = sex === 'Female' ? 35 : 40;
    if (waist > threshold) { score += 10; factors.push({ label: `Waist ${waist}" — Above risk threshold`, color: 'red' }); }
    else { factors.push({ label: `Waist ${waist}" — Within healthy range`, color: 'green' }); }
  }

  // Exercise
  if (exercise < 60) { score += 15; factors.push({ label: `Low exercise (${exercise} min/week) — CDC recommends ≥150min`, color: 'red' }); }
  else if (exercise < 150) { score += 8; factors.push({ label: `Moderate exercise (${exercise} min/week) — slightly below recommendation`, color: 'amber' }); }
  else { factors.push({ label: `Good exercise level (${exercise} min/week)`, color: 'green' }); }

  // Sleep
  if (sleep < 6 || sleep > 9) { score += 8; factors.push({ label: `Sleep ${sleep}hrs — outside optimal 7–9hr range`, color: 'amber' }); }
  else { factors.push({ label: `Sleep ${sleep}hrs — within healthy range`, color: 'green' }); }

  // Steps
  if (steps === 'sedentary') { score += 12; factors.push({ label: 'Sedentary step count (&lt;3,000/day)', color: 'red' }); }
  else if (steps === 'low') { score += 6; factors.push({ label: 'Low step count (3,000–5,999/day)', color: 'amber' }); }
  else if (steps === 'active') { factors.push({ label: 'Active daily step count (≥10,000)', color: 'green' }); }

  // Sitting
  if (sitting === 'very_high') { score += 10; factors.push({ label: 'Very high sedentary time (&gt;9hrs/day)', color: 'red' }); }
  else if (sitting === 'high') { score += 5; factors.push({ label: 'High sitting time (6–9hrs/day)', color: 'amber' }); }

  // Nutrition
  if (fruit === 'none' || fruit === 'low') { score += 5; factors.push({ label: 'Low fruit consumption (&lt;1 serving/day)', color: 'amber' }); }
  if (veg === 'none' || veg === 'low') { score += 5; factors.push({ label: 'Low vegetable consumption (&lt;1 serving/day)', color: 'amber' }); }

  const badHabits = eatingHabits.filter(h => h !== 'meal_prep');
  if (badHabits.length >= 3) { score += 12; factors.push({ label: `${badHabits.length} high-risk eating habits identified`, color: 'red' }); }
  else if (badHabits.length >= 1) { score += 5 * badHabits.length; factors.push({ label: `${badHabits.length} risky eating habit(s) identified`, color: 'amber' }); }
  if (eatingHabits.includes('meal_prep')) { score -= 3; factors.push({ label: 'Meal prepping — positive protective factor', color: 'green' }); }

  // Socioeconomic
  if (education === 'less_hs' || education === 'hs') { score += 5; factors.push({ label: 'Education level — population data shows elevated risk', color: 'amber' }); }
  if (income === 'lt15' || income === '15_25') { score += 5; factors.push({ label: 'Income level — lower income associated with higher population risk', color: 'amber' }); }

  // Health history
  healthHistory.forEach(h => {
    const map = { family_obesity: ['Family history of obesity', 8, 'red'], diabetes: ['Type 2 diabetes / pre-diabetes', 10, 'red'], hypertension: ['High blood pressure — comorbidity', 6, 'amber'], high_cholesterol: ['High cholesterol — comorbidity', 6, 'amber'], depression: ['Depression / anxiety — linked to weight outcomes', 5, 'amber'], smoking: ['Smoking history', 3, 'amber'] };
    if (map[h]) { score += map[h][1]; factors.push({ label: map[h][0], color: map[h][2] }); }
  });

  // Age adjustment
  if (age >= 45 && age < 65) score += 3;
  if (age >= 65) score += 5;

  const riskLevel = score >= 50 ? 'high' : score >= 25 ? 'medium' : 'low';
  assessResult = { bmi, riskLevel, score, factors, stateName };

  showResult(assessResult);
}

function showResult({ bmi, riskLevel, score, factors, stateName }) {
  document.getElementById('resultPanel').classList.add('show');
  document.querySelectorAll('.assess-section').forEach(s => s.classList.remove('active'));
  document.getElementById('nextBtn').style.display = 'none';
  document.getElementById('backBtn').style.display = 'none';
  document.getElementById('stepLabel').textContent = 'Assessment complete';

  // BMI
  if (bmi) {
    const bmiEl = document.getElementById('bmiDisplay');
    bmiEl.textContent = bmi.toFixed(1);
    const cat = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal weight' : bmi < 30 ? 'Overweight' : bmi < 35 ? 'Obese (Class I)' : 'Obese (Class II+)';
    const col = bmi < 18.5 ? '#1558A0' : bmi < 25 ? '#1A7A4A' : bmi < 30 ? '#B7500A' : '#C0392B';
    bmiEl.style.color = col;
    document.getElementById('bmiCategory').textContent = cat; document.getElementById('bmiCategory').style.color = col;
    document.getElementById('bmiPointer').style.display = 'block';
    const pct = Math.min(100, Math.max(0, ((bmi - 15) / 25) * 100));
    document.getElementById('bmiPointer').innerHTML = `Your BMI of <strong>${bmi.toFixed(1)}</strong> is in the <strong>${cat}</strong> category.`;
  } else {
    document.getElementById('bmiDisplay').textContent = 'N/A'; document.getElementById('bmiCategory').textContent = 'Enter height & weight';
  }

  // Risk badge
  const badges = { high: '<span class="risk-badge risk-high">High Obesity Risk</span>', medium: '<span class="risk-badge risk-med">Moderate Risk</span>', low: '<span class="risk-badge risk-low">Lower Risk</span>' };
  document.getElementById('overallRiskBadge').innerHTML = badges[riskLevel];

  // Risk breakdown
  const dims = [
    { label: 'Body metrics', val: Math.min(100, bmi ? (bmi>=30?90:bmi>=25?60:20) : 30), col: '#C0392B' },
    { label: 'Physical activity', val: Math.min(100, parseInt(document.getElementById('exerciseMin').value) < 60 ? 85 : parseInt(document.getElementById('exerciseMin').value) < 150 ? 50 : 20), col: '#B7500A' },
    { label: 'Nutrition', val: Math.min(100, getChecked('eatHabits').filter(h=>h!=='meal_prep').length * 25), col: '#EF9F27' },
    { label: 'Health history', val: Math.min(100, getChecked('healthHistory').length * 20), col: '#1558A0' }
  ];
  document.getElementById('riskBreakdown').innerHTML = dims.map(d => `
    <div style="margin-bottom:10px">
      <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text2);margin-bottom:4px"><span>${d.label}</span><span>${d.val}%</span></div>
      <div class="score-bar"><div class="score-fill" style="width:${d.val}%;background:${d.col}"></div></div>
    </div>`).join('');

  // Factors
  document.getElementById('factorList').innerHTML = factors.map(f => `
    <li class="factor-item"><span class="factor-dot dot-${f.color}"></span><span>${f.label}</span></li>`).join('');

  // State compare chart
  const abbr = NAME2ABB[stateName];
  const stateRate = abbr ? STATE_2023[abbr] : null;
  const natRate = 34.0;
  document.getElementById('stateCompareText').textContent = stateRate ? `Your state: ${stateName} — ${stateRate}% obesity rate (2023) vs. national average of 34.0%` : 'No state selected — showing national average';
  const userBMIAsRate = bmi ? Math.min(100, bmi / 40 * 100) : 50;
  const c = document.getElementById('compareChart');
  if (c._chart) c._chart.destroy();
  c._chart = new Chart(c, {
    type: 'bar',
    data: {
      labels: ['National avg', stateRate ? stateName : 'N/A', 'Your BMI percentile'],
      datasets: [{ data: [natRate, stateRate || 0, userBMIAsRate], backgroundColor: ['#1558A0', stateRate ? (stateRate >= 38 ? '#C0392B' : stateRate >= 32 ? '#B7500A' : '#1A7A4A') : '#ddd', riskLevel === 'high' ? '#C0392B' : riskLevel === 'medium' ? '#B7500A' : '#1A7A4A'] }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { color: gridColor }, ticks: { color: textColor, font: { size: 11 } } }, y: { min: 0, max: 100, grid: { color: gridColor }, ticks: { color: textColor, font: { size: 11 }, callback: v => v + '%' } } } }
  });
}

function resetAssessment() {
  assessStep = 1; assessResult = null;
  switchAssessSection();
  document.getElementById('resultPanel').classList.remove('show');
  document.getElementById('nextBtn').style.display = '';
  document.getElementById('progressDots').innerHTML = '';
  buildProgressDots();
  window.scrollTo(0,0);
}

function goToAI() {
  if (!assessResult) return;
  const { bmi, riskLevel, score, factors } = assessResult;
  const summary = `My obesity risk assessment results: BMI=${bmi ? bmi.toFixed(1) : 'unknown'}, Risk level=${riskLevel}, Score=${score}/100. Key risk factors: ${factors.slice(0,5).map(f=>f.label.replace(/<[^>]+>/g,'')).join('; ')}. Please give me personalized recommendations to improve my health and reduce obesity risk.`;
  document.getElementById('aiPrompt').value = summary;
  showPage('ai-page', document.querySelectorAll('.nav-link')[4]);
}

// ==================== AI ====================
let apiKey = '';

function saveApiKey() {
  const k = document.getElementById('apiKeyInput').value.trim();
  if (!k.startsWith('sk-')) { alert('Please enter a valid Anthropic API key starting with sk-'); return; }
  apiKey = k;
  document.getElementById('apiKeyNotice').style.display = 'none';
  document.getElementById('apiKeySet').style.display = 'block';
}

function clearApiKey() {
  apiKey = '';
  document.getElementById('apiKeyInput').value = '';
  document.getElementById('apiKeyNotice').style.display = 'block';
  document.getElementById('apiKeySet').style.display = 'none';
}

function setPrompt(text) { document.getElementById('aiPrompt').value = text; document.getElementById('aiPrompt').focus(); }

function clearAI() { document.getElementById('aiPrompt').value = ''; document.getElementById('aiResponseBox').style.display = 'none'; document.getElementById('aiStatus').textContent = ''; }

async function askAI() {
  const prompt = document.getElementById('aiPrompt').value.trim();
  if (!prompt) { alert('Please enter a question.'); return; }
  if (!apiKey) { alert('Please enter your Anthropic API key first.'); return; }

  const btn = document.getElementById('askBtn');
  btn.disabled = true; btn.textContent = 'Thinking...';
  document.getElementById('aiStatus').textContent = 'Contacting AI...';
  document.getElementById('aiResponseBox').style.display = 'block';
  document.getElementById('aiResponse').textContent = '';
  document.getElementById('aiResponse').classList.add('loading');

  const systemPrompt = `You are a public health advisor specializing in obesity prevention and nutrition. You have access to CDC BRFSS (Behavioral Risk Factor Surveillance System) data showing:
- National adult obesity rate: 34.0% in 2024 (up from 27.6% in 2011)
- Highest state: West Virginia at 41.2%; Lowest: DC at 23.5%
- Income disparity: Less than $15k income = 38.1% obesity; $75k+ = 34.7%
- Education disparity: College grad = 28.7%; Less than HS = 36.4%
- Racial disparities: Hawaiian/Pacific Islander 44.6%, Non-Hispanic Black 40.2%, Asian 13.8%
- Physical inactivity is strongly correlated with higher obesity rates
- Data covers 110,880 records across 55 locations, years 2011–2024

Provide evidence-based, compassionate, actionable advice. Be specific and practical. Keep responses clear, well-structured, and under 400 words unless more detail is genuinely needed. Always recommend consulting healthcare professionals for clinical decisions. Do not use excessive headers or bullet points — write in clear paragraphs with occasional lists when helpful.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 800, system: systemPrompt, messages: [{ role: 'user', content: prompt }] })
    });
    const data = await response.json();
    document.getElementById('aiResponse').classList.remove('loading');
    if (data.content && data.content[0]) {
      document.getElementById('aiResponse').textContent = data.content[0].text;
      document.getElementById('aiStatus').textContent = 'Response received';
    } else if (data.error) {
      document.getElementById('aiResponse').textContent = 'Error: ' + data.error.message;
      document.getElementById('aiStatus').textContent = 'Error';
    }
  } catch (err) {
    document.getElementById('aiResponse').classList.remove('loading');
    document.getElementById('aiResponse').textContent = 'Request failed. Check your API key and internet connection.';
    document.getElementById('aiStatus').textContent = 'Failed';
  }
  btn.disabled = false; btn.textContent = 'Ask AI Advisor →';
}
