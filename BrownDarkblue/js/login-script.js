// 사용자 유형 탭 전환
document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const loginForms = document.querySelectorAll('.login-form');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const userType = this.getAttribute('data-type');

            // 탭 활성화
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // 폼 전환
            loginForms.forEach(form => {
                form.classList.remove('active');
                if (form.id === userType + 'Form') {
                    form.classList.add('active');
                }
            });
        });
    });

    // 폼 제출 이벤트
    const studentForm = document.getElementById('studentForm');
    const adminForm = document.getElementById('adminForm');

    if (studentForm) {
        studentForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const email = document.getElementById('student-id').value;
            const password = document.getElementById('student-password').value;
            const rememberMe = document.getElementById('remember-student').checked;

            // 로딩 표시
            const submitBtn = studentForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>로그인 중...</span>';

            try {
                // Supabase 로그인
                const result = await window.authManager.signIn(email, password);

                if (result.success) {
                    // 로그인 성공 - 사용자 정보 저장
                    const userInfo = {
                        email: result.user.email,
                        name: result.user.user_metadata?.name || result.user.email.split('@')[0],
                        type: 'student'
                    };
                    localStorage.setItem('userInfo', JSON.stringify(userInfo));

                    // 팝업 없이 바로 이동
                    window.location.href = 'roadmap.html';
                } else {
                    // 로그인 실패
                    alert(result.message);
                }
            } catch (error) {
                console.error('로그인 오류:', error);
                alert('로그인 중 오류가 발생했습니다.');
            } finally {
                // 버튼 복구
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        });
    }

    if (adminForm) {
        adminForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const email = document.getElementById('admin-id').value;
            const password = document.getElementById('admin-password').value;
            const rememberMe = document.getElementById('remember-admin').checked;

            // 로딩 표시
            const submitBtn = adminForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>로그인 중...</span>';

            try {
                // Supabase 로그인
                const result = await window.authManager.signIn(email, password);

                if (result.success) {
                    // user_metadata에서 관리자 권한 체크 (프로필 테이블 없어도 작동)
                    const user = result.user;
                    const userType = user.user_metadata?.user_type ||
                                   user.user_metadata?.original_username === 'admin' ? 'admin' : null;

                    if (userType === 'admin' || email === 'admin' || email.includes('admin@')) {
                        // 관리자 로그인 성공 - 사용자 정보 저장
                        const userInfo = {
                            email: result.user.email,
                            name: result.user.user_metadata?.name || '관리자',
                            type: 'admin'
                        };
                        localStorage.setItem('userInfo', JSON.stringify(userInfo));

                        // 팝업 없이 바로 이동
                        window.location.href = 'roadmap.html';
                    } else {
                        alert('관리자 권한이 없습니다.');
                        await window.authManager.signOut();
                    }
                } else {
                    // 로그인 실패
                    alert(result.message);
                }
            } catch (error) {
                console.error('로그인 오류:', error);
                alert('로그인 중 오류가 발생했습니다.');
            } finally {
                // 버튼 복구
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        });
    }
});

// 모달 관련 함수
let currentUserType = '';

function showFindIdModal(userType) {
    currentUserType = userType;
    const modal = document.getElementById('findIdModal');
    modal.classList.add('active');
}

function showFindPasswordModal(userType) {
    currentUserType = userType;
    const modal = document.getElementById('findPasswordModal');
    modal.classList.add('active');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');

    // 입력 필드 초기화
    const inputs = modal.querySelectorAll('input');
    inputs.forEach(input => input.value = '');
}

// 모달 배경 클릭 시 닫기
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// ESC 키로 모달 닫기
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal => modal.classList.remove('active'));
    }
});

// 아이디 찾기 함수
function findId() {
    const name = document.getElementById('find-id-name').value;
    const email = document.getElementById('find-id-email').value;

    if (!name || !email) {
        alert('모든 필드를 입력해주세요.');
        return;
    }

    // 여기에 실제 아이디 찾기 로직을 구현하세요
    console.log('아이디 찾기:', { userType: currentUserType, name, email });
    alert(`${email}로 아이디 정보를 전송했습니다.\n(실제 기능은 서버 연동 후 사용 가능합니다.)`);
    closeModal('findIdModal');
}

// 비밀번호 찾기 함수
async function findPassword() {
    const id = document.getElementById('find-pw-id').value;
    const email = document.getElementById('find-pw-email').value;

    if (!id || !email) {
        alert('모든 필드를 입력해주세요.');
        return;
    }

    try {
        // Supabase 비밀번호 재설정 이메일 전송
        const result = await window.authManager.resetPassword(email);

        if (result.success) {
            alert(result.message);
            closeModal('findPasswordModal');
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('비밀번호 재설정 오류:', error);
        alert('비밀번호 재설정 중 오류가 발생했습니다.');
    }
}

// 입력 필드 엔터 키 처리
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            if (activeModal.id === 'findIdModal') {
                findId();
            } else if (activeModal.id === 'findPasswordModal') {
                findPassword();
            }
        }
    }
});
