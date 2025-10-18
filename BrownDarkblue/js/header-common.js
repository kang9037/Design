// 공통 헤더 로드 함수
function loadHeader() {
    fetch('components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('common-header').innerHTML = data;
            initializeHeader();
        })
        .catch(error => console.error('헤더 로드 실패:', error));
}

// 로그인 상태 확인
function checkLoginStatus() {
    // localStorage에서 로그인 정보 확인
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
}

// 헤더 초기화 (스크롤 이벤트 등)
function initializeHeader() {
    const header = document.querySelector('.header');
    const nav = document.querySelector('.nav');
    const currentPage = window.location.pathname.split('/').pop();

    // 로드맵 페이지인 경우 네비게이션 메뉴 숨기기
    if (currentPage === 'roadmap.html') {
        if (nav) {
            // 기존 네비게이션 항목들 숨기기
            const navLinks = nav.querySelectorAll('a:not(.nav-cta)');
            navLinks.forEach(link => {
                link.style.display = 'none';
            });

            // 로그인 상태 확인
            const userInfo = checkLoginStatus();
            const navCta = nav.querySelector('.nav-cta');

            if (userInfo) {
                // 로그인된 경우: 토글 방식의 사용자 메뉴 표시
                // href 제거하여 페이지 이동 방지
                navCta.removeAttribute('href');
                navCta.style.cursor = 'pointer';
                navCta.style.background = 'transparent';
                navCta.style.border = 'none';
                navCta.style.padding = '0';

                navCta.innerHTML = `
                    <div class="user-menu" style="position: relative;">
                        <button class="user-toggle-btn" type="button" style="
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            gap: 8px;
                            padding: 10px 16px;
                            color: #854d0e;
                            background: transparent;
                            border: none;
                            border-radius: 8px;
                            transition: all 0.2s;
                            font-weight: 500;
                            font-size: 0.95em;
                            cursor: pointer;
                        ">
                            <span>👤</span>
                            <span>${userInfo.name || '사용자'}</span>
                            <span class="arrow">▼</span>
                        </button>
                        <div class="user-dropdown-menu" style="
                            display: none;
                            position: absolute;
                            top: calc(100% + 10px);
                            right: 0;
                            background: white;
                            border-radius: 12px;
                            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
                            padding: 8px;
                            min-width: 180px;
                            z-index: 99999;
                            border: 2px solid #ca8a04;
                        ">
                            <a href="mypage.html" style="
                                display: flex;
                                align-items: center;
                                gap: 8px;
                                padding: 10px 16px;
                                margin-bottom: 4px;
                                color: #854d0e;
                                background: white;
                                border: none;
                                text-decoration: none;
                                border-radius: 8px;
                                transition: all 0.2s;
                                font-weight: 500;
                                font-size: 0.95em;
                            ">
                                👤 마이페이지
                            </a>
                            <button type="button" class="logout-btn" style="
                                width: 100%;
                                display: flex;
                                align-items: center;
                                gap: 8px;
                                padding: 10px 16px;
                                background: white;
                                border: none;
                                color: #854d0e;
                                cursor: pointer;
                                border-radius: 8px;
                                transition: all 0.2s;
                                font-weight: 500;
                                font-size: 0.95em;
                            ">
                                🚪 로그아웃
                            </button>
                        </div>
                    </div>
                `;

                // 드롭다운 토글 이벤트
                const userMenu = navCta.querySelector('.user-menu');
                const userToggleBtn = userMenu.querySelector('.user-toggle-btn');
                const dropdownMenu = userMenu.querySelector('.user-dropdown-menu');
                const arrow = userMenu.querySelector('.arrow');
                const logoutBtn = userMenu.querySelector('.logout-btn');

                // 호버 효과
                userToggleBtn.addEventListener('mouseenter', () => {
                    userToggleBtn.style.background = '#fef9f5';
                });
                userToggleBtn.addEventListener('mouseleave', () => {
                    userToggleBtn.style.background = 'transparent';
                });

                // 토글 클릭
                userToggleBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    const isOpen = dropdownMenu.style.display === 'block';

                    if (isOpen) {
                        dropdownMenu.style.display = 'none';
                        arrow.textContent = '▼';
                    } else {
                        // 드롭다운 메뉴 위치 계산
                        const btnRect = userToggleBtn.getBoundingClientRect();
                        dropdownMenu.style.top = `${btnRect.bottom + 10}px`;
                        dropdownMenu.style.right = `${window.innerWidth - btnRect.right}px`;
                        dropdownMenu.style.display = 'block';
                        arrow.textContent = '▲';
                    }
                });

                // 로그아웃 버튼
                logoutBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    handleLogout();
                });

                // 메뉴 항목 호버
                const mypageLink = dropdownMenu.querySelector('a[href="mypage.html"]');
                if (mypageLink) {
                    mypageLink.addEventListener('mouseenter', () => {
                        mypageLink.style.background = '#fef9f5';
                    });
                    mypageLink.addEventListener('mouseleave', () => {
                        mypageLink.style.background = 'white';
                    });
                }

                // 로그아웃 버튼 호버 - 연한 빨간색
                if (logoutBtn) {
                    logoutBtn.addEventListener('mouseenter', () => {
                        logoutBtn.style.background = '#fee2e2';
                        logoutBtn.style.color = '#dc2626';
                    });
                    logoutBtn.addEventListener('mouseleave', () => {
                        logoutBtn.style.background = 'white';
                        logoutBtn.style.color = '#854d0e';
                    });
                }

                // 외부 클릭 시 닫기
                document.addEventListener('click', (e) => {
                    if (!userMenu.contains(e.target)) {
                        dropdownMenu.style.display = 'none';
                        arrow.textContent = '▼';
                    }
                });
            } else {
                // 로그인되지 않은 경우: 로그인 버튼 표시
                navCta.textContent = '로그인';
                navCta.href = 'login.html';
            }
        }
    }

    // 스크롤 이벤트
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 모바일 메뉴 버튼
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');

    if (mobileMenuBtn && nav) {
        // 모바일 메뉴 오버레이 생성
        let overlay = document.querySelector('.mobile-menu-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'mobile-menu-overlay';
            document.body.appendChild(overlay);
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
            overlay.classList.toggle('active');
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
            overlay.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = '';
        });

        // 오버레이 클릭 시 닫기
        overlay.addEventListener('click', function() {
            nav.classList.remove('active');
            overlay.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = '';
        });

        // 메뉴 내부 클릭은 전파 중지
        nav.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        // 메뉴 링크 클릭 시 메뉴 닫기
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                overlay.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
}

// 로그아웃 처리 함수
async function handleLogout() {
    try {
        // Supabase 로그아웃
        if (window.authManager) {
            await window.authManager.signOut();
        }

        // localStorage 정리
        localStorage.removeItem('userInfo');

        // 로그인 페이지로 이동
        window.location.href = 'login.html';
    } catch (error) {
        console.error('로그아웃 오류:', error);
        // 오류가 발생해도 로컬 데이터는 정리하고 로그인 페이지로 이동
        localStorage.removeItem('userInfo');
        window.location.href = 'login.html';
    }
}

// 페이지 로드 시 헤더 로드
document.addEventListener('DOMContentLoaded', loadHeader);
