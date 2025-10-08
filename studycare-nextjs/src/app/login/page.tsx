'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'student' | 'admin'>('student');
  const [formData, setFormData] = useState({
    id: '',
    password: '',
  });
  const [showFindIdModal, setShowFindIdModal] = useState(false);
  const [showFindPasswordModal, setShowFindPasswordModal] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (activeTab === 'student') {
      // 테스트 계정: test / 1111
      if (formData.id === 'test' && formData.password === '1111') {
        router.push('/roadmap');
      } else {
        alert('아이디 또는 비밀번호가 올바르지 않습니다.');
      }
    } else {
      alert('관리자 로그인 기능은 서버 연동 후 사용 가능합니다.');
    }
  };

  return (
    <>
      <Header />

      {/* 로그인 섹션 */}
      <section className="login-section">
        <div className="container">
          <div className="login-wrapper">
            {/* 좌측 정보 패널 */}
            <div className="login-info">
              <div className="login-badge">WELCOME BACK</div>
              <h1 className="login-title">
                환영합니다!<br/>
                <span className="gradient-text">스터디케어</span>에<br/>
                로그인하세요
              </h1>

              <div className="login-features">
                <div className="feature-benefits">
                  <div className="benefit-item">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="8" stroke="#475569" strokeWidth="2"/>
                      <path d="M6 10L9 13L14 8" stroke="#475569" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span>자습관부터 성적 분석까지 통합 관리</span>
                  </div>
                  <div className="benefit-item">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="8" stroke="#475569" strokeWidth="2"/>
                      <path d="M6 10L9 13L14 8" stroke="#475569" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span>실시간 학습 현황 및 출결 관리</span>
                  </div>
                  <div className="benefit-item">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="8" stroke="#475569" strokeWidth="2"/>
                      <path d="M6 10L9 13L14 8" stroke="#475569" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span>데이터 기반 맞춤형 입시 전략 수립</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 우측 로그인 폼 */}
            <div className="login-form-container">
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

              {/* 학생/학부모 로그인 폼 */}
              {activeTab === 'student' && (
                <form className="login-form active" onSubmit={handleSubmit}>
                  <div className="form-header">
                    <h2>학생/학부모 로그인</h2>
                    <p>학습 관리 시스템에 접속하세요</p>
                  </div>

                  <div className="form-group">
                    <label htmlFor="student-id">아이디</label>
                    <input
                      type="text"
                      id="student-id"
                      value={formData.id}
                      onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                      placeholder="아이디를 입력하세요"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="student-password">비밀번호</label>
                    <input
                      type="password"
                      id="student-password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="비밀번호를 입력하세요"
                      required
                    />
                  </div>

                  <div className="form-options">
                    <label className="checkbox-label">
                      <input type="checkbox" id="remember-student" />
                      <span>로그인 상태 유지</span>
                    </label>
                  </div>

                  <button type="submit" className="btn btn-primary">
                    <span>로그인</span>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>

                  <div className="form-links">
                    <a href="#" className="link" onClick={(e) => { e.preventDefault(); setShowFindIdModal(true); }}>아이디 찾기</a>
                    <span className="divider">|</span>
                    <a href="#" className="link" onClick={(e) => { e.preventDefault(); setShowFindPasswordModal(true); }}>비밀번호 찾기</a>
                    <span className="divider">|</span>
                    <a href="#" className="link">회원가입</a>
                  </div>

                  {/* 테스트 계정 안내 */}
                  <div className="test-account-info">
                    <p className="test-title">💡 테스트 계정</p>
                    <p className="test-credentials">
                      ID: <strong>test</strong> / PW: <strong>1111</strong>
                    </p>
                  </div>
                </form>
              )}

              {/* 관리자 로그인 폼 */}
              {activeTab === 'admin' && (
                <form className="login-form active" onSubmit={handleSubmit}>
                  <div className="form-header">
                    <h2>관리자 로그인</h2>
                    <p>시스템 관리자 전용 로그인</p>
                  </div>

                  <div className="form-group">
                    <label htmlFor="admin-id">관리자 아이디</label>
                    <input
                      type="text"
                      id="admin-id"
                      value={formData.id}
                      onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                      placeholder="관리자 아이디를 입력하세요"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="admin-password">비밀번호</label>
                    <input
                      type="password"
                      id="admin-password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="비밀번호를 입력하세요"
                      required
                    />
                  </div>

                  <div className="form-options">
                    <label className="checkbox-label">
                      <input type="checkbox" id="remember-admin" />
                      <span>로그인 상태 유지</span>
                    </label>
                  </div>

                  <button type="submit" className="btn btn-primary">
                    <span>관리자 로그인</span>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>

                  <div className="form-links">
                    <a href="#" className="link" onClick={(e) => { e.preventDefault(); setShowFindIdModal(true); }}>아이디 찾기</a>
                    <span className="divider">|</span>
                    <a href="#" className="link" onClick={(e) => { e.preventDefault(); setShowFindPasswordModal(true); }}>비밀번호 찾기</a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 아이디 찾기 모달 */}
      {showFindIdModal && (
        <div className="modal" onClick={() => setShowFindIdModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>아이디 찾기</h3>
              <button className="modal-close" onClick={() => setShowFindIdModal(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <p className="modal-description">등록된 이메일로 아이디를 찾을 수 있습니다.</p>
              <div className="form-group">
                <label>이름</label>
                <input type="text" placeholder="이름을 입력하세요" />
              </div>
              <div className="form-group">
                <label>이메일</label>
                <input type="email" placeholder="이메일을 입력하세요" />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowFindIdModal(false)}>취소</button>
              <button className="btn btn-primary">아이디 찾기</button>
            </div>
          </div>
        </div>
      )}

      {/* 비밀번호 찾기 모달 */}
      {showFindPasswordModal && (
        <div className="modal" onClick={() => setShowFindPasswordModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>비밀번호 찾기</h3>
              <button className="modal-close" onClick={() => setShowFindPasswordModal(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <p className="modal-description">등록된 이메일로 비밀번호 재설정 링크를 보내드립니다.</p>
              <div className="form-group">
                <label>아이디</label>
                <input type="text" placeholder="아이디를 입력하세요" />
              </div>
              <div className="form-group">
                <label>이메일</label>
                <input type="email" placeholder="이메일을 입력하세요" />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowFindPasswordModal(false)}>취소</button>
              <button className="btn btn-primary">재설정 링크 전송</button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .login-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8rem 2rem 4rem;
          background: linear-gradient(165deg, #fafaf9 0%, #f5f5f4 50%, #e7e5e4 100%);
          position: relative;
          overflow: hidden;
        }

        .login-section::before {
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

        .login-wrapper {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          max-width: 1100px;
          width: 100%;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .login-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .login-badge {
          display: inline-block;
          padding: 0.5rem 1rem;
          background: linear-gradient(135deg, rgba(202, 138, 4, 0.15) 0%, rgba(161, 98, 7, 0.2) 100%);
          color: var(--accent-700);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border-radius: 100px;
          margin-bottom: 1.5rem;
          width: fit-content;
          border: 1px solid rgba(202, 138, 4, 0.2);
        }

        .login-title {
          font-size: 3rem;
          font-weight: 800;
          line-height: 1.2;
          color: var(--primary-900);
          margin-bottom: 2rem;
        }

        .login-features {
          margin-top: 2rem;
        }

        .feature-benefits {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .benefit-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--gray-700);
          font-size: 0.95rem;
        }

        .login-form-container {
          background: white;
          border-radius: 1.5rem;
          padding: 3rem;
          box-shadow: var(--shadow-premium);
          border: 1px solid rgba(202, 138, 4, 0.08);
        }

        .user-type-tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2rem;
          background: var(--gray-100);
          padding: 0.25rem;
          border-radius: 0.875rem;
        }

        .tab-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.875rem;
          background: transparent;
          border: none;
          border-radius: 0.625rem;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--gray-600);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .tab-btn.active {
          background: white;
          color: var(--primary-900);
          box-shadow: var(--shadow-sm);
        }

        .login-form {
          display: none;
        }

        .login-form.active {
          display: block;
        }

        .form-header {
          margin-bottom: 2rem;
        }

        .form-header h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary-900);
          margin-bottom: 0.5rem;
        }

        .form-header p {
          color: var(--gray-600);
          font-size: 0.95rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--gray-700);
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 0.875rem;
          border: 2px solid var(--gray-200);
          border-radius: 0.75rem;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: white;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--accent-600);
          box-shadow: 0 0 0 3px rgba(202, 138, 4, 0.1);
        }

        .form-options {
          margin-bottom: 1.5rem;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          font-size: 0.9rem;
          color: var(--gray-600);
        }

        .form-links {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          margin-top: 1.5rem;
          font-size: 0.875rem;
        }

        .form-links .link {
          color: var(--gray-600);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .form-links .link:hover {
          color: var(--accent-700);
          text-decoration: underline;
        }

        .form-links .divider {
          color: var(--gray-400);
        }

        .test-account-info {
          margin-top: 2rem;
          padding: 1rem;
          background: linear-gradient(135deg, rgba(202, 138, 4, 0.05) 0%, rgba(161, 98, 7, 0.08) 100%);
          border-radius: 0.75rem;
          border: 1px solid rgba(202, 138, 4, 0.15);
        }

        .test-title {
          font-size: 0.875rem;
          color: var(--accent-800);
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .test-credentials {
          font-size: 0.875rem;
          color: var(--accent-700);
        }

        .modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          animation: fadeIn 0.3s ease;
        }

        .modal-content {
          background: white;
          border-radius: 1rem;
          padding: 2rem;
          max-width: 500px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: var(--shadow-2xl);
          animation: slideUp 0.3s ease;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--gray-200);
        }

        .modal-header h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--primary-900);
        }

        .modal-close {
          background: none;
          border: none;
          font-size: 1.5rem;
          color: var(--gray-500);
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .modal-close:hover {
          color: var(--primary-900);
        }

        .modal-body {
          margin-bottom: 1.5rem;
        }

        .modal-description {
          margin-bottom: 1.5rem;
          color: var(--gray-600);
          font-size: 0.95rem;
        }

        .modal-footer {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
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
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .login-section {
            padding: 6rem 1.5rem 3rem;
          }

          .login-wrapper {
            grid-template-columns: 1fr;
            gap: 2rem;
            max-width: 500px;
          }

          .login-info {
            text-align: center;
          }

          .login-badge {
            margin: 0 auto 1.5rem;
          }

          .login-title {
            font-size: 2rem;
          }

          .login-form-container {
            padding: 2rem;
          }
        }
      `}</style>
    </>
  );
}