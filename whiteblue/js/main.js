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
            const duration = 1500; // 1.5초 동안 빠르게 애니메이션
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
                if (label.includes('만족도')) {
                    counter.textContent = formattedNumber + '%';
                } else if (label.includes('업무 효율')) {
                    counter.textContent = formattedNumber + '%↑';
                } else if (label.includes('시간')) {
                    counter.textContent = formattedNumber + '시간';
                } else if (label.includes('제휴') || label.includes('학원')) {
                    counter.textContent = formattedNumber + '+';
                } else {
                    counter.textContent = formattedNumber + (target >= 1000 ? '+' : '');
                }

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    // 최종 값 설정
                    const finalFormatted = target.toLocaleString('ko-KR');
                    if (label.includes('만족도')) {
                        counter.textContent = finalFormatted + '%';
                    } else if (label.includes('업무 효율')) {
                        counter.textContent = finalFormatted + '%↑';
                    } else if (label.includes('시간')) {
                        counter.textContent = finalFormatted + '시간';
                    } else if (label.includes('제휴') || label.includes('학원')) {
                        counter.textContent = finalFormatted + '+';
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

// Why Card 데이터는 현재 사용하지 않으므로 제거됨

// Why Card 관련 코드는 현재 사용하지 않으므로 제거됨

console.log('🎉 스터디케어 관리 시스템 랜딩페이지가 로드되었습니다.');
