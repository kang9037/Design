/**
 * 헤더 로더 및 모바일 메뉴 스크립트
 * 완전히 새로 작성된 깔끔한 코드
 */

// 헤더 로드 및 초기화
document.addEventListener('DOMContentLoaded', async function() {
    const headerContainer = document.getElementById('common-header');

    if (headerContainer) {
        try {
            // 헤더 HTML 로드 (경로 수정)
            const response = await fetch('/whiteblue/header.html');
            if (!response.ok) {
                // 상대 경로로 재시도
                const retryResponse = await fetch('header.html');
                if (!retryResponse.ok) {
                    throw new Error('헤더를 불러올 수 없습니다.');
                }
                const headerHTML = await retryResponse.text();
                headerContainer.innerHTML = headerHTML;
                initializeHeader();
                return;
            }

            const headerHTML = await response.text();
            headerContainer.innerHTML = headerHTML;

            // 헤더 초기화
            initializeHeader();
        } catch (error) {
            console.error('헤더 로드 실패:', error);
            // 폴백 헤더 표시
            headerContainer.innerHTML = getFallbackHeader();
            initializeHeader();
        }
    }
});

/**
 * 헤더 기능 초기화
 */
function initializeHeader() {
    // 스크롤 이벤트 처리
    initScrollEffect();

    // 데스크톱 기능 드롭다운
    initDesktopDropdown();

    // 모바일 메뉴
    initMobileMenu();

    // 로그인 상태 확인
    updateAuthUI();
}

/**
 * 스크롤 효과
 */
function initScrollEffect() {
    const header = document.querySelector('.header');
    if (!header) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * 데스크톱 기능 드롭다운
 */
function initDesktopDropdown() {
    const navItemWithDropdown = document.querySelector('.nav-item-with-dropdown');
    if (!navItemWithDropdown) return;

    const navLink = navItemWithDropdown.querySelector('.nav-link');
    const featuresDropdown = navItemWithDropdown.querySelector('.features-dropdown');

    if (!navLink || !featuresDropdown) return;

    // 기능 메뉴 클릭
    navLink.addEventListener('click', function(e) {
        e.preventDefault();
        navItemWithDropdown.classList.toggle('active');
    });

    // 외부 클릭 시 드롭다운 닫기
    document.addEventListener('click', function(e) {
        if (!navItemWithDropdown.contains(e.target)) {
            navItemWithDropdown.classList.remove('active');
        }
    });

    // 드롭다운 아이템 클릭 시 드롭다운 닫기
    const dropdownItems = featuresDropdown.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', () => {
            navItemWithDropdown.classList.remove('active');
        });
    });
}

/**
 * 모바일 메뉴 초기화
 */
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');

    if (!mobileMenuBtn || !nav) {
        console.warn('모바일 메뉴 요소를 찾을 수 없습니다.');
        return;
    }

    // 모바일 메뉴에 닫기 버튼 추가
    let closeBtn = nav.querySelector('.mobile-close-btn');
    if (!closeBtn) {
        closeBtn = document.createElement('button');
        closeBtn.className = 'mobile-close-btn';
        closeBtn.innerHTML = '✕';
        closeBtn.setAttribute('aria-label', '메뉴 닫기');
        nav.insertBefore(closeBtn, nav.firstChild);
    }

    // 햄버거 메뉴 클릭
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        nav.classList.toggle('active');
        this.classList.toggle('active');

        // body 스크롤 제어
        if (nav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // 닫기 버튼 클릭
    closeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        nav.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        document.body.style.overflow = '';
    });

    // 메뉴 외부 클릭 시 닫기
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target) && nav.classList.contains('active')) {
            nav.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // 메뉴 내부 클릭은 전파 중지
    nav.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // 메뉴 링크 클릭 시 메뉴 닫기
    const navLinks = nav.querySelectorAll('a:not(.nav-link)');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/**
 * 인증 상태에 따른 UI 업데이트
 */
function updateAuthUI() {
    const navCta = document.querySelector('.nav-cta');
    if (!navCta) return;

    // 세션 스토리지에서 사용자 정보 확인
    const sessionData = sessionStorage.getItem('studycare_session');

    if (sessionData) {
        try {
            const user = JSON.parse(sessionData);

            // 로그인 상태일 때 네비게이션 업데이트
            navCta.textContent = user.full_name || user.username;
            navCta.href = '#';
            navCta.style.position = 'relative';

            // 드롭다운 메뉴 내용 생성
            let dropdownContent = '';

            if (user.user_type === 'admin') {
                dropdownContent = `
                    <a href="dashboard.html">대시보드</a>
                    <a href="admin.html">관리자 페이지</a>
                    <div class="dropdown-divider"></div>
                    <a href="#" onclick="handleLogout(); return false;">로그아웃</a>
                `;
                navCta.textContent = '시스템 관리자';
            } else {
                dropdownContent = `
                    <a href="mypage.html">마이페이지</a>
                    <a href="dashboard.html">대시보드</a>
                    <div class="dropdown-divider"></div>
                    <a href="#" onclick="handleLogout(); return false;">로그아웃</a>
                `;
            }

            // 드롭다운 메뉴 추가
            const dropdown = document.createElement('div');
            dropdown.className = 'user-dropdown';
            dropdown.innerHTML = dropdownContent;

            navCta.parentElement.style.position = 'relative';
            navCta.parentElement.appendChild(dropdown);

            // 드롭다운 토글
            navCta.addEventListener('click', function(e) {
                e.preventDefault();
                dropdown.classList.toggle('show');
            });

            // 외부 클릭 시 드롭다운 닫기
            document.addEventListener('click', function(e) {
                if (!navCta.contains(e.target) && !dropdown.contains(e.target)) {
                    dropdown.classList.remove('show');
                }
            });
        } catch (error) {
            console.error('세션 데이터 파싱 오류:', error);
        }
    }
}

/**
 * 로그아웃 처리
 */
async function handleLogout() {
    if (confirm('로그아웃 하시겠습니까?')) {
        // 세션 스토리지 정리
        sessionStorage.removeItem('studycare_session');

        // authManager가 있으면 사용
        if (window.authManager) {
            const result = await window.authManager.signOut();
            alert(result.message);
        } else {
            alert('로그아웃 되었습니다.');
        }

        window.location.href = 'index.html';
    }
}

/**
 * 폴백 헤더 HTML
 */
function getFallbackHeader() {
    return `
        <header class="header">
            <div class="container">
                <a href="index.html" class="logo">
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                        <rect width="36" height="36" rx="10" fill="url(#gradient-logo)"/>
                        <path d="M18 10L25 14V22L18 26L11 22V14L18 10Z" stroke="white" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                        <defs>
                            <linearGradient id="gradient-logo" x1="0" y1="0" x2="36" y2="36">
                                <stop offset="0%" stop-color="#3b82f6"/>
                                <stop offset="100%" stop-color="#2563eb"/>
                            </linearGradient>
                        </defs>
                    </svg>
                    <span>입시네비게이션</span>
                </a>
                <button class="mobile-menu-btn" aria-label="메뉴">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <nav class="nav">
                    <a href="index.html">홈</a>
                    <a href="index.html#features">기능</a>
                    <a href="index.html#contact" class="nav-consultation">상담하기</a>
                    <a href="login.html" class="nav-cta">로그인</a>
                </nav>
            </div>
        </header>
    `;
}

// 데스크톱 드롭다운 스타일 주입
const desktopStyles = document.createElement('style');
desktopStyles.textContent = `
    /* 데스크톱 전용 스타일 (769px 이상) */
    @media (min-width: 769px) {
        .nav {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .mobile-nav-header {
            display: none;
        }

        .mobile-close-btn {
            display: none;
        }

        .nav-item-with-dropdown {
            position: relative;
            display: inline-block;
            margin-right: 0.5rem;
        }

        .nav-link {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.875rem 1.5rem;
            color: var(--gray-700);
            font-size: 1.0625rem;
            font-weight: 600;
            text-decoration: none;
            border-radius: 10px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            position: relative;
            letter-spacing: -0.01em;
        }

        .nav-link::before {
            content: '';
            position: absolute;
            bottom: 0.5rem;
            left: 50%;
            transform: translateX(-50%) scaleX(0);
            width: calc(100% - 2.5rem);
            height: 2px;
            background: linear-gradient(90deg,
                transparent 0%,
                #3b82f6 20%,
                #2563eb 50%,
                #3b82f6 80%,
                transparent 100%
            );
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 0 8px rgba(59, 130, 246, 0.4);
        }

        .nav-link::after {
            content: '▼';
            font-size: 0.65rem;
            transition: transform 0.3s ease;
            margin-left: 0.25rem;
        }

        .nav-item-with-dropdown.active .nav-link::after {
            transform: rotate(180deg);
        }

        .nav-link:hover {
            color: var(--primary-600);
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(59, 130, 246, 0.08) 100%);
            transform: translateY(-1px);
        }

        .nav-link:hover::before {
            transform: translateX(-50%) scaleX(1);
        }

        .nav-consultation {
            position: relative;
            padding: 0.875rem 1.5rem;
            margin-right: 1.5rem;
            color: var(--gray-700);
            font-size: 1.0625rem;
            font-weight: 600;
            text-decoration: none;
            border-radius: 10px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            letter-spacing: -0.01em;
        }

        .nav-consultation::before {
            content: '';
            position: absolute;
            bottom: 0.5rem;
            left: 50%;
            transform: translateX(-50%) scaleX(0);
            width: calc(100% - 2.5rem);
            height: 2px;
            background: linear-gradient(90deg,
                transparent 0%,
                #3b82f6 20%,
                #2563eb 50%,
                #3b82f6 80%,
                transparent 100%
            );
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 0 8px rgba(59, 130, 246, 0.4);
        }

        .nav-consultation:hover {
            color: var(--primary-600);
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(59, 130, 246, 0.08) 100%);
            transform: translateY(-1px);
        }

        .nav-consultation:hover::before {
            transform: translateX(-50%) scaleX(1);
        }

        .features-dropdown {
            visibility: hidden;
            opacity: 0;
            position: fixed;
            top: 5rem;
            left: 50%;
            transform: translateX(-50%) translateY(-10px);
            background: white;
            border-radius: 16px;
            box-shadow: 0 20px 60px -10px rgba(0, 0, 0, 0.15);
            border: 1px solid rgba(59, 130, 246, 0.1);
            padding: 1.5rem;
            z-index: 1000;
            width: min(720px, 90vw);
            max-width: 90vw;
            transition: opacity 0.3s ease-out, visibility 0.3s ease-out, transform 0.3s ease-out;
        }

        .nav-item-with-dropdown.active .features-dropdown {
            visibility: visible;
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }

        .dropdown-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.5rem;
        }

        .dropdown-item {
            display: flex;
            align-items: flex-start;
            gap: 1rem;
            padding: 1rem;
            border-radius: 12px;
            text-decoration: none;
            transition: all 0.2s ease;
            border: 1px solid transparent;
        }

        .dropdown-item:hover {
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(59, 130, 246, 0.08) 100%);
            border-color: rgba(59, 130, 246, 0.15);
            transform: translateX(4px);
        }

        .dropdown-icon {
            font-size: 1.5rem;
            line-height: 1;
            flex-shrink: 0;
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.15) 100%);
            border-radius: 8px;
        }

        .dropdown-content {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
        }

        .dropdown-content strong {
            color: var(--gray-900);
            font-size: 0.9375rem;
            font-weight: 600;
            display: block;
        }

        .dropdown-content span {
            color: var(--gray-600);
            font-size: 0.8125rem;
            line-height: 1.4;
            display: block;
        }

        .mobile-close-btn {
            display: none;
        }

        .nav-consultation {
            display: inline-block;
        }

        .nav-cta {
            display: inline-block;
        }
    }

    /* 사용자 드롭다운 */
    .user-dropdown {
        display: none;
        position: absolute;
        top: 100%;
        right: 0;
        margin-top: 0.5rem;
        background: white;
        border-radius: 12px;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        border: 1px solid var(--gray-100);
        min-width: 180px;
        overflow: hidden;
        z-index: 1000;
    }

    .user-dropdown.show {
        display: block;
        animation: dropdownFadeIn 0.2s ease-out;
    }

    .user-dropdown a {
        display: block;
        padding: 0.75rem 1rem;
        color: var(--gray-700);
        text-decoration: none;
        transition: all 0.2s ease;
        font-size: 0.9rem;
    }

    .user-dropdown a:hover {
        background: var(--primary-50);
        color: var(--primary-600);
    }

    .dropdown-divider {
        height: 1px;
        background: var(--gray-100);
        margin: 0.25rem 0;
    }

    @keyframes dropdownFadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(desktopStyles);
