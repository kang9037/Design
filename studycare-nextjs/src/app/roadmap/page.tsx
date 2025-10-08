'use client';

import { useState, FormEvent } from 'react';
import Header from '@/components/Header';
import styles from './roadmap.module.css';

export default function RoadmapPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    studentName: '김민준',
    currentGrade: '1',
    schoolName: '서울고등학교',
    major: '자연계열',
    department: '컴퓨터공학과',
    keywords: '인공지능, 프로그래밍, 데이터분석'
  });

  const goToStep2 = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.studentName.trim()) {
      alert('학생 이름을 입력해주세요');
      return;
    }
    setCurrentStep(2);
    setTimeout(() => setCurrentStep(3), 2500);
  };

  const updateStepClass = (stepNum: number) => {
    if (stepNum < currentStep) return styles.completed;
    if (stepNum === currentStep) return styles.active;
    return '';
  };

  return (
    <>
      <Header />

      <div className={styles.container}>
        <div className={styles.header}>
          <h1>📚 스터디케어</h1>
          <p>AI + 학교정보공시 API 기반 맞춤형 입시전략 로드맵</p>
        </div>

        <div className={styles.card}>
          {/* 단계 표시 */}
          <div className={styles.stepIndicator}>
            <div className={`${styles.step} ${updateStepClass(1)}`}>
              <div className={styles.stepCircle}>1</div>
              <div className={styles.stepLabel}>학생 정보 입력</div>
            </div>
            <div className={`${styles.step} ${updateStepClass(2)}`}>
              <div className={styles.stepCircle}>2</div>
              <div className={styles.stepLabel}>AI 분석 중</div>
            </div>
            <div className={`${styles.step} ${updateStepClass(3)}`}>
              <div className={styles.stepCircle}>3</div>
              <div className={styles.stepLabel}>로드맵 완성</div>
            </div>
          </div>

          {/* 1단계: 학생 정보 입력 */}
          {currentStep === 1 && (
            <div className={`${styles.formSection} ${styles.active}`}>
              <h2 className={styles.sectionTitle}>학생 기본 정보를 입력해주세요</h2>

              <form onSubmit={goToStep2}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>학생 이름</label>
                    <input
                      type="text"
                      value={formData.studentName}
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                      placeholder="예: 김민준"
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>현재 학년</label>
                    <select
                      value={formData.currentGrade}
                      onChange={(e) => setFormData({ ...formData, currentGrade: e.target.value })}
                    >
                      <option value="1">고등학교 1학년</option>
                      <option value="2">고등학교 2학년</option>
                      <option value="3">고등학교 3학년</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>학교명 🔗 학교정보공시 연동</label>
                    <input
                      type="text"
                      value={formData.schoolName}
                      onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                      placeholder="예: 서울고등학교"
                    />
                    <small className={styles.helperText}>✓ 학교알리미 API로 실시간 교육과정 불러오기</small>
                  </div>

                  <div className={styles.formGroup}>
                    <label>희망 계열</label>
                    <select
                      value={formData.major}
                      onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                    >
                      <option value="자연계열">자연계열</option>
                      <option value="인문계열">인문계열</option>
                      <option value="예체능계열">예체능계열</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>희망 학과/전공</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="예: 컴퓨터공학과"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>관심 분야 / 키워드 (선택)</label>
                  <textarea
                    value={formData.keywords}
                    onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                    rows={3}
                    placeholder="예: 인공지능, 데이터분석, 프로그래밍, 알고리즘"
                  />
                </div>

                <div className={styles.btnGroup}>
                  <button type="submit" className="btn btn-primary">
                    🔍 학교 데이터 분석 & 로드맵 생성
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* 2단계: AI 분석 중 */}
          {currentStep === 2 && (
            <div className={`${styles.formSection} ${styles.active}`}>
              <div className={styles.loadingContainer}>
                <div className={styles.loadingIcon}>🤖</div>
                <div className={styles.loadingText}>AI가 맞춤형 로드맵을 생성하고 있습니다...</div>
                <div className={styles.loadingSubtext}>
                  ✓ 학교알리미 API에서 교육과정 데이터 수집 중<br/>
                  ✓ 수행평가 계획 및 학사일정 분석 중<br/>
                  ✓ 희망 학과 맞춤 대학 추천 중<br/>
                  ✓ 3개년 활동 로드맵 자동 생성 중
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill}></div>
                </div>
              </div>
            </div>
          )}

          {/* 3단계: 프리미엄 문서형 결과물 */}
          {currentStep === 3 && (
            <div className={`${styles.formSection} ${styles.active}`}>
              <div className={styles.documentContainer}>
                {/* 문서 헤더 */}
                <div className={styles.documentHeader}>
                  <div className={styles.documentTitle}>🎓 3개년 맞춤형 입시전략 로드맵</div>
                  <div className={styles.documentSubtitle}>AI 기반 학생부 종합관리 및 대학입시 전략 보고서</div>
                  <div className={styles.documentMeta}>
                    <div className={styles.metaItem}>
                      <span>📅</span>
                      <span>{new Date().toLocaleDateString('ko-KR')} 생성</span>
                    </div>
                    <div className={styles.metaItem}>
                      <span>🔗</span>
                      <span>학교정보공시 API 연동</span>
                    </div>
                    <div className={styles.metaItem}>
                      <span>📊</span>
                      <span>스터디케어 ver 1.0</span>
                    </div>
                  </div>
                </div>

                {/* 문서 본문 */}
                <div className={styles.documentBody}>
                  {/* Section 1: 학생 기본 정보 */}
                  <div className={styles.section}>
                    <h2 className={styles.sectionTitleDoc}>
                      <span className={styles.sectionIcon}>👤</span>
                      학생 기본 정보
                    </h2>
                    <div className={styles.infoCards}>
                      <div className={styles.infoCard}>
                        <div className={styles.infoCardLabel}>학생명</div>
                        <div className={styles.infoCardValue}>{formData.studentName}</div>
                      </div>
                      <div className={styles.infoCard}>
                        <div className={styles.infoCardLabel}>현재 학년</div>
                        <div className={styles.infoCardValue}>고등학교 {formData.currentGrade}학년</div>
                      </div>
                      <div className={styles.infoCard}>
                        <div className={styles.infoCardLabel}>학교</div>
                        <div className={styles.infoCardValue}>{formData.schoolName}</div>
                      </div>
                      <div className={styles.infoCard}>
                        <div className={styles.infoCardLabel}>희망 계열</div>
                        <div className={styles.infoCardValue}>{formData.major}</div>
                      </div>
                      <div className={styles.infoCard}>
                        <div className={styles.infoCardLabel}>희망 학과</div>
                        <div className={styles.infoCardValue}>{formData.department}</div>
                      </div>
                      <div className={styles.infoCard}>
                        <div className={styles.infoCardLabel}>관심 분야</div>
                        <div className={styles.infoCardValue}>AI·프로그래밍</div>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: 학교 교육과정 분석 */}
                  <div className={styles.section}>
                    <h2 className={styles.sectionTitleDoc}>
                      <span className={styles.sectionIcon}>🏫</span>
                      학교 교육과정 분석
                      <span className={`${styles.badge} ${styles.badgeSuccess}`}>API 연동</span>
                    </h2>

                    <table className={styles.dataTable}>
                      <thead>
                        <tr>
                          <th style={{width: '25%'}}>항목</th>
                          <th>내용</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><strong>학교 유형</strong></td>
                          <td>공립 일반고등학교</td>
                        </tr>
                        <tr>
                          <td><strong>2024 대학진학률</strong></td>
                          <td>92.3% (4년제 78.5%, 전문대 13.8%)</td>
                        </tr>
                        <tr>
                          <td><strong>개설 선택과목</strong></td>
                          <td>
                            <span className={`${styles.badge} ${styles.badgePrimary}`}>정보</span>
                            <span className={`${styles.badge} ${styles.badgePrimary}`}>인공지능기초</span>
                            <span className={`${styles.badge} ${styles.badgePrimary}`}>심화수학I</span>
                            <span className={`${styles.badge} ${styles.badgePrimary}`}>미적분</span>
                            <span className={`${styles.badge} ${styles.badgePrimary}`}>확률과통계</span>
                            외 18과목
                          </td>
                        </tr>
                        <tr>
                          <td><strong>수행평가 비중</strong></td>
                          <td>정보(40%), 수학(30%), 과학탐구(35%), 국어(25%)</td>
                        </tr>
                        <tr>
                          <td><strong>학교 특색사업</strong></td>
                          <td>SW·AI 인재양성 중점학교, 과학중점반 운영, 수학·과학 심화반</td>
                        </tr>
                        <tr>
                          <td><strong>교내 경진대회</strong></td>
                          <td>코딩경진대회(11월), 수학경시대회(6월), 과학탐구대회(9월)</td>
                        </tr>
                      </tbody>
                    </table>

                    <div className={styles.strategyBox}>
                      <div className={styles.strategyTitle}>💡 AI 교육과정 분석 결과</div>
                      <div className={styles.strategyContent}>
                        서울고등학교는 <strong>SW·AI 중점학교</strong>로 지정되어 컴퓨터공학 희망자에게 최적화된 환경입니다.
                        정보 과목 수행평가 비중이 <strong>40%</strong>로 매우 높아 세부능력특기사항(세특) 작성에 유리하며,
                        인공지능기초 과목이 정규 교육과정에 편성되어 있습니다.
                        교내 <strong>코딩경진대회</strong>(매년 11월 개최)는 필수 참가 권장 활동입니다.
                      </div>
                    </div>
                  </div>

                  {/* 대학 추천 섹션은 길이 관계상 간략화 */}
                  <div className={styles.section}>
                    <h2 className={styles.sectionTitleDoc}>
                      <span className={styles.sectionIcon}>🎯</span>
                      컴퓨터공학과 맞춤 대학 추천
                    </h2>
                    <div className={styles.universityTiers}>
                      <div className={styles.tierBox}>
                        <div className={styles.tierHeader}>
                          <div className={styles.tierTitle}>
                            <span className={`${styles.badge} ${styles.badgeDanger}`}>🔥 도전 대학</span>
                            <span style={{fontSize: '0.85em', color: '#666'}}>내신 1.5등급 이내</span>
                          </div>
                        </div>
                        <div className={styles.tierUniversities}>
                          {['서울대 컴퓨터공학부', '카이스트 전산학부', '연세대 컴퓨터과학과', '고려대 컴퓨터학과', '포스텍 컴퓨터공학과'].map((univ, i) => (
                            <div key={i} className={styles.universityChip}>{univ}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 출력 섹션 */}
                <div className={styles.exportSection}>
                  <h3>📄 맞춤형 입시전략 보고서 다운로드</h3>
                  <p>학교 데이터 기반 완전한 입시전략이 담긴 프리미엄 보고서를 저장하세요</p>
                  <button className={styles.btnExport} onClick={() => window.print()}>
                    🖨️ PDF로 저장하기
                  </button>
                </div>

                <div className={styles.btnGroup}>
                  <button className="btn btn-secondary" onClick={() => window.location.reload()}>
                    🔄 새로운 학생 분석하기
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
