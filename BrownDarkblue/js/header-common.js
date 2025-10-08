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

// 헤더 초기화 (스크롤 이벤트 등)
function initializeHeader() {
    const header = document.querySelector('.header');

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
    const nav = document.querySelector('.nav');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // 현재 페이지 활성화 (제거됨 - 섹션 링크 방식으로 변경)
}

// 페이지 로드 시 헤더 로드
document.addEventListener('DOMContentLoaded', loadHeader);
