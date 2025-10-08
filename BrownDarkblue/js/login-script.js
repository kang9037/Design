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
        studentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const id = document.getElementById('student-id').value;
            const password = document.getElementById('student-password').value;

            // 테스트 계정 확인
            if (id === 'test' && password === '1111') {
                // 로그인 성공 - 로드맵 페이지로 이동
                window.location.href = 'roadmap.html';
            } else {
                // 로그인 실패
                alert('아이디 또는 비밀번호가 올바르지 않습니다.');
            }
        });
    }

    if (adminForm) {
        adminForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const id = document.getElementById('admin-id').value;
            const password = document.getElementById('admin-password').value;

            // 여기에 실제 로그인 로직을 구현하세요
            console.log('관리자 로그인:', { id, password });
            alert('관리자 로그인 기능은 서버 연동 후 사용 가능합니다.');
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
function findPassword() {
    const id = document.getElementById('find-pw-id').value;
    const email = document.getElementById('find-pw-email').value;

    if (!id || !email) {
        alert('모든 필드를 입력해주세요.');
        return;
    }

    // 여기에 실제 비밀번호 찾기 로직을 구현하세요
    console.log('비밀번호 찾기:', { userType: currentUserType, id, email });
    alert(`${email}로 비밀번호 재설정 링크를 전송했습니다.\n(실제 기능은 서버 연동 후 사용 가능합니다.)`);
    closeModal('findPasswordModal');
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
