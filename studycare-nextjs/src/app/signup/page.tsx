'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'student' | 'admin'>('student');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    id: '',
    password: '',
    passwordConfirm: '',
    phone: '',
    school: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // 비밀번호 확인
    if (formData.password !== formData.passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 서버 연동 전 테스트
    alert('회원가입 기능은 서버 연동 후 사용 가능합니다.');
    // router.push('/login');
  };

  return (
    <>
      <Header />

      {/* 회원가입 섹션 */}
      <section className="signup-section">
        <div className="container">
          <div className="signup-wrapper">
            {/* 좌측 정보 패널 */}
            <div className="signup-info">
              <div className="signup-badge">JOIN US</div>
              <h1 className="signup-title">
                시작하세요!<br/>
                <span className="gradient-text">스터디케어</span>와<br/>
                함께 성장하세요
              </h1>

              <div className="signup-features">
                <div className="feature-benefits">
                  <div className="benefit-item">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="8" stroke="#475569" strokeWidth="2"/>
                      <path d="M6 10L9 13L14 8" stroke="#475569" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span>30일 무료 체험 기회 제공</span>
                  </div>
                  <div className="benefit-item">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="8" stroke="#475569" strokeWidth="2"/>
                      <path d="M6 10L9 13L14 8" stroke="#475569" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span>신규 회원 전용 할인 혜택</span>
                  </div>
                  <div className="benefit-item">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="8" stroke="#475569" strokeWidth="2"/>
                      <path d="M6 10L9 13L14 8" stroke="#475569" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span>1:1 맞춤형 온보딩 지원</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 우측 회원가입 폼 */}
            <div className="signup-form-container">
              {/* 사용자 유형 선택 탭 */}
              <div className="user-type-tabs">
                <button
                  className={`tab-btn ${activeTab === 'student' ? 'active' : ''}`}
                  onClick={() => setActiveTab('student')}
                  data-type="student"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2L17 6V14L10 18L3 14V6L10 2Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                  </svg>
                  <span>학생/학부모</span>
                </button>
                <button
                  className={`tab-btn ${activeTab === 'admin' ? 'active' : ''}`}
                  onClick={() => setActiveTab('admin')}
                  data-type="admin"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M7 9L9 11L13 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span>관리자</span>
                </button>
              </div>

              {/* 학생/학부모 회원가입 폼 */}
              {activeTab === 'student' && (
                <form className="signup-form active" onSubmit={handleSubmit}>
                  <div className="form-header">
                    <h2>학생/학부모 회원가입</h2>
                    <p>스터디케어 학습 관리 시스템에 가입하세요</p>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="student-name">이름 *</label>
                      <input
                        type="text"
                        id="student-name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="홍길동"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="student-phone">전화번호 *</label>
                      <input
                        type="tel"
                        id="student-phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="010-1234-5678"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="student-email">이메일 *</label>
                    <input
                      type="email"
                      id="student-email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="example@email.com"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="student-school">학교명</label>
                    <input
                      type="text"
                      id="student-school"
                      value={formData.school}
                      onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                      placeholder="OO고등학교"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="student-signup-id">아이디 *</label>
                    <input
                      type="text"
                      id="student-signup-id"
                      value={formData.id}
                      onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                      placeholder="사용하실 아이디를 입력하세요"
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="student-signup-password">비밀번호 *</label>
                      <input
                        type="password"
                        id="student-signup-password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="8자 이상 입력"
                        required
                        minLength={8}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="student-password-confirm">비밀번호 확인 *</label>
                      <input
                        type="password"
                        id="student-password-confirm"
                        value={formData.passwordConfirm}
                        onChange={(e) => setFormData({ ...formData, passwordConfirm: e.target.value })}
                        placeholder="비밀번호 재입력"
                        required
                        minLength={8}
                      />
                    </div>
                  </div>

                  <div className="form-options">
                    <label className="checkbox-label">
                      <input type="checkbox" required />
                      <span>이용약관 및 개인정보 처리방침에 동의합니다 (필수)</span>
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" />
                      <span>마케팅 정보 수신에 동의합니다 (선택)</span>
                    </label>
                  </div>

                  <div className="form-actions">
                    <Link href="/login" className="btn btn-secondary">
                      <span>로그인</span>
                    </Link>
                    <button type="submit" className="btn btn-primary">
                      <span>회원가입</span>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>
                </form>
              )}

              {/* 관리자 회원가입 폼 */}
              {activeTab === 'admin' && (
                <form className="signup-form active" onSubmit={handleSubmit}>
                  <div className="form-header">
                    <h2>관리자 회원가입</h2>
                    <p>스터디케어 관리자 시스템에 가입하세요</p>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="admin-name">관리자명 *</label>
                      <input
                        type="text"
                        id="admin-name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="홍길동"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="admin-phone">전화번호 *</label>
                      <input
                        type="tel"
                        id="admin-phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="010-1234-5678"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="admin-email">이메일 *</label>
                    <input
                      type="email"
                      id="admin-email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="admin@studycare.com"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="admin-school">기관명 *</label>
                    <input
                      type="text"
                      id="admin-school"
                      value={formData.school}
                      onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                      placeholder="OO 스터디카페"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="admin-signup-id">관리자 ID *</label>
                    <input
                      type="text"
                      id="admin-signup-id"
                      value={formData.id}
                      onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                      placeholder="사용하실 관리자 ID를 입력하세요"
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="admin-signup-password">비밀번호 *</label>
                      <input
                        type="password"
                        id="admin-signup-password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="8자 이상 입력"
                        required
                        minLength={8}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="admin-password-confirm">비밀번호 확인 *</label>
                      <input
                        type="password"
                        id="admin-password-confirm"
                        value={formData.passwordConfirm}
                        onChange={(e) => setFormData({ ...formData, passwordConfirm: e.target.value })}
                        placeholder="비밀번호 재입력"
                        required
                        minLength={8}
                      />
                    </div>
                  </div>

                  <div className="form-options">
                    <label className="checkbox-label">
                      <input type="checkbox" required />
                      <span>이용약관 및 개인정보 처리방침에 동의합니다 (필수)</span>
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" />
                      <span>마케팅 정보 수신에 동의합니다 (선택)</span>
                    </label>
                  </div>

                  <div className="form-actions">
                    <Link href="/login" className="btn btn-secondary">
                      <span>로그인</span>
                    </Link>
                    <button type="submit" className="btn btn-primary">
                      <span>회원가입</span>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .signup-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8rem 2rem 4rem;
          background: linear-gradient(165deg, #fafaf9 0%, #f5f5f4 50%, #e7e5e4 100%);
          position: relative;
          overflow: hidden;
        }

        .signup-section::before {
          content: '';
          position: absolute;
          top: -20%;
          right: -10%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(202, 138, 4, 0.06) 0%, transparent 70%);
          opacity: 0.5;
          filter: blur(80px);
        }

        .signup-wrapper {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .signup-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .signup-badge {
          display: inline-block;
          padding: 0.5rem 1rem;
          background: linear-gradient(135deg, rgba(202, 138, 4, 0.1) 0%, rgba(161, 98, 7, 0.15) 100%);
          border: 1px solid rgba(202, 138, 4, 0.2);
          border-radius: 2rem;
          color: var(--accent-800);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          width: fit-content;
          margin-bottom: 2rem;
        }

        .signup-title {
          font-size: 2.75rem;
          font-weight: 800;
          line-height: 1.3;
          color: var(--primary-900);
          margin-bottom: 1.5rem;
        }

        .gradient-text {
          background: var(--gradient-gold);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .signup-features {
          margin-top: 2rem;
        }

        .feature-benefits {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-top: 2rem;
        }

        .benefit-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.25rem;
          background: linear-gradient(135deg, rgba(254, 249, 195, 0.3) 0%, rgba(254, 237, 138, 0.2) 100%);
          border-left: 3px solid var(--accent-600);
          border-radius: 0.75rem;
          transition: all 0.3s ease;
        }

        .benefit-item:hover {
          transform: translateX(8px);
          background: linear-gradient(135deg, rgba(254, 249, 195, 0.5) 0%, rgba(254, 237, 138, 0.3) 100%);
          box-shadow: 0 4px 12px rgba(202, 138, 4, 0.15);
        }

        .benefit-item svg {
          flex-shrink: 0;
        }

        .benefit-item svg circle {
          stroke: var(--accent-600);
        }

        .benefit-item svg path {
          stroke: var(--accent-700);
        }

        .benefit-item span {
          color: var(--gray-800);
          font-size: 0.95rem;
          font-weight: 500;
          line-height: 1.5;
        }

        .signup-form-container {
          background: white;
          border-radius: 1.5rem;
          padding: 3rem;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(202, 138, 4, 0.08);
        }

        .user-type-tabs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .tab-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 1rem;
          border: 2px solid var(--gray-200);
          border-radius: 0.75rem;
          background: white;
          color: var(--gray-600);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .tab-btn:hover {
          border-color: var(--accent-600);
          color: var(--accent-700);
        }

        .tab-btn.active {
          border-color: var(--accent-600);
          background: linear-gradient(135deg, rgba(254, 249, 195, 0.3) 0%, rgba(254, 237, 138, 0.2) 100%);
          color: var(--accent-700);
        }

        .form-header {
          margin-bottom: 2rem;
          text-align: center;
        }

        .form-header h2 {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--primary-900);
          margin-bottom: 0.5rem;
        }

        .form-header p {
          color: var(--gray-600);
          font-size: 0.95rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          color: var(--gray-700);
          font-weight: 600;
          font-size: 0.9rem;
        }

        .form-group input {
          width: 100%;
          padding: 0.875rem 1rem;
          border: 2px solid var(--gray-200);
          border-radius: 0.75rem;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-group input:focus {
          outline: none;
          border-color: var(--accent-600);
          box-shadow: 0 0 0 3px rgba(202, 138, 4, 0.1);
        }

        .form-options {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          font-size: 0.875rem;
          color: var(--gray-600);
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
        }

        .form-actions .btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 1rem 2rem;
          border-radius: 0.75rem;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s ease;
          cursor: pointer;
          border: none;
          text-decoration: none;
        }

        .form-actions .btn-secondary {
          background: white;
          color: var(--primary-700);
          border: 2px solid var(--primary-200);
        }

        .form-actions .btn-secondary:hover {
          background: var(--primary-50);
          border-color: var(--accent-600);
          color: var(--accent-700);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(202, 138, 4, 0.2);
        }

        .form-actions .btn-primary {
          background: var(--gradient-gold);
          color: white;
          box-shadow: var(--shadow-gold);
        }

        .form-actions .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(202, 138, 4, 0.35);
        }

        @media (max-width: 768px) {
          .signup-section {
            padding: 6rem 1.5rem 3rem;
          }

          .signup-wrapper {
            grid-template-columns: 1fr;
            gap: 2rem;
            max-width: 500px;
          }

          .signup-info {
            text-align: center;
          }

          .signup-badge {
            margin: 0 auto 1.5rem;
          }

          .signup-title {
            font-size: 2rem;
          }

          .signup-form-container {
            padding: 2rem;
          }

          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
