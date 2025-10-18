/**
 * AI 로드맵 생성 API 연동 스크립트
 * OpenAI GPT-5 Nano를 활용한 실시간 학생 분석
 */

// API 엔드포인트 설정
const API_BASE_URL = 'http://localhost:3000';

/**
 * OpenAI API를 통한 AI 로드맵 생성
 * @param {Object} studentData - 학생 정보 데이터
 * @returns {Promise<Object>} AI 분석 결과
 */
async function generateAIRoadmap(studentData) {
    try {
        console.log('🤖 AI 로드맵 생성 요청...', studentData);

        const response = await fetch(`${API_BASE_URL}/api/generate-roadmap`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(studentData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'API 요청 실패');
        }

        const result = await response.json();
        console.log('✅ AI 분석 완료:', result);

        return result.data;

    } catch (error) {
        console.error('❌ AI 로드맵 생성 실패:', error);
        throw error;
    }
}

/**
 * AI 응답을 UI에 맞게 변환
 */
function transformAIResponseToUIFormat(aiData) {
    return {
        grades: {
            strong: aiData.gradeAnalysis?.strong || [],
            weak: aiData.gradeAnalysis?.needImprovement || [],
            improvement: aiData.gradeAnalysis?.strategies || []
        },
        activities: {
            strong: aiData.activityAnalysis?.recommendations?.slice(0, 2) || [],
            lacking: aiData.activityAnalysis?.lacking || [],
            recommendations: aiData.activityAnalysis?.recommendations || []
        },
        overall: {
            possibility: aiData.summary?.possibility || 0,
            strengths: aiData.summary?.keyStrengths || [],
            challenges: aiData.summary?.keyWeaknesses || []
        },
        roadmap: transformRoadmapData(aiData.roadmap),
        universities: aiData.universityRecommendations || {},
        advice: aiData.finalAdvice || ''
    };
}

/**
 * 로드맵 데이터 변환
 */
function transformRoadmapData(roadmapData) {
    if (!roadmapData) return { grade1: [], grade2: [], grade3: [] };

    const transformed = {};

    ['grade1', 'grade2', 'grade3'].forEach(grade => {
        if (roadmapData[grade]) {
            transformed[grade] = roadmapData[grade].map(item => {
                if (typeof item === 'string') {
                    return item;
                } else if (item.task) {
                    return `${item.period}: ${item.task}${item.detail ? ' - ' + item.detail : ''}`;
                }
                return item;
            });
        } else {
            transformed[grade] = [];
        }
    });

    return transformed;
}

/**
 * goToStep2 함수를 OpenAI API 연동 버전으로 재정의
 */
window.goToStep2_AI = async function() {
    // 1. 데이터 수집 및 검증
    const data = collectAllData();
    const errors = validateData(data);

    if (errors.length > 0) {
        alert(errors.join('\n'));
        return;
    }

    // 데이터 저장
    saveToLocalStorage(data);

    // 문서 헤더 정보 업데이트
    const docName = document.getElementById('doc-name');
    const docGrade = document.getElementById('doc-grade');
    const docSchool = document.getElementById('doc-school');
    const docMajor = document.getElementById('doc-major');
    const docDept = document.getElementById('doc-dept');

    if (docName) docName.textContent = data.name;
    if (docGrade) docGrade.textContent = `고등학교 ${data.grade}학년`;
    if (docSchool) docSchool.textContent = data.schoolName;
    if (docMajor) docMajor.textContent = data.major;
    if (docDept) docDept.textContent = data.department;

    // 날짜와 문서 번호 설정
    const today = new Date();
    const docDate = document.getElementById('doc-date');
    const docNumber = document.getElementById('doc-number');

    if (docDate) docDate.textContent = today.toLocaleDateString('ko-KR');
    if (docNumber) docNumber.textContent = Math.floor(Math.random() * 10000).toString().padStart(4, '0');

    // 모달 열기
    const reportModal = document.getElementById('reportModal');
    if (!reportModal) {
        console.error('reportModal 요소를 찾을 수 없습니다.');
        return;
    }
    reportModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // 로딩 오버레이 추가
    const modalContent = document.querySelector('.modal-content');
    if (!modalContent) {
        console.error('modal-content 요소를 찾을 수 없습니다.');
        return;
    }

    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-spinner"></div>
        <div class="loading-message" id="ai-status">🤖 OpenAI가 분석 중입니다... ✨</div>
    `;
    modalContent.appendChild(loadingOverlay);

    try {
        // 🔥 OpenAI API 호출
        const aiStatus = document.getElementById('ai-status');
        if (aiStatus) aiStatus.textContent = '🧠 GPT-5 Nano가 학생 데이터를 분석하고 있습니다...';

        const aiAnalysis = await generateAIRoadmap(data);

        if (aiStatus) aiStatus.textContent = '✨ AI 분석 완료! 결과를 생성하고 있습니다...';

        // AI 응답을 UI 형식으로 변환
        const insights = transformAIResponseToUIFormat(aiAnalysis);
        const roadmap = insights.roadmap;

        // 보고서 내용 동적 업데이트
        updateReportContent(data, insights, roadmap);

        // 로딩 제거
        setTimeout(() => {
            loadingOverlay.remove();
            const pdfButton = document.getElementById('pdfButton');
            if (pdfButton) pdfButton.classList.add('show');

            // 차트 생성
            if (typeof createCharts === 'function') {
                setTimeout(() => {
                    createCharts();
                }, 100);
            }
        }, 500);

    } catch (error) {
        console.error('AI 분석 실패:', error);

        // 에러 메시지 표시
        loadingOverlay.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <div style="font-size: 3em; margin-bottom: 20px;">⚠️</div>
                <div style="font-size: 1.3em; font-weight: 700; color: #dc2626; margin-bottom: 15px;">
                    AI 분석 중 오류가 발생했습니다
                </div>
                <div style="color: #666; margin-bottom: 20px;">
                    ${error.message}
                </div>
                <div style="color: #666; font-size: 0.9em; margin-bottom: 30px;">
                    서버가 실행 중인지 확인해주세요. (http://localhost:3000)
                </div>
                <button onclick="closeModal()" class="btn btn-primary">
                    닫기
                </button>
            </div>
        `;

        // 3초 후에도 계속 에러 표시
        setTimeout(() => {
            // 사용자가 직접 닫을 때까지 유지
        }, 3000);
    }
};

/**
 * 기존 goToStep2 함수를 백업하고 새 함수로 교체
 */
if (typeof window.goToStep2 === 'function') {
    window.goToStep2_Original = window.goToStep2; // 백업
    window.goToStep2 = window.goToStep2_AI;       // AI 버전으로 교체
    console.log('✅ goToStep2 함수가 AI 버전으로 업그레이드되었습니다!');
}
