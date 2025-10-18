/**
 * 로그인 페이지 스크립트
 * 로컬 스토리지 기반 인증 시스템 사용
 */

document.addEventListener('DOMContentLoaded', function() {
    // 탭 전환 기능
    const tabButtons = document.querySelectorAll('.tab-btn');
    const forms = document.querySelectorAll('.auth-form');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const type = this.dataset.type;

            // 탭 버튼 활성화 상태 변경
            tabButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // 폼 표시 변경
            forms.forEach(form => {
                form.classList.remove('active');
                if (form.id === `${type}Form`) {
                    form.classList.add('active');
                }
            });
        });
    });

    // 학생 로그인 폼
    document.getElementById('studentForm').addEventListener('submit', async function(e) {
        e.preventDefault();

        const username = document.getElementById('student-id').value;
        const password = document.getElementById('student-password').value;
        const remember = document.getElementById('remember-student').checked;

        await handleLogin(username, password, 'student', remember);
    });

    // 학부모 로그인 폼
    document.getElementById('parentForm').addEventListener('submit', async function(e) {
        e.preventDefault();

        const username = document.getElementById('parent-id').value;
        const password = document.getElementById('parent-password').value;
        const remember = document.getElementById('remember-parent').checked;

        await handleLogin(username, password, 'parent', remember);
    });

    // 로그인 상태 유지 체크
    checkRememberedLogin();
});

/**
 * 로그인 처리
 */
async function handleLogin(username, password, userType, remember) {
    // 로딩 표시
    const submitBtn = event.submitter;
    const originalContent = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>로그인 중...</span>';

    try {
        // 관리자 계정 체크 (모든 탭에서 가능)
        if (username === 'admin' && password === '1111') {
            const adminUser = {
                id: 'admin',
                username: 'admin',
                user_type: 'admin',
                full_name: '시스템 관리자'
            };

            // 세션 저장
            sessionStorage.setItem('studycare_session', JSON.stringify(adminUser));

            if (remember) {
                if (userType === 'student') {
                    localStorage.setItem('remembered_student', username);
                } else if (userType === 'parent') {
                    localStorage.setItem('remembered_parent', username);
                }
            }

            showSuccessMessage('관리자 로그인 성공!');
            setTimeout(() => {
                window.location.href = 'dashboard.html'; // 관리자 대시보드로 이동
            }, 1000);
            return;
        }

        // 일반 사용자 로그인
        const result = await window.authManager.signIn(username, password);

        if (result.success) {
            // 사용자 타입 검증 (학생은 학생 탭, 학부모는 학부모 탭)
            if (userType === 'student' && result.user.user_type !== 'student') {
                showErrorMessage('학생 계정으로 로그인해주세요.');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalContent;
                return;
            }

            if (userType === 'parent' && result.user.user_type !== 'parent') {
                showErrorMessage('학부모 계정으로 로그인해주세요.');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalContent;
                return;
            }

            // 로그인 상태 유지
            if (remember) {
                if (userType === 'student') {
                    localStorage.setItem('remembered_student', username);
                } else if (userType === 'parent') {
                    localStorage.setItem('remembered_parent', username);
                }
            } else {
                localStorage.removeItem('remembered_student');
                localStorage.removeItem('remembered_parent');
            }

            showSuccessMessage(result.message);

            // 사용자 타입에 따라 리디렉션
            setTimeout(() => {
                if (result.user.user_type === 'student') {
                    window.location.href = 'dashboard.html';
                } else if (result.user.user_type === 'parent') {
                    window.location.href = 'dashboard.html'; // 학부모도 대시보드로 (추후 분리 가능)
                } else {
                    window.location.href = 'index.html';
                }
            }, 1000);
        } else {
            showErrorMessage(result.message);
        }
    } catch (error) {
        console.error('로그인 오류:', error);
        showErrorMessage('로그인 중 오류가 발생했습니다.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalContent;
    }
}

/**
 * 기억된 로그인 정보 확인
 */
function checkRememberedLogin() {
    const rememberedStudent = localStorage.getItem('remembered_student');
    if (rememberedStudent) {
        document.getElementById('student-id').value = rememberedStudent;
        document.getElementById('remember-student').checked = true;
    }

    const rememberedParent = localStorage.getItem('remembered_parent');
    if (rememberedParent) {
        document.getElementById('parent-id').value = rememberedParent;
        document.getElementById('remember-parent').checked = true;
    }
}

/**
 * 아이디 찾기 모달 표시
 */
function showFindIdModal() {
    const modal = document.getElementById('findIdModal');
    modal.classList.add('show');
}

/**
 * 비밀번호 찾기 모달 표시
 */
function showFindPasswordModal() {
    const modal = document.getElementById('findPasswordModal');
    modal.classList.add('show');
}

/**
 * 모달 닫기
 */
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('show');
}

/**
 * 아이디 찾기
 */
function findId() {
    const name = document.getElementById('find-id-name').value;
    const phone = document.getElementById('find-id-phone').value;

    if (!name || !phone) {
        showErrorMessage('이름과 전화번호를 입력해주세요.');
        return;
    }

    // 로컬 스토리지에서 사용자 검색
    const users = JSON.parse(localStorage.getItem('studycare_users') || '[]');
    const foundUsers = users.filter(u =>
        u.metadata.full_name === name &&
        u.metadata.phone === phone
    );

    if (foundUsers.length > 0) {
        const usernames = foundUsers.map(u => u.username).join(', ');
        showSuccessMessage(`찾은 아이디: ${usernames}`);

        // 결과를 모달에 표시
        const modalBody = document.querySelector('#findIdModal .modal-body');
        modalBody.innerHTML += `
            <div class="result-box" style="margin-top: 1rem; padding: 1rem; background: var(--primary-50); border-radius: 8px;">
                <p style="font-weight: 600; color: var(--primary-700);">찾은 아이디:</p>
                <p style="font-size: 1.125rem; color: var(--gray-900); margin-top: 0.5rem;">${usernames}</p>
            </div>
        `;
    } else {
        showErrorMessage('일치하는 사용자 정보를 찾을 수 없습니다.');
    }
}

/**
 * 비밀번호 재설정
 */
function resetPassword() {
    const username = document.getElementById('find-pw-id').value;
    const phone = document.getElementById('find-pw-phone').value;

    if (!username || !phone) {
        showErrorMessage('아이디와 전화번호를 입력해주세요.');
        return;
    }

    // 로컬 스토리지에서 사용자 확인
    const users = JSON.parse(localStorage.getItem('studycare_users') || '[]');
    const userIndex = users.findIndex(u =>
        u.username === username &&
        u.metadata.phone === phone
    );

    if (userIndex !== -1) {
        // 임시 비밀번호 생성
        const tempPassword = generateTempPassword();

        // 비밀번호 업데이트
        users[userIndex].password = btoa(tempPassword);
        users[userIndex].metadata.password_reset_at = new Date().toISOString();
        localStorage.setItem('studycare_users', JSON.stringify(users));

        showSuccessMessage(`임시 비밀번호가 생성되었습니다: ${tempPassword}`);

        // 결과를 모달에 표시
        const modalBody = document.querySelector('#findPasswordModal .modal-body');
        modalBody.innerHTML += `
            <div class="result-box" style="margin-top: 1rem; padding: 1rem; background: var(--success-50); border-radius: 8px;">
                <p style="font-weight: 600; color: var(--success-700);">임시 비밀번호:</p>
                <p style="font-size: 1.25rem; font-family: monospace; color: var(--gray-900); margin-top: 0.5rem;">${tempPassword}</p>
                <p style="font-size: 0.875rem; color: var(--gray-600); margin-top: 0.75rem;">로그인 후 비밀번호를 변경해주세요.</p>
            </div>
        `;
    } else {
        showErrorMessage('일치하는 사용자 정보를 찾을 수 없습니다.');
    }
}

/**
 * 임시 비밀번호 생성
 */
function generateTempPassword() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

/**
 * 성공 메시지 표시
 */
function showSuccessMessage(message) {
    showToast(message, 'success');
}

/**
 * 에러 메시지 표시
 */
function showErrorMessage(message) {
    showToast(message, 'error');
}

/**
 * 토스트 메시지 표시
 */
function showToast(message, type = 'info') {
    // 기존 토스트 제거
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    // 새 토스트 생성
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-icon">
            ${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}
        </div>
        <div class="toast-message">${message}</div>
    `;

    // 스타일 적용
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px 20px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        border-left: 4px solid ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#3b82f6'};
    `;

    document.body.appendChild(toast);

    // 3초 후 자동 제거
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// 토스트 애니메이션 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    .toast-icon {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        border-radius: 50%;
    }

    .toast-success .toast-icon {
        background: #dcfce7;
        color: #22c55e;
    }

    .toast-error .toast-icon {
        background: #fee2e2;
        color: #ef4444;
    }

    .toast-info .toast-icon {
        background: #dbeafe;
        color: #3b82f6;
    }

    .toast-message {
        color: #1f2937;
        font-weight: 500;
    }
`;
document.head.appendChild(style);