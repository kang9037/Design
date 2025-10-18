/**
 * 회원가입 페이지 스크립트
 * 로컬 스토리지 기반 회원가입 시스템
 */

let currentStep = 1;
let isUsernameChecked = false; // 아이디 중복확인 여부
let isPhoneVerified = false; // 휴대폰 인증 완료 여부
let verificationCode = ''; // 발송된 인증번호
let verificationTimer = null; // 타이머 인터벌
let timeLeft = 180; // 3분 (180초)

document.addEventListener('DOMContentLoaded', function() {
    // 전체 동의 체크박스
    const agreeAll = document.getElementById('agreeAll');
    const termsChecks = document.querySelectorAll('.terms-check');

    if (agreeAll) {
        agreeAll.addEventListener('change', function() {
            termsChecks.forEach(check => {
                check.checked = this.checked;
            });
        });
    }

    // 개별 체크박스 변경 시 전체 동의 업데이트
    termsChecks.forEach(check => {
        check.addEventListener('change', function() {
            const allChecked = Array.from(termsChecks).every(c => c.checked);
            if (agreeAll) {
                agreeAll.checked = allChecked;
            }
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
            if (userTypeSelect) {
                userTypeSelect.value = value;
            }

            // 학생 필드 표시/숨김
            if (value === 'student' && studentFields) {
                studentFields.classList.add('show');
            } else if (studentFields) {
                studentFields.classList.remove('show');
            }
        });
    });

    // 폼 제출
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }

    // 아이디 입력 필드 변경 감지
    const usernameInput = document.getElementById('username');
    if (usernameInput) {
        usernameInput.addEventListener('input', function() {
            isUsernameChecked = false; // 아이디 변경 시 중복확인 초기화
            const messageEl = document.getElementById('usernameMessage');
            if (messageEl) {
                messageEl.textContent = '';
                messageEl.style.color = '';
            }
        });
    }

    // 휴대폰 번호 자동 포맷팅
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/[^0-9]/g, '');

            if (value.length > 11) {
                value = value.slice(0, 11);
            }

            if (value.length >= 7) {
                e.target.value = value.replace(/(\d{3})(\d{4})(\d{0,4})/, '$1-$2-$3');
            } else if (value.length >= 3) {
                e.target.value = value.replace(/(\d{3})(\d{0,4})/, '$1-$2');
            } else {
                e.target.value = value;
            }

            // 휴대폰 번호 변경 시 인증 초기화
            if (isPhoneVerified) {
                isPhoneVerified = false;
                const messageEl = document.getElementById('phoneMessage');
                if (messageEl) {
                    messageEl.textContent = '';
                    messageEl.style.color = '';
                }
            }
        });
    }
});

/**
 * 아이디 중복확인
 */
async function checkUsername() {
    const username = document.getElementById('username')?.value;
    const messageEl = document.getElementById('usernameMessage');

    if (!username || username.trim().length === 0) {
        if (messageEl) {
            messageEl.textContent = '아이디를 입력해주세요.';
            messageEl.style.color = 'var(--error-600, #dc2626)';
        }
        return;
    }

    if (username.length < 4) {
        if (messageEl) {
            messageEl.textContent = '아이디는 최소 4자 이상이어야 합니다.';
            messageEl.style.color = 'var(--error-600, #dc2626)';
        }
        return;
    }

    // 로컬 스토리지에서 기존 사용자 확인
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const isDuplicate = users.some(user => user.username === username);

    if (isDuplicate) {
        isUsernameChecked = false;
        if (messageEl) {
            messageEl.textContent = '이미 사용 중인 아이디입니다.';
            messageEl.style.color = 'var(--error-600, #dc2626)';
        }
        showErrorMessage('이미 사용 중인 아이디입니다.');
    } else {
        isUsernameChecked = true;
        if (messageEl) {
            messageEl.textContent = '✓ 사용 가능한 아이디입니다.';
            messageEl.style.color = 'var(--success-600, #16a34a)';
        }
        showSuccessMessage('사용 가능한 아이디입니다.');
    }
}

/**
 * 인증번호 발송
 */
function sendVerificationCode() {
    const phone = document.getElementById('phone')?.value;
    const messageEl = document.getElementById('phoneMessage');
    const verificationSection = document.getElementById('verificationCodeSection');
    const sendBtn = document.getElementById('sendVerificationBtn');

    // 휴대폰 번호 검증
    const phoneRegex = /^010-\d{4}-\d{4}$/;
    if (!phone || !phoneRegex.test(phone)) {
        if (messageEl) {
            messageEl.textContent = '올바른 휴대폰 번호를 입력해주세요. (예: 010-1234-5678)';
            messageEl.style.color = 'var(--error-600, #dc2626)';
        }
        showErrorMessage('올바른 휴대폰 번호를 입력해주세요.');
        return;
    }

    // 6자리 랜덤 인증번호 생성
    verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // 실제로는 SMS API를 통해 발송하지만, 로컬 환경에서는 콘솔에 표시
    console.log('='.repeat(50));
    console.log('📱 인증번호 발송');
    console.log('전화번호:', phone);
    console.log('인증번호:', verificationCode);
    console.log('='.repeat(50));

    // 인증번호 입력 섹션 표시
    if (verificationSection) {
        verificationSection.style.display = 'block';
    }

    // 메시지 표시
    if (messageEl) {
        messageEl.textContent = `✓ 인증번호가 발송되었습니다. (테스트용: ${verificationCode})`;
        messageEl.style.color = 'var(--success-600, #16a34a)';
    }

    // 버튼 텍스트 변경
    if (sendBtn) {
        sendBtn.textContent = '재발송';
    }

    showSuccessMessage(`인증번호가 발송되었습니다. (테스트용: ${verificationCode})`);

    // 타이머 시작
    startVerificationTimer();
}

/**
 * 인증 타이머 시작
 */
function startVerificationTimer() {
    // 기존 타이머 정리
    if (verificationTimer) {
        clearInterval(verificationTimer);
    }

    timeLeft = 180; // 3분 리셋
    const timerEl = document.getElementById('verificationTimer');

    verificationTimer = setInterval(() => {
        timeLeft--;

        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        if (timerEl) {
            timerEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }

        if (timeLeft <= 0) {
            clearInterval(verificationTimer);
            verificationCode = ''; // 인증번호 만료
            if (timerEl) {
                timerEl.textContent = '만료';
                timerEl.style.color = 'var(--gray-400)';
            }
            showErrorMessage('인증 시간이 만료되었습니다. 재발송 버튼을 눌러주세요.');
        }
    }, 1000);
}

/**
 * 인증번호 확인
 */
function verifyCode() {
    const inputCode = document.getElementById('verificationCode')?.value;
    const messageEl = document.getElementById('phoneMessage');

    if (!inputCode || inputCode.length !== 6) {
        if (messageEl) {
            messageEl.textContent = '6자리 인증번호를 입력해주세요.';
            messageEl.style.color = 'var(--error-600, #dc2626)';
        }
        showErrorMessage('6자리 인증번호를 입력해주세요.');
        return;
    }

    if (!verificationCode) {
        if (messageEl) {
            messageEl.textContent = '인증 시간이 만료되었습니다. 재발송해주세요.';
            messageEl.style.color = 'var(--error-600, #dc2626)';
        }
        showErrorMessage('인증 시간이 만료되었습니다.');
        return;
    }

    if (inputCode === verificationCode) {
        // 인증 성공
        isPhoneVerified = true;

        // 타이머 중지
        if (verificationTimer) {
            clearInterval(verificationTimer);
        }

        // 메시지 표시
        if (messageEl) {
            messageEl.textContent = '✓ 휴대폰 인증이 완료되었습니다.';
            messageEl.style.color = 'var(--success-600, #16a34a)';
        }

        // 인증 섹션 숨기기
        const verificationSection = document.getElementById('verificationCodeSection');
        if (verificationSection) {
            verificationSection.style.display = 'none';
        }

        // 입력 필드 비활성화
        const phoneInput = document.getElementById('phone');
        const sendBtn = document.getElementById('sendVerificationBtn');
        if (phoneInput) {
            phoneInput.disabled = true;
            phoneInput.style.background = 'var(--gray-100)';
        }
        if (sendBtn) {
            sendBtn.disabled = true;
            sendBtn.style.opacity = '0.5';
        }

        showSuccessMessage('휴대폰 인증이 완료되었습니다.');
    } else {
        // 인증 실패
        if (messageEl) {
            messageEl.textContent = '인증번호가 일치하지 않습니다.';
            messageEl.style.color = 'var(--error-600, #dc2626)';
        }
        showErrorMessage('인증번호가 일치하지 않습니다.');
    }
}

/**
 * 약관 상세보기 모달 열기
 */
function openTermsModal(type) {
    const modal = document.getElementById('termsModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');

    if (!modal || !modalTitle || !modalContent) return;

    // 약관 내용 설정
    let title = '';
    let content = '';

    switch(type) {
        case 'terms':
            title = '이용약관';
            content = `
                <h4 style="font-size: 1.125rem; font-weight: 700; margin-bottom: 1rem; color: var(--gray-900);">제1조 (목적)</h4>
                <p style="margin-bottom: 1.5rem; line-height: 1.8; color: var(--gray-700);">
                    이 약관은 입시네비게이션(이하 "회사")가 제공하는 모든 서비스의 이용 조건과 절차,
                    회사와 회원 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
                </p>

                <h4 style="font-size: 1.125rem; font-weight: 700; margin-bottom: 1rem; color: var(--gray-900);">제2조 (용어의 정의)</h4>
                <p style="margin-bottom: 1.5rem; line-height: 1.8; color: var(--gray-700);">
                    1. "서비스"란 회사가 제공하는 학습 관리 및 진로 설계 서비스를 의미합니다.<br>
                    2. "회원"이란 회사와 서비스 이용계약을 체결한 자를 말합니다.<br>
                    3. "아이디(ID)"란 회원의 식별과 서비스 이용을 위하여 회원이 설정하고 회사가 승인하는 문자와 숫자의 조합을 의미합니다.
                </p>

                <h4 style="font-size: 1.125rem; font-weight: 700; margin-bottom: 1rem; color: var(--gray-900);">제3조 (서비스의 제공 및 변경)</h4>
                <p style="margin-bottom: 1.5rem; line-height: 1.8; color: var(--gray-700);">
                    회사는 다음과 같은 서비스를 제공합니다:<br>
                    - 학습 진도 관리 및 분석<br>
                    - AI 기반 진로 추천<br>
                    - 학습 자료 제공<br>
                    - 성적 관리 및 분석<br>
                    - 입시 정보 제공
                </p>

                <h4 style="font-size: 1.125rem; font-weight: 700; margin-bottom: 1rem; color: var(--gray-900);">제4조 (서비스의 중단)</h4>
                <p style="margin-bottom: 1.5rem; line-height: 1.8; color: var(--gray-700);">
                    회사는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는
                    서비스의 제공을 일시적으로 중단할 수 있습니다.
                </p>
            `;
            break;

        case 'privacy':
            title = '개인정보 처리방침';
            content = `
                <h4 style="font-size: 1.125rem; font-weight: 700; margin-bottom: 1rem; color: var(--gray-900);">제1조 (개인정보의 수집 목적)</h4>
                <p style="margin-bottom: 1.5rem; line-height: 1.8; color: var(--gray-700);">
                    회사는 다음의 목적을 위하여 개인정보를 수집하고 있습니다:<br>
                    - 회원 가입 및 관리<br>
                    - 서비스 제공 및 개선<br>
                    - 학습 데이터 분석 및 통계<br>
                    - 공지사항 전달 및 고객 지원
                </p>

                <h4 style="font-size: 1.125rem; font-weight: 700; margin-bottom: 1rem; color: var(--gray-900);">제2조 (수집하는 개인정보 항목)</h4>
                <p style="margin-bottom: 1.5rem; line-height: 1.8; color: var(--gray-700);">
                    회사는 회원가입 시 다음 정보를 수집합니다:<br>
                    <strong>필수항목:</strong> 이름, 아이디, 비밀번호, 사용자 유형<br>
                    <strong>선택항목:</strong> 전화번호, 학교정보(학교명, 학년, 반)
                </p>

                <h4 style="font-size: 1.125rem; font-weight: 700; margin-bottom: 1rem; color: var(--gray-900);">제3조 (개인정보의 보유 및 이용기간)</h4>
                <p style="margin-bottom: 1.5rem; line-height: 1.8; color: var(--gray-700);">
                    회사는 회원 탈퇴 시까지 개인정보를 보유하며, 관계 법령에 따라 일정 기간 보관합니다.<br>
                    - 계약 또는 청약철회 등에 관한 기록: 5년<br>
                    - 대금결제 및 재화 등의 공급에 관한 기록: 5년<br>
                    - 소비자의 불만 또는 분쟁처리에 관한 기록: 3년
                </p>

                <h4 style="font-size: 1.125rem; font-weight: 700; margin-bottom: 1rem; color: var(--gray-900);">제4조 (개인정보의 제3자 제공)</h4>
                <p style="margin-bottom: 1.5rem; line-height: 1.8; color: var(--gray-700);">
                    회사는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다.
                    다만, 이용자가 사전에 동의한 경우 또는 법령의 규정에 의거한 경우는 예외로 합니다.
                </p>
            `;
            break;

        case 'marketing':
            title = '마케팅 정보 수신 동의';
            content = `
                <h4 style="font-size: 1.125rem; font-weight: 700; margin-bottom: 1rem; color: var(--gray-900);">마케팅 정보 수신 안내</h4>
                <p style="margin-bottom: 1.5rem; line-height: 1.8; color: var(--gray-700);">
                    입시네비게이션은 회원님께 다양한 혜택 정보 및 이벤트 안내를 위해
                    마케팅 정보를 발송하고자 합니다.
                </p>

                <h4 style="font-size: 1.125rem; font-weight: 700; margin-bottom: 1rem; color: var(--gray-900);">수신 정보의 내용</h4>
                <p style="margin-bottom: 1.5rem; line-height: 1.8; color: var(--gray-700);">
                    - 신규 서비스 및 기능 안내<br>
                    - 이벤트 및 프로모션 정보<br>
                    - 학습 콘텐츠 및 입시 정보<br>
                    - 맞춤형 학습 추천 정보
                </p>

                <h4 style="font-size: 1.125rem; font-weight: 700; margin-bottom: 1rem; color: var(--gray-900);">발송 방법</h4>
                <p style="margin-bottom: 1.5rem; line-height: 1.8; color: var(--gray-700);">
                    - 앱 푸시 알림<br>
                    - SMS 문자메시지<br>
                    - 이메일
                </p>

                <h4 style="font-size: 1.125rem; font-weight: 700; margin-bottom: 1rem; color: var(--gray-900);">철회 방법</h4>
                <p style="margin-bottom: 1.5rem; line-height: 1.8; color: var(--gray-700);">
                    마케팅 정보 수신에 동의하신 후에도 언제든지 수신을 거부하실 수 있습니다.<br>
                    - 마이페이지 > 설정 > 알림 설정에서 변경 가능<br>
                    - 고객센터를 통한 수신 거부 신청
                </p>

                <p style="line-height: 1.8; color: var(--gray-600); font-size: 0.875rem;">
                    ※ 본 동의는 선택사항이며, 동의하지 않으셔도 서비스 이용에 제한이 없습니다.
                </p>
            `;
            break;

        default:
            title = '약관';
            content = '<p>약관 내용을 불러올 수 없습니다.</p>';
    }

    modalTitle.textContent = title;
    modalContent.innerHTML = content;

    // 모달 표시
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // 스크롤 방지
}

/**
 * 약관 상세보기 모달 닫기
 */
function closeTermsModal() {
    const modal = document.getElementById('termsModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // 스크롤 복원
    }
}

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

    const targetStep = document.querySelector(`.form-step[data-step="${step}"]`);
    if (targetStep) {
        targetStep.classList.add('active');
    }

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
            const agreeTerms = document.getElementById('agreeTerms');
            const agreePrivacy = document.getElementById('agreePrivacy');

            if (!agreeTerms?.checked || !agreePrivacy?.checked) {
                showErrorMessage('필수 약관에 동의해주세요.');
                return false;
            }
            return true;

        case 2:
            // 기본 정보 유효성 검사
            const userType = document.getElementById('userType')?.value;
            const fullName = document.getElementById('fullName')?.value;
            const username = document.getElementById('username')?.value;
            const password = document.getElementById('password')?.value;
            const passwordConfirm = document.getElementById('passwordConfirm')?.value;

            if (!userType) {
                showErrorMessage('사용자 유형을 선택해주세요.');
                return false;
            }

            if (!fullName?.trim()) {
                showErrorMessage('이름을 입력해주세요.');
                return false;
            }

            if (!username?.trim()) {
                showErrorMessage('아이디를 입력해주세요.');
                return false;
            }

            // 아이디 길이 검증 (4자 이상)
            if (username.length < 4) {
                showErrorMessage('아이디는 최소 4자 이상이어야 합니다.');
                return false;
            }

            // 아이디 중복확인 여부 체크
            if (!isUsernameChecked) {
                showErrorMessage('아이디 중복확인을 해주세요.');
                return false;
            }

            if (password.length < 4) {
                showErrorMessage('비밀번호는 최소 4자 이상이어야 합니다.');
                return false;
            }

            if (password !== passwordConfirm) {
                showErrorMessage('비밀번호가 일치하지 않습니다.');
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
        userType: document.getElementById('userType')?.value,
        fullName: document.getElementById('fullName')?.value,
        username: document.getElementById('username')?.value,
        password: document.getElementById('password')?.value,
        phone: document.getElementById('phone')?.value,
        schoolName: document.getElementById('schoolName')?.value,
        grade: document.getElementById('grade')?.value,
        classNumber: document.getElementById('classNumber')?.value
    };

    // 로딩 표시
    const submitBtn = document.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>가입 처리 중...</span>';

    try {
        // 로컬 인증 시스템을 통한 회원가입
        const result = await window.authManager.signUp(
            formData.username,
            formData.password,
            {
                user_type: formData.userType,
                full_name: formData.fullName,
                phone: formData.phone,
                school_name: formData.schoolName,
                grade: formData.grade ? parseInt(formData.grade) : null,
                class_number: formData.classNumber ? parseInt(formData.classNumber) : null,
                marketing_agreed: document.getElementById('agreeMarketing')?.checked || false
            }
        );

        if (result.success) {
            showSuccessMessage('회원가입이 완료되었습니다!');

            // 회원가입 완료 모달 표시
            showCompletionModal(formData.fullName);

            // 2초 후 로그인 페이지로 이동
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        } else {
            showErrorMessage(result.message);
        }
    } catch (error) {
        console.error('회원가입 오류:', error);
        showErrorMessage('회원가입 중 오류가 발생했습니다.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
}

/**
 * 회원가입 완료 모달 표시
 */
function showCompletionModal(name) {
    const modal = document.createElement('div');
    modal.className = 'completion-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content" style="text-align: center; padding: 3rem;">
            <div style="width: 80px; height: 80px; margin: 0 auto 1.5rem; background: var(--gradient-success); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <path d="M9 11L12 14L22 4" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <h2 style="font-size: 1.875rem; font-weight: 700; color: var(--gray-900); margin-bottom: 0.5rem;">
                회원가입 완료!
            </h2>
            <p style="font-size: 1.125rem; color: var(--gray-600); margin-bottom: 1.5rem;">
                ${name}님, 입시네비게이션의 회원이 되신 것을 환영합니다!
            </p>
            <p style="color: var(--gray-500);">
                잠시 후 로그인 페이지로 이동합니다...
            </p>
        </div>
    `;

    // 모달 스타일
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease-out;
    `;

    const overlay = modal.querySelector('.modal-overlay');
    overlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px);
    `;

    const content = modal.querySelector('.modal-content');
    content.style.cssText = `
        position: relative;
        background: white;
        border-radius: 20px;
        max-width: 500px;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        animation: slideUp 0.3s ease-out;
        text-align: center;
        padding: 3rem;
    `;

    document.body.appendChild(modal);
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

// 애니메이션 스타일 추가
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

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
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