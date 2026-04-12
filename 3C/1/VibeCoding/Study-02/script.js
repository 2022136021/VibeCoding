// DOM 요소
const taskInput = document.getElementById('taskInput');
const categorySelect = document.getElementById('categorySelect');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');
const filterBtns = document.querySelectorAll('.filter-btn');
const themeToggle = document.getElementById('themeToggle');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');
const sortSelect = document.getElementById('sortSelect');
const exportBtn = document.getElementById('exportBtn');
const importBtn = document.getElementById('importBtn');
const importInput = document.getElementById('importInput');

// 대시보드 요소
const progressFractionText = document.getElementById('progressFractionText');
const mainProgressBar = document.getElementById('mainProgressBar');
const todayCountText = document.getElementById('todayCountText');
const workProgressText = document.getElementById('workProgressText');
const workProgressBarFill = document.getElementById('workProgressBarFill');
const personalProgressText = document.getElementById('personalProgressText');
const personalProgressBarFill = document.getElementById('personalProgressBarFill');
const studyProgressText = document.getElementById('studyProgressText');
const studyProgressBarFill = document.getElementById('studyProgressBarFill');

// 상태
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';
let currentSort = 'newest';
const categoryNames = { work: '업무', personal: '개인', study: '공부' };

// 다크모드
let isDarkMode = localStorage.getItem('theme') === 'dark';
function applyTheme() {
    if (isDarkMode) { document.body.classList.add('dark-mode'); themeToggle.textContent = '☀️ 라이트 모드'; }
    else { document.body.classList.remove('dark-mode'); themeToggle.textContent = '🌙 다크 모드'; }
}
applyTheme();
themeToggle.addEventListener('click', () => { isDarkMode = !isDarkMode; localStorage.setItem('theme', isDarkMode ? 'dark' : 'light'); applyTheme(); });

// 대시보드 업데이트
function updateDashboard() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    progressFractionText.textContent = `${completed}/${total} 완료 (${percent}%)`;
    mainProgressBar.style.width = `${percent}%`;

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayTasks = tasks.filter(t => t.id >= todayStart.getTime()).length;
    todayCountText.textContent = `${todayTasks}개`;

    const updateCatProg = (cat, txt, bar) => {
        const cTask = tasks.filter(t => t.category === cat);
        const cTotal = cTask.length;
        const cComp = cTask.filter(t => t.completed).length;
        const cPct = cTotal === 0 ? 0 : Math.round((cComp / cTotal) * 100);
        txt.textContent = `${cComp}/${cTotal}`;
        bar.style.width = `${cPct}%`;
    };

    updateCatProg('work', workProgressText, workProgressBarFill);
    updateCatProg('personal', personalProgressText, personalProgressBarFill);
    updateCatProg('study', studyProgressText, studyProgressBarFill);
}

// === 🚀 렌더링 최적화 & 정렬 구현 ===
function renderTasks() {
    taskList.innerHTML = '';

    // 1. 필터링
    let displayTasks = tasks.filter(task => currentFilter === 'all' || task.category === currentFilter);

    // 2. 정렬 로직
    displayTasks.sort((a, b) => {
        if (currentSort === 'newest') return b.id - a.id;
        if (currentSort === 'oldest') return a.id - b.id;
        if (currentSort === 'category') return a.category.localeCompare(b.category);
        return 0;
    });

    // 3. DocumentFragment로 대량의 DOM 조작 최적화
    const fragment = document.createDocumentFragment();

    displayTasks.forEach(task => {
        const li = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTask(task.id));

        const badge = document.createElement('span');
        badge.className = `badge ${task.category}`;
        badge.textContent = categoryNames[task.category] || '기타';

        const span = document.createElement('span');
        span.textContent = task.text;
        span.className = 'task-text';
        if (task.completed) span.classList.add('completed');

        span.addEventListener('dblclick', () => {
            const editInput = document.createElement('input');
            editInput.type = 'text';
            editInput.value = task.text;
            editInput.className = 'edit-input';

            const finishEdit = () => {
                const newText = editInput.value.trim();
                if (newText) { task.text = newText; saveTasks(); }
                renderTasks();
            };

            editInput.addEventListener('blur', finishEdit);
            editInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') finishEdit(); });

            li.replaceChild(editInput, span);
            editInput.focus();
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '삭제';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', () => deleteTask(task.id));

        li.appendChild(checkbox);
        li.appendChild(badge);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        fragment.appendChild(li); // 메모리 상에만 추가 (렌더링 부하 X)
    });

    taskList.appendChild(fragment); // 한 번에 화면에 그리기
    updateDashboard();
}

// 데이터 조작
function addTask() {
    const text = taskInput.value.trim();
    if (!text) return;
    tasks.push({ id: Date.now(), text, category: categorySelect.value, completed: false });
    saveTasks(); renderTasks();
    taskInput.value = ''; taskInput.focus();
}
function toggleTask(id) { tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t); saveTasks(); renderTasks(); }
function deleteTask(id) { tasks = tasks.filter(t => t.id !== id); saveTasks(); renderTasks(); }
function saveTasks() { localStorage.setItem('tasks', JSON.stringify(tasks)); }

clearCompletedBtn.addEventListener('click', () => {
    if (confirm("완료된 항목을 지울까요?")) { tasks = tasks.filter(t => !t.completed); saveTasks(); renderTasks(); }
});

// 이벤트 리스너들
addButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') addTask(); });

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active')); btn.classList.add('active');
        currentFilter = btn.dataset.filter; renderTasks();
    });
});

sortSelect.addEventListener('change', (e) => { currentSort = e.target.value; renderTasks(); });

document.addEventListener('keydown', (e) => {
    if (e.altKey) {
        switch (e.key.toLowerCase()) {
            case 'n': e.preventDefault(); taskInput.focus(); break;
            case '1': e.preventDefault(); document.querySelector('[data-filter="all"]').click(); break;
            case '2': e.preventDefault(); document.querySelector('[data-filter="work"]').click(); break;
            case '3': e.preventDefault(); document.querySelector('[data-filter="personal"]').click(); break;
            case '4': e.preventDefault(); document.querySelector('[data-filter="study"]').click(); break;
        }
    }
});

// === 💾 데이터 내보내기 (JSON) ===
exportBtn.addEventListener('click', () => {
    const dataStr = JSON.stringify(tasks, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `MyTasks_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();

    URL.revokeObjectURL(url);
});

// === 📂 데이터 가져오기 (JSON) ===
importBtn.addEventListener('click', () => importInput.click());
importInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const importedData = JSON.parse(event.target.result);
            if (Array.isArray(importedData)) {
                tasks = importedData;
                saveTasks();
                renderTasks();
                alert("데이터 복원이 완료되었습니다!");
            } else {
                alert("올바른 백업 파일 형식이 아닙니다.");
            }
        } catch (error) {
            alert("파일을 읽는 중 오류가 발생했습니다.");
        }
        importInput.value = ''; // 같은 파일을 다시 선택할 수 있도록 초기화
    };
    reader.readAsText(file);
});

// 초기 실행
renderTasks();