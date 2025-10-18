// 현재 단계
let currentStep = 1;

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 전체 동의 체크박스
    const agreeAll = document.getElementById('agreeAll');
    const termsChecks = document.querySelectorAll('.terms-check');

    agreeAll.addEventListener('change', function() {
        termsChecks.forEach(check => {
            check.checked = this.checked;
        });
    });

    // 개별 체크박스 변경 시 전체 동의 업데이트
    termsChecks.forEach(check => {
        check.addEventListener('change', function() {
            const allChecked = Array.from(termsChecks).every(c => c.checked);
            agreeAll.checked = allChecked;
        });
    });

    // 사용자 유형 카드 선택
    const userTypeCards = document.querySelectorAll('.user-type-card');
    const userTypeSelect = document.getElementById('userType');
    const studentFields = document.getElementById('studentFields');

    userTypeCards.forEach(card => {
        card.addEventListener('click', function() {
            // 모든 카드의 selected 클래스 제거
            userTypeCards.forEach(c => c.classList.remove('selected'));

            // 클릭된 카드에 selected 클래스 추가
            this.classList.add('selected');

            // 숨겨진 select의 값 업데이트
            const value = this.dataset.value;
            userTypeSelect.value = value;

            // 학생 필드 표시/숨김
            if (value === 'student') {
                studentFields.classList.add('show');
            } else {
                studentFields.classList.remove('show');
            }
        });
    });

    // 기존 select 변경 시에도 동작하도록 (호환성)
    userTypeSelect.addEventListener('change', function() {
        if (this.value === 'student') {
            studentFields.classList.add('show');
        } else {
            studentFields.classList.remove('show');
        }
    });

    // 폼 제출
    const signupForm = document.getElementById('signupForm');
    signupForm.addEventListener('submit', handleSignup);
});

/**
 * 다음 단계로 이동
 */
function nextStep(step) {
    // 현재 단계 유효성 검사
    if (!validateStep(currentStep)) {
        return;
    }

    // 단계 전환
    changeStep(step);
}

/**
 * 이전 단계로 이동
 */
function prevStep(step) {
    changeStep(step);
}

/**
 * 단계 변경
 */
function changeStep(step) {
    // 폼 스텝 변경
    const formSteps = document.querySelectorAll('.form-step');
    formSteps.forEach(s => s.classList.remove('active'));
    document.querySelector(`.form-step[data-step="${step}"]`).classList.add('active');

    // 진행 표시 업데이트
    const steps = document.querySelectorAll('.step');
    steps.forEach((s, index) => {
        const stepNum = index + 1;
        s.classList.remove('active', 'completed');

        if (stepNum < step) {
            s.classList.add('completed');
        } else if (stepNum === step) {
            s.classList.add('active');
        }
    });

    currentStep = step;

    // 페이지 상단으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * 현재 단계 유효성 검사
 */
function validateStep(step) {
    switch(step) {
        case 1:
            // 필수 약관 동의 확인
            const agreeTerms = document.getElementById('agreeTerms').checked;
            const agreePrivacy = document.getElementById('agreePrivacy').checked;

            if (!agreeTerms || !agreePrivacy) {
                alert('필수 약관에 동의해주세요.');
                return false;
            }
            return true;

        case 2:
            // 기본 정보 유효성 검사
            const userType = document.getElementById('userType').value;
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const passwordConfirm = document.getElementById('passwordConfirm').value;

            if (!userType) {
                alert('사용자 유형을 선택해주세요.');
                return false;
            }

            if (!fullName.trim()) {
                alert('이름을 입력해주세요.');
                return false;
            }

            if (!email.trim()) {
                alert('아이디를 입력해주세요.');
                return false;
            }

            // 아이디 길이 검증 (4자 이상)
            if (email.length < 4) {
                alert('아이디는 최소 4자 이상이어야 합니다.');
                return false;
            }

            if (password.length < 4) {
                alert('비밀번호는 최소 4자 이상이어야 합니다.');
                return false;
            }

            if (password !== passwordConfirm) {
                alert('비밀번호가 일치하지 않습니다.');
                return false;
            }

            return true;

        default:
            return true;
    }
}

/**
 * 회원가입 처리
 */
async function handleSignup(e) {
    e.preventDefault();

    // 모든 입력값 가져오기
    const formData = {
        userType: document.getElementById('userType').value,
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        phone: document.getElementById('phone').value,
        schoolName: document.getElementById('schoolName').value,
        grade: document.getElementById('grade').value,
        classNumber: document.getElementById('classNumber').value,
        studentNumber: document.getElementById('studentNumber').value
    };

    // 로딩 표시
    const submitBtn = document.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>가입 처리 중...</span>';

    try {
        // Supabase 회원가입
        const result = await window.authManager.signUp(
            formData.email,
            formData.password,
            {
                user_type: formData.userType,
                full_name: formData.fullName,
                phone: formData.phone
            }
        );

        if (result.success) {
            // 학생인 경우 추가 정보 저장
            if (formData.userType === 'student' && formData.schoolName) {
                await saveStudentDetails(result.user.id, formData);
            }

            alert('회원가입이 완료되었습니다!\n이메일을 확인하여 인증을 완료해주세요.');
            window.location.href = 'login.html';
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('회원가입 오류:', error);
        alert('회원가입 중 오류가 발생했습니다.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
}

/**
 * 학생 상세 정보 저장
 */
async function saveStudentDetails(userId, formData) {
    try {
        const { data, error } = await window.supabaseClient
            .from('student_details')
            .insert({
                user_id: userId,
                student_number: formData.studentNumber || null,
                school_name: formData.schoolName,
                grade: formData.grade ? parseInt(formData.grade) : null,
                class_number: formData.classNumber ? parseInt(formData.classNumber) : null
            });

        if (error) throw error;
        console.log('학생 정보 저장 완료:', data);
    } catch (error) {
        console.error('학생 정보 저장 실패:', error);
        // 학생 정보 저장 실패는 회원가입에 영향을 주지 않음
    }
}

// 헤더 스크롤 이벤트
const header = document.querySelector('.header');
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
