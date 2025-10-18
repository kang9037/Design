/**
 * 대시보드 페이지 스크립트
 * 로컬 스토리지 기반 데이터 관리
 */

// 전역 변수
let timerInterval = null;
let timerSeconds = 0;
let currentSubject = null;

document.addEventListener('DOMContentLoaded', function() {
    // 로그인 체크
    if (!window.authManager || !window.authManager.isLoggedIn()) {
        alert('로그인이 필요합니다.');
        window.location.href = 'login.html';
        return;
    }

    // 사용자 정보 로드
    loadUserInfo();

    // 대시보드 데이터 로드
    loadDashboardData();

    // 캘린더 생성
    generateCalendar();

    // 이벤트 리스너 설정
    setupEventListeners();
});

/**
 * 사용자 정보 로드
 */
function loadUserInfo() {
    const user = window.authManager.getCurrentUser();
    if (user) {
        document.getElementById('userName').textContent = user.full_name || user.username;

        // 사용자 통계 로드
        loadUserStats();
    }
}

/**
 * 사용자 통계 로드
 */
function loadUserStats() {
    // 로컬 스토리지에서 통계 데이터 로드
    const stats = JSON.parse(localStorage.getItem('user_stats') || '{}');

    // 연속 학습 일수
    const studyDays = calculateConsecutiveDays();
    document.getElementById('studyDays').textContent = `${studyDays}일`;

    // 포인트
    const points = stats.points || 0;
    document.getElementById('totalPoints').textContent = `${points}점`;

    // 오늘 학습 시간
    const todayStudy = getTodayStudyTime();
    document.getElementById('todayStudyTime').textContent = formatTime(todayStudy);
}

/**
 * 연속 학습 일수 계산
 */
function calculateConsecutiveDays() {
    const studyDates = JSON.parse(localStorage.getItem('study_dates') || '[]');
    if (studyDates.length === 0) return 0;

    let consecutive = 1;
    const today = new Date().toDateString();

    // 오늘 학습 기록이 없으면 0 반환
    if (!studyDates.includes(today)) return 0;

    // 어제부터 거꾸로 체크
    for (let i = 1; i < 365; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toDateString();

        if (studyDates.includes(dateStr)) {
            consecutive++;
        } else {
            break;
        }
    }

    return consecutive;
}

/**
 * 오늘 학습 시간 가져오기
 */
function getTodayStudyTime() {
    const today = new Date().toDateString();
    const studySessions = JSON.parse(localStorage.getItem('study_sessions') || '[]');

    return studySessions
        .filter(session => new Date(session.date).toDateString() === today)
        .reduce((total, session) => total + (session.duration || 0), 0);
}

/**
 * 시간 포맷팅
 */
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
        return `${hours}시간 ${minutes}분`;
    }
    return `${minutes}분`;
}

/**
 * 대시보드 데이터 로드
 */
function loadDashboardData() {
    // 학습 목표 로드
    loadGoals();

    // 최근 성적 로드
    loadGrades();
}

/**
 * 학습 목표 로드
 */
function loadGoals() {
    const goals = JSON.parse(localStorage.getItem('daily_goals') || '[]');
    const goalList = document.getElementById('goalList');

    if (goals.length === 0) {
        // 기본 목표 표시
        return;
    }

    goalList.innerHTML = '';
    let completedCount = 0;

    goals.forEach((goal, index) => {
        const li = document.createElement('li');
        li.className = 'goal-item';
        li.innerHTML = `
            <input type="checkbox" id="goal${index}" ${goal.completed ? 'checked' : ''}>
            <label for="goal${index}">${goal.text}</label>
        `;

        const checkbox = li.querySelector('input');
        checkbox.addEventListener('change', function() {
            goal.completed = this.checked;
            localStorage.setItem('daily_goals', JSON.stringify(goals));
            updateGoalProgress();
        });

        if (goal.completed) completedCount++;
        goalList.appendChild(li);
    });

    updateGoalProgress();
}

/**
 * 목표 진행률 업데이트
 */
function updateGoalProgress() {
    const goals = JSON.parse(localStorage.getItem('daily_goals') || '[]');
    const completed = goals.filter(g => g.completed).length;
    const total = goals.length || 3;
    const percentage = total > 0 ? (completed / total * 100) : 0;

    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');

    if (progressFill) {
        progressFill.style.width = `${percentage}%`;
    }
    if (progressText) {
        progressText.textContent = `${completed}/${total} 완료`;
    }
}

/**
 * 성적 로드
 */
function loadGrades() {
    const result = window.dbManager.getGrades(3);
    const gradeList = document.getElementById('gradeList');

    if (!result.success || result.data.length === 0) {
        // 기본 성적 표시
        return;
    }

    gradeList.innerHTML = '';

    result.data.forEach(grade => {
        const div = document.createElement('div');
        div.className = 'grade-item';
        div.innerHTML = `
            <div class="grade-subject">${grade.subject}</div>
            <div class="grade-score">${grade.score}점</div>
            <div class="grade-rank">${calculateRank(grade.score)}등급</div>
        `;
        gradeList.appendChild(div);
    });
}

/**
 * 등급 계산
 */
function calculateRank(score) {
    if (score >= 96) return '1';
    if (score >= 89) return '2';
    if (score >= 77) return '3';
    if (score >= 60) return '4';
    if (score >= 40) return '5';
    return '6';
}

/**
 * 캘린더 생성
 */
function generateCalendar() {
    const calendar = document.getElementById('calendar');
    if (!calendar) return;

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const today = now.getDate();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // 요일 헤더
    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
    weekDays.forEach(day => {
        const div = document.createElement('div');
        div.className = 'calendar-day calendar-header';
        div.textContent = day;
        calendar.appendChild(div);
    });

    // 빈 칸 채우기
    for (let i = 0; i < firstDay; i++) {
        const div = document.createElement('div');
        div.className = 'calendar-day';
        calendar.appendChild(div);
    }

    // 날짜 채우기
    const studyDates = JSON.parse(localStorage.getItem('study_dates') || '[]');

    for (let day = 1; day <= daysInMonth; day++) {
        const div = document.createElement('div');
        div.className = 'calendar-day';
        div.textContent = day;

        // 오늘 표시
        if (day === today) {
            div.classList.add('today');
        }

        // 주말 표시
        const dayOfWeek = new Date(year, month, day).getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            div.classList.add('weekend');
        }

        // 학습한 날 표시
        const dateStr = new Date(year, month, day).toDateString();
        if (studyDates.includes(dateStr)) {
            div.classList.add('studied');
        }

        calendar.appendChild(div);
    }
}

/**
 * 이벤트 리스너 설정
 */
function setupEventListeners() {
    // 과목 버튼 클릭
    const subjectButtons = document.querySelectorAll('.subject-btn');
    subjectButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            subjectButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentSubject = this.dataset.subject;
            document.getElementById('currentSubject').textContent = `${currentSubject} 학습 중`;
        });
    });
}

/**
 * 목표 추가
 */
function addGoal() {
    const goalText = prompt('새로운 학습 목표를 입력하세요:');
    if (!goalText) return;

    const goals = JSON.parse(localStorage.getItem('daily_goals') || '[]');
    goals.push({
        text: goalText,
        completed: false,
        created_at: new Date().toISOString()
    });

    localStorage.setItem('daily_goals', JSON.stringify(goals));
    loadGoals();
}

/**
 * 타이머 시작/정지
 */
function startTimer() {
    if (timerInterval) {
        // 타이머 정지
        stopTimer();
    } else {
        // 과목 선택 확인
        if (!currentSubject) {
            alert('먼저 학습할 과목을 선택해주세요.');
            return;
        }

        // 타이머 시작
        timerInterval = setInterval(() => {
            timerSeconds++;
            updateTimerDisplay();
        }, 1000);

        // 오늘 날짜를 학습 날짜로 기록
        const today = new Date().toDateString();
        const studyDates = JSON.parse(localStorage.getItem('study_dates') || '[]');
        if (!studyDates.includes(today)) {
            studyDates.push(today);
            localStorage.setItem('study_dates', JSON.stringify(studyDates));
        }
    }
}

/**
 * 타이머 정지
 */
function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;

        // 학습 세션 저장
        if (timerSeconds > 0) {
            saveStudySession();
        }

        // 타이머 리셋
        timerSeconds = 0;
        updateTimerDisplay();
        document.getElementById('currentSubject').textContent = '학습 시작 버튼을 눌러주세요';
    }
}

/**
 * 타이머 디스플레이 업데이트
 */
function updateTimerDisplay() {
    const hours = Math.floor(timerSeconds / 3600);
    const minutes = Math.floor((timerSeconds % 3600) / 60);
    const seconds = timerSeconds % 60;

    const display = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    document.getElementById('timerDisplay').textContent = display;
}

/**
 * 학습 세션 저장
 */
function saveStudySession() {
    const sessions = JSON.parse(localStorage.getItem('study_sessions') || '[]');
    sessions.push({
        subject: currentSubject,
        duration: timerSeconds,
        date: new Date().toISOString()
    });
    localStorage.setItem('study_sessions', JSON.stringify(sessions));

    // 통계 업데이트
    updateUserStats();
}

/**
 * 사용자 통계 업데이트
 */
function updateUserStats() {
    const stats = JSON.parse(localStorage.getItem('user_stats') || '{}');

    // 포인트 추가 (10초당 1포인트)
    stats.points = (stats.points || 0) + Math.floor(timerSeconds / 10);

    localStorage.setItem('user_stats', JSON.stringify(stats));
    loadUserStats();
}

/**
 * 성적 추가
 */
function addGrade() {
    const subject = prompt('과목명을 입력하세요:');
    if (!subject) return;

    const score = prompt('점수를 입력하세요 (0-100):');
    if (!score || isNaN(score) || score < 0 || score > 100) return;

    const result = window.dbManager.addGrade({
        subject: subject,
        score: parseInt(score),
        exam_date: new Date().toISOString()
    });

    if (result.success) {
        alert('성적이 추가되었습니다.');
        loadGrades();
    } else {
        alert('성적 추가에 실패했습니다.');
    }
}