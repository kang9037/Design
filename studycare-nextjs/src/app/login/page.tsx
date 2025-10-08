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

      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '80px',
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
      }}>
        <div className="container">
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '4rem',
            alignItems: 'center'
          }}>
            {/* 좌측 정보 패널 */}
            <div>
              <div style={{
                display: 'inline-block',
                padding: '0.5rem 1rem',
                background: 'var(--accent-100)',
                borderRadius: '2rem',
                fontSize: '0.75rem',
                fontWeight: '600',
                color: 'var(--accent-700)',
                marginBottom: '1.5rem',
                letterSpacing: '0.05em'
              }}>
                WELCOME BACK
              </div>

              <h1 style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: '800',
                marginBottom: '1.5rem',
                lineHeight: '1.2'
              }}>
                환영합니다!<br/>
                <span className="gradient-text">스터디케어</span>에<br/>
                로그인하세요
              </h1>

              <div style={{ marginTop: '2rem' }}>
                {[
                  '자습관부터 성적 분석까지 통합 관리',
                  '실시간 학습 현황 및 출결 관리',
                  '데이터 기반 맞춤형 입시 전략 수립'
                ].map((text, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '1rem',
                    color: 'var(--gray-700)'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="8" stroke="#475569" strokeWidth="2"/>
                      <path d="M6 10L9 13L14 8" stroke="#475569" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 우측 로그인 폼 */}
            <div style={{
              background: 'white',
              borderRadius: '1.5rem',
              padding: '2.5rem',
              boxShadow: 'var(--shadow-xl)'
            }}>
              {/* 탭 버튼 */}
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                marginBottom: '2rem',
                background: 'var(--gray-100)',
                padding: '0.25rem',
                borderRadius: '0.75rem'
              }}>
                <button
                  onClick={() => setActiveTab('student')}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    fontWeight: '600',
                    transition: 'all var(--transition-base)',
                    background: activeTab === 'student' ? 'white' : 'transparent',
                    color: activeTab === 'student' ? 'var(--primary-900)' : 'var(--gray-600)',
                    boxShadow: activeTab === 'student' ? 'var(--shadow-sm)' : 'none'
                  }}
                >
                  학생/학부모
                </button>
                <button
                  onClick={() => setActiveTab('admin')}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    fontWeight: '600',
                    transition: 'all var(--transition-base)',
                    background: activeTab === 'admin' ? 'white' : 'transparent',
                    color: activeTab === 'admin' ? 'var(--primary-900)' : 'var(--gray-600)',
                    boxShadow: activeTab === 'admin' ? 'var(--shadow-sm)' : 'none'
                  }}
                >
                  관리자
                </button>
              </div>

              <h2 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>
                {activeTab === 'student' ? '학생/학부모 로그인' : '관리자 로그인'}
              </h2>
              <p style={{ color: 'var(--gray-600)', marginBottom: '2rem', fontSize: '0.9rem' }}>
                {activeTab === 'student' ? '학습 관리 시스템에 접속하세요' : '시스템 관리자 전용 로그인'}
              </p>

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    color: 'var(--gray-700)'
                  }}>
                    아이디
                  </label>
                  <input
                    type="text"
                    value={formData.id}
                    onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                    placeholder="아이디를 입력하세요"
                    required
                    style={{
                      width: '100%',
                      padding: '0.875rem',
                      border: '2px solid var(--gray-200)',
                      borderRadius: '0.75rem',
                      fontSize: '1rem',
                      transition: 'all var(--transition-base)'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--accent-600)';
                      e.target.style.boxShadow = '0 0 0 3px rgba(202, 138, 4, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'var(--gray-200)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    color: 'var(--gray-700)'
                  }}>
                    비밀번호
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="비밀번호를 입력하세요"
                    required
                    style={{
                      width: '100%',
                      padding: '0.875rem',
                      border: '2px solid var(--gray-200)',
                      borderRadius: '0.75rem',
                      fontSize: '1rem',
                      transition: 'all var(--transition-base)'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--accent-600)';
                      e.target.style.boxShadow = '0 0 0 3px rgba(202, 138, 4, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'var(--gray-200)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input type="checkbox" />
                    <span style={{ fontSize: '0.9rem', color: 'var(--gray-600)' }}>로그인 상태 유지</span>
                  </label>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '1.5rem' }}>
                  <span>로그인</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>

                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '1rem',
                  fontSize: '0.875rem',
                  color: 'var(--gray-600)'
                }}>
                  <a href="#" style={{ textDecoration: 'underline' }}>아이디 찾기</a>
                  <span>|</span>
                  <a href="#" style={{ textDecoration: 'underline' }}>비밀번호 찾기</a>
                  <span>|</span>
                  <a href="#" style={{ textDecoration: 'underline' }}>회원가입</a>
                </div>
              </form>

              {/* 테스트 안내 */}
              <div style={{
                marginTop: '2rem',
                padding: '1rem',
                background: 'var(--accent-50)',
                borderRadius: '0.75rem',
                border: '1px solid var(--accent-200)'
              }}>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--accent-800)',
                  fontWeight: '600',
                  marginBottom: '0.5rem'
                }}>
                  💡 테스트 계정
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--accent-700)' }}>
                  ID: <strong>test</strong> / PW: <strong>1111</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
