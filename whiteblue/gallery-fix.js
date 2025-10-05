// 갤러리 이미지를 SVG placeholder로 교체
document.addEventListener('DOMContentLoaded', function() {
    const galleryImages = document.querySelectorAll('.gallery-item img');

    galleryImages.forEach((img, index) => {
        const alt = img.getAttribute('alt');
        const num = index + 1;

        // SVG placeholder 생성
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '400');
        svg.setAttribute('height', '300');
        svg.setAttribute('viewBox', '0 0 400 300');

        // 배경
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('width', '400');
        rect.setAttribute('height', '300');
        rect.setAttribute('fill', num % 3 === 1 ? '#3b82f6' : num % 3 === 2 ? '#2563eb' : '#1d4ed8');
        svg.appendChild(rect);

        // 아이콘
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', '200');
        circle.setAttribute('cy', '120');
        circle.setAttribute('r', '40');
        circle.setAttribute('fill', 'rgba(255, 255, 255, 0.2)');
        svg.appendChild(circle);

        const iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        iconPath.setAttribute('d', 'M200 90 L220 110 L200 130 L180 110 Z');
        iconPath.setAttribute('fill', 'white');
        svg.appendChild(iconPath);

        // 텍스트
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', '200');
        text.setAttribute('y', '200');
        text.setAttribute('font-family', 'Arial, sans-serif');
        text.setAttribute('font-size', '24');
        text.setAttribute('font-weight', 'bold');
        text.setAttribute('fill', 'white');
        text.setAttribute('text-anchor', 'middle');
        text.textContent = alt || `Screenshot ${num}`;
        svg.appendChild(text);

        // 이미지를 SVG로 교체
        img.replaceWith(svg);
    });
});
