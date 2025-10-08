// 스크롤 시 헤더 스타일 변경
let lastScroll = 0;
const header = document.querySelector('.header');

if (header) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// 부드러운 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // # 링크만 처리 (빈 # 제외)
        if (href && href !== '#' && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// Create observer for animations
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add stagger delay for multiple elements
            setTimeout(() => {
                entry.target.classList.add('visible');
                entry.target.style.animationDelay = '0s';
            }, index * 100);

            // Don't unobserve to keep elements visible
            animationObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Initialize animations on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // Select all animatable elements
    const animateElements = document.querySelectorAll(
        '.feature-card, .gallery-item, .review-card, .pricing-card, ' +
        '.stat-card, .why-card, .process-step, .faq-item, ' +
        '.section-header, .hero-content > *, .contact-item'
    );

    // Add animation class and observe
    animateElements.forEach((el, index) => {
        el.classList.add('animate-on-scroll');
        el.style.transform = 'translateY(30px)';

        // Add stagger delay based on element group
        const delay = (index % 4) * 0.1;
        el.style.transitionDelay = `${delay}s`;

        animationObserver.observe(el);
    });

    // Special handling for section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.classList.add('animate-on-scroll');
        animationObserver.observe(header);
    });
});

// 갤러리 탭 필터링
const tabBtns = document.querySelectorAll('.tab-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.dataset.category;

        // 활성 탭 변경
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // 갤러리 아이템 필터링
        galleryItems.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// 갤러리 이미지 모달
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const title = item.querySelector('h4').textContent;
        const description = item.querySelector('span').textContent;

        const modal = document.createElement('div');
        modal.className = 'gallery-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <img src="${img.src}" alt="${title}">
                <div class="modal-info">
                    <h3>${title}</h3>
                    <p>${description}</p>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        // 모달 애니메이션
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.querySelector('.modal-content').style.transform = 'scale(1)';
        }, 10);

        // 모달 닫기
        const closeModal = () => {
            modal.style.opacity = '0';
            modal.querySelector('.modal-content').style.transform = 'scale(0.9)';
            setTimeout(() => {
                document.body.removeChild(modal);
                document.body.style.overflow = '';
            }, 300);
        };

        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.querySelector('.modal-overlay').addEventListener('click', closeModal);

        // ESC 키로 닫기
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    });
});

// 모달 스타일 추가
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .gallery-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(10px);
    }

    .modal-content {
        position: relative;
        max-width: 90vw;
        max-height: 90vh;
        background: white;
        border-radius: 1.5rem;
        overflow: hidden;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        transform: scale(0.9);
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .modal-close {
        position: absolute;
        top: 1.5rem;
        right: 1.5rem;
        width: 3rem;
        height: 3rem;
        border: none;
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(10px);
        border-radius: 50%;
        font-size: 1.5rem;
        color: #171717;
        cursor: pointer;
        z-index: 10;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .modal-close:hover {
        background: white;
        transform: rotate(90deg);
    }

    .modal-content img {
        width: 100%;
        height: auto;
        max-height: 70vh;
        object-fit: contain;
        display: block;
    }

    .modal-info {
        padding: 2rem;
        background: white;
    }

    .modal-info h3 {
        font-size: 1.5rem;
        font-weight: 700;
        color: #171717;
        margin-bottom: 0.5rem;
    }

    .modal-info p {
        font-size: 1rem;
        color: #737373;
        font-weight: 300;
    }

    @media (max-width: 768px) {
        .modal-content {
            max-width: 95vw;
        }

        .modal-info {
            padding: 1.5rem;
        }
    }
`;
document.head.appendChild(modalStyles);

// 폼 제출 처리
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, select, textarea');

    // 실시간 유효성 검사
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });

        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            // 성공 메시지 표시
            showNotification('상담 신청이 접수되었습니다!<br>빠른 시일 내에 연락드리겠습니다.', 'success');
            contactForm.reset();
            inputs.forEach(input => input.classList.remove('error', 'success'));
        } else {
            showNotification('입력 내용을 확인해주세요.', 'error');
        }
    });
}

function validateField(field) {
    const value = field.value.trim();

    if (field.hasAttribute('required') && value === '') {
        field.classList.add('error');
        field.classList.remove('success');
        return false;
    }

    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.classList.add('error');
            field.classList.remove('success');
            return false;
        }
    }

    if (field.type === 'tel' && value) {
        const telRegex = /^[0-9-+() ]+$/;
        if (!telRegex.test(value)) {
            field.classList.add('error');
            field.classList.remove('success');
            return false;
        }
    }

    field.classList.remove('error');
    field.classList.add('success');
    return true;
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 알림 스타일 추가
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #ef4444 !important;
        box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1) !important;
    }

    .form-group input.success,
    .form-group select.success,
    .form-group textarea.success {
        border-color: #10b981 !important;
    }

    .notification {
        position: fixed;
        top: 2rem;
        right: 2rem;
        padding: 1.25rem 2rem;
        background: white;
        border-radius: 0.75rem;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        z-index: 10000;
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 400px;
        font-size: 1rem;
        font-weight: 500;
    }

    .notification-success {
        border-left: 4px solid #10b981;
        color: #065f46;
    }

    .notification-error {
        border-left: 4px solid #ef4444;
        color: #991b1b;
    }

    @media (max-width: 768px) {
        .notification {
            left: 1rem;
            right: 1rem;
            top: 1rem;
        }
    }
`;
document.head.appendChild(notificationStyles);

// 모바일 메뉴
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // 모바일 메뉴 스타일
    const mobileMenuStyles = document.createElement('style');
    mobileMenuStyles.textContent = `
        @media (max-width: 768px) {
            .nav {
                position: fixed;
                top: 4.5rem;
                left: 0;
                right: 0;
                background: white;
                flex-direction: column;
                padding: 2rem;
                gap: 1.5rem;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                transform: translateY(-100%);
                opacity: 0;
                pointer-events: none;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                display: flex !important;
            }

            .nav.active {
                transform: translateY(0);
                opacity: 1;
                pointer-events: all;
            }

            .nav a {
                padding: 0.75rem;
                border-bottom: 1px solid var(--gray-100);
                width: 100%;
            }

            .nav a:last-child {
                border-bottom: none;
            }

            .mobile-menu-btn.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }

            .mobile-menu-btn.active span:nth-child(2) {
                opacity: 0;
            }

            .mobile-menu-btn.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -7px);
            }

            body.menu-open {
                overflow: hidden;
            }
        }
    `;
    document.head.appendChild(mobileMenuStyles);
}

// 스크롤 진행률 표시
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #a855f7, #7e22ce);
    z-index: 10001;
    transition: width 0.2s ease;
    width: 0;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
});

// 페이지 로드 완료 후 초기 애니메이션
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// 파트너 로고 무한 슬라이더 초기화
function initPartnerSlider() {
    const partnersGrid = document.querySelector('.partners-grid');
    if (!partnersGrid) return;

    // 원본 로고들을 복제하여 무한 루프 효과 생성
    const logos = partnersGrid.innerHTML;
    partnersGrid.innerHTML = logos + logos + logos; // 3배로 복제

    // 호버 시 일시 정지
    partnersGrid.addEventListener('mouseenter', () => {
        partnersGrid.style.animationPlayState = 'paused';
    });

    partnersGrid.addEventListener('mouseleave', () => {
        partnersGrid.style.animationPlayState = 'running';
    });
}

// DOMContentLoaded 시 슬라이더 초기화
document.addEventListener('DOMContentLoaded', () => {
    initPartnerSlider();
});

// 통계 카운터 애니메이션 (개선된 easing 효과 포함)
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const counter = entry.target;
            counter.classList.add('counted'); // 한 번만 실행되도록 플래그 추가

            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2500; // 2.5초 동안 애니메이션
            const start = 0;
            const startTime = performance.now();

            // Easing 함수 - ease-in-out-cubic
            const easeInOutCubic = (t) => {
                return t < 0.5
                    ? 4 * t * t * t
                    : 1 - Math.pow(-2 * t + 2, 3) / 2;
            };

            const updateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Easing 적용
                const easedProgress = easeInOutCubic(progress);
                const current = Math.floor(easedProgress * target);

                // 숫자 포맷팅 (천 단위 콤마)
                const formattedNumber = current.toLocaleString('ko-KR');

                // 레이블에 따라 접미사 추가
                const label = counter.parentElement.querySelector('.stat-label').textContent;
                if (label.includes('%')) {
                    counter.textContent = formattedNumber + '%';
                } else if (label.includes('시간')) {
                    counter.textContent = formattedNumber + '시간';
                } else {
                    counter.textContent = formattedNumber + (target >= 1000 ? '+' : '');
                }

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    // 최종 값 설정
                    const finalFormatted = target.toLocaleString('ko-KR');
                    if (label.includes('%')) {
                        counter.textContent = finalFormatted + '%';
                    } else if (label.includes('시간')) {
                        counter.textContent = finalFormatted + '시간';
                    } else {
                        counter.textContent = finalFormatted + (target >= 1000 ? '+' : '');
                    }

                    // 완료 시 bounce 효과
                    counter.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        counter.style.transform = 'scale(1)';
                    }, 200);
                }
            };

            // 애니메이션 시작
            requestAnimationFrame(updateCounter);

            // 더 이상 관찰하지 않음 (재실행 방지)
            counterObserver.unobserve(counter);
        }
    });
}, {
    threshold: 0.5,  // 요소가 50% 이상 보일 때 트리거
    rootMargin: '-50px 0px'  // 약간의 오프셋 추가
});

// FAQ 아코디언 기능
document.addEventListener('DOMContentLoaded', () => {
    // 카운터 관찰 시작
    const counters = document.querySelectorAll('.stat-number[data-target]');
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // FAQ 아코디언
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // 다른 모든 항목 닫기
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // 현재 항목 토글
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 뉴스레터 폼 처리
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('.newsletter-input').value;
            showNotification('뉴스레터 구독이 완료되었습니다!', 'success');
            newsletterForm.reset();
        });
    }
});

// 가격 카드 호버 효과
const pricingCards = document.querySelectorAll('.pricing-card');
pricingCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        pricingCards.forEach(c => {
            if (c !== card && !c.classList.contains('featured')) {
                c.style.opacity = '0.6';
                c.style.transform = 'scale(0.95)';
            }
        });
    });

    card.addEventListener('mouseleave', () => {
        pricingCards.forEach(c => {
            c.style.opacity = '1';
            c.style.transform = 'scale(1)';
        });
    });
});

// 통계 숫자 스타일 추가
const statNumberStyles = document.createElement('style');
statNumberStyles.textContent = `
    .stat-number {
        transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        font-variant-numeric: tabular-nums;
        letter-spacing: -0.02em;
    }

    .stat-number.counted {
        font-weight: 800;
    }
`;
document.head.appendChild(statNumberStyles);

// 리뷰 카드 자동 슬라이드 (선택적)
const reviewsGrid = document.querySelector('.reviews-grid');
if (reviewsGrid && window.innerWidth > 768) {
    let isHovering = false;

    reviewsGrid.addEventListener('mouseenter', () => {
        isHovering = true;
    });

    reviewsGrid.addEventListener('mouseleave', () => {
        isHovering = false;
    });
}

// Why Card 모달 데이터
const whyCardData = {
    1: {
        title: '검증된 시스템',
        subtitle: '150개 이상의 스터디케어에서 신뢰하는 플랫폼',
        text: '스터디케어는 2020년부터 전국 150개 이상의 스터디케어에서 사용되고 있는 검증된 스터디케어 관리 시스템입니다. 단순히 시스템을 제공하는 것을 넘어, 실제 학원 현장의 목소리를 들으며 지속적으로 발전해왔습니다. 매년 수천 명의 학생들이 우리 시스템을 통해 효율적으로 학습하고, 학부모님들은 자녀의 학습 현황을 실시간으로 확인하실 수 있습니다. 안정성과 신뢰성이 검증된 시스템으로 자기주도학습의 부담을 덜어드립니다.',
        features: [
            { icon: '📊', title: '150+ 학원', desc: '전국 150개 이상 학원 사용' },
            { icon: '👥', title: '수천 명 사용', desc: '매년 수천 명의 학생 이용' },
            { icon: '⭐', title: '높은 만족도', desc: '평균 4.8/5.0 사용자 평가' },
            { icon: '🔒', title: '안정성 보장', desc: '99.9% 시스템 안정성' }
        ]
    },
    2: {
        title: '통합 관리',
        subtitle: '15가지 기능을 하나의 시스템으로',
        text: '출결 관리, 성적 분석, 자습실 예약, 학부모 상담, 생활기록부 관리까지 자기주도학습에 필요한 모든 기능이 하나의 플랫폼에 통합되어 있습니다. 더 이상 여러 개의 시스템을 오가며 데이터를 확인할 필요가 없습니다. 모든 정보가 하나의 대시보드에서 실시간으로 동기화되어 업무 효율이 크게 향상됩니다. 선생님들은 학생 지도에만 집중하실 수 있습니다.',
        features: [
            { icon: '📝', title: '출결 관리', desc: '실시간 출석 체크 및 통계' },
            { icon: '📈', title: '성적 분석', desc: '과목별 상세 분석 리포트' },
            { icon: '🎯', title: '학습 관리', desc: '개인별 맞춤 학습 플랜' },
            { icon: '💬', title: '상담 시스템', desc: '학부모 소통 플랫폼' }
        ]
    },
    3: {
        title: '시간 절약',
        subtitle: '하루 평균 2시간 이상 업무 시간 절감',
        text: '반복적이고 시간 소모적인 행정 업무를 자동화하여 하루 평균 2시간 이상의 업무 시간을 절약할 수 있습니다. 출결 확인, 성적 입력, 학부모 알림 발송 등이 자동으로 처리되며, 선생님들은 학생 지도와 수업 준비에 더 많은 시간을 할애할 수 있습니다. 효율적인 시스템으로 업무 부담을 줄이고, 교육의 질을 높이세요.',
        features: [
            { icon: '⚡', title: '자동화', desc: '반복 업무 자동 처리' },
            { icon: '⏰', title: '2시간 절약', desc: '매일 평균 2시간 이상 절약' },
            { icon: '📱', title: '자동 알림', desc: '학부모 자동 알림 발송' },
            { icon: '🎨', title: '간편 입력', desc: '직관적인 UI로 빠른 입력' }
        ]
    },
    4: {
        title: '데이터 분석',
        subtitle: '과학적 데이터 기반 학습 전략',
        text: '학생별 성적 추이, 학습 패턴, 취약 과목 등을 상세하게 분석하여 맞춤형 학습 전략을 수립할 수 있습니다. 단순히 점수만 보는 것이 아니라, 시간대별 집중도, 과목별 학습 시간, 모의고사 성적 변화 등을 종합적으로 분석합니다. 데이터 기반의 정확한 진단으로 학생들의 성적 향상을 도와드립니다.',
        features: [
            { icon: '📊', title: '성적 추이', desc: '과목별 상세 성적 분석' },
            { icon: '🎯', title: '취약점 분석', desc: 'AI 기반 취약점 파악' },
            { icon: '📈', title: '예측 분석', desc: '성적 향상 예측 모델' },
            { icon: '📑', title: '리포트', desc: '맞춤형 분석 리포트' }
        ]
    },
    5: {
        title: '실시간 동기화',
        subtitle: '언제 어디서나 최신 정보 확인',
        text: '모든 데이터가 클라우드에 실시간으로 동기화되어, PC, 태블릿, 스마트폰 등 어떤 기기에서든 최신 정보를 확인할 수 있습니다. 스터디케어에서 입력한 출결 정보를 학부모님은 즉시 스마트폰으로 확인하실 수 있으며, 선생님들도 이동 중에 학생 정보를 조회할 수 있습니다. 장소와 시간의 제약 없이 효율적으로 학원을 운영하세요.',
        features: [
            { icon: '☁️', title: '클라우드', desc: '안전한 클라우드 저장' },
            { icon: '🔄', title: '자동 동기화', desc: '실시간 데이터 동기화' },
            { icon: '📱', title: '멀티 디바이스', desc: '모든 기기에서 접속' },
            { icon: '🌐', title: '24/7 접근', desc: '언제 어디서나 접속' }
        ]
    },
    6: {
        title: '확장 가능',
        subtitle: '스터디케어 규모에 맞춘 유연한 시스템',
        text: '소규모 스터디케어부터 대형 프랜차이즈까지, 학원의 규모와 특성에 맞춰 시스템을 자유롭게 확장하고 커스터마이징할 수 있습니다. 초기에는 기본 기능만 사용하다가, 필요에 따라 고급 기능을 추가할 수 있으며, 학원의 특수한 요구사항에 맞춰 기능을 개발해드릴 수도 있습니다. 함께 성장하는 파트너가 되겠습니다.',
        features: [
            { icon: '🏢', title: '맞춤형', desc: '스터디케어 규모별 맞춤 설정' },
            { icon: '🔧', title: '커스터마이징', desc: '필요한 기능 추가 개발' },
            { icon: '📈', title: '무제한 확장', desc: '제한 없는 기능 확장' },
            { icon: '🤝', title: '전담 지원', desc: '성장 단계별 컨설팅' }
        ]
    }
};

// Why Card 클릭 이벤트
let expandedCard = null;
let typingTimeout = null;

document.addEventListener('DOMContentLoaded', function() {
    const whyCards = document.querySelectorAll('.why-card');

    whyCards.forEach((card, index) => {
        card.addEventListener('click', function(e) {
            // 이미 확장된 카드를 클릭한 경우 무시
            if (card.classList.contains('expanded')) return;

            expandWhyCard(card, index + 1);
        });
    });
});

// 카드 확장
function expandWhyCard(card, cardNumber) {
    const data = whyCardData[cardNumber];
    if (!data) return;

    // 기존 확장된 카드가 있다면 닫기
    if (expandedCard && expandedCard !== card) {
        collapseWhyCard();
    }

    expandedCard = card;

    // 그리드에 확장 클래스 추가
    const whyGrid = card.closest('.why-grid');
    if (whyGrid) {
        whyGrid.classList.add('has-expanded');
    }

    // 모든 애니메이션과 transition 비활성화
    card.style.animation = 'none';
    card.style.transition = 'none';
    card.style.transform = 'none';

    // 카드를 즉시 맨 위로 이동
    card.style.order = '-999';
    card.classList.add('expanded');

    // 카드 원래 아이콘 가져오기
    const originalIcon = card.querySelector('.why-card-icon').innerHTML;

    // 확장된 콘텐츠 생성
    const expandedContent = `
        <div class="why-card-content-wrapper">
            <div class="why-card-left">
                <div class="icon-large">
                    ${originalIcon}
                </div>
                <h2>${data.title}</h2>
                <p class="subtitle">${data.subtitle}</p>
            </div>
            <div class="why-card-right">
                <div class="typing-text" id="typingText-${cardNumber}"></div>
            </div>
        </div>
        <button class="why-card-close" onclick="collapseWhyCard()">&times;</button>
    `;

    card.insertAdjacentHTML('beforeend', expandedContent);

    // 타이핑 애니메이션 시작
    setTimeout(() => {
        typeText(data.text, `typingText-${cardNumber}`);
    }, 200);

    // ESC 키로 닫기
    document.addEventListener('keydown', handleEscKey);
}

// 카드 축소
function collapseWhyCard() {
    if (!expandedCard) return;

    // 타이핑 애니메이션 중단
    if (typingTimeout) {
        clearTimeout(typingTimeout);
        typingTimeout = null;
    }

    // 그리드에서 확장 클래스 제거
    const whyGrid = expandedCard.closest('.why-grid');
    if (whyGrid) {
        whyGrid.classList.remove('has-expanded');
    }

    // 확장된 콘텐츠 제거
    const contentWrapper = expandedCard.querySelector('.why-card-content-wrapper');
    const closeBtn = expandedCard.querySelector('.why-card-close');
    if (contentWrapper) contentWrapper.remove();
    if (closeBtn) closeBtn.remove();

    // 카드 원래대로
    expandedCard.classList.remove('expanded');
    expandedCard.style.order = '';
    expandedCard.style.animation = '';
    expandedCard.style.transition = '';
    expandedCard.style.transform = '';
    expandedCard = null;

    // 이벤트 리스너 제거
    document.removeEventListener('keydown', handleEscKey);
}

// ESC 키 핸들러
function handleEscKey(e) {
    if (e.key === 'Escape') {
        collapseWhyCard();
    }
}

// 타이핑 애니메이션
function typeText(text, elementId, speed = 30) {
    const element = document.getElementById(elementId);
    if (!element) return;

    let index = 0;
    element.textContent = '';

    function type() {
        if (index < text.length && element.isConnected) {
            element.textContent += text.charAt(index);
            index++;
            typingTimeout = setTimeout(type, speed);
        } else if (element.isConnected) {
            // 타이핑 완료
            element.parentElement.classList.add('typing-complete');
        }
    }

    type();
}

console.log('🎉 스터디케어 관리 시스템 랜딩페이지가 로드되었습니다.');
