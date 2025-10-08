import Header from '@/components/Header';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Header />

      {/* 히어로 섹션 */}
      <section className="hero" style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '80px',
        background: 'linear-gradient(135deg, rgba(248, 250, 252, 1) 0%, rgba(241, 245, 249, 1) 100%)'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
            <div style={{
              display: 'inline-block',
              padding: '0.5rem 1.5rem',
              background: 'linear-gradient(135deg, #fef9c3 0%, #fef08a 100%)',
              borderRadius: '2rem',
              fontSize: '0.9rem',
              fontWeight: '600',
              color: '#a16207',
              marginBottom: '2rem'
            }}>
              프리미엄 교육 관리 솔루션
            </div>

            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: '800',
              marginBottom: '1.5rem',
              lineHeight: '1.2',
              color: 'var(--primary-900)'
            }}>
              자기주도학습의 새로운 기준,<br/>
              <span className="gradient-text">프리미엄 솔루션</span>
            </h1>

            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'var(--gray-600)',
              marginBottom: '3rem',
              lineHeight: '1.8'
            }}>
              150개 이상의 스터디케어가 선택한 검증된 시스템으로<br/>
              차별화된 스터디케어 관리 경험을 제공합니다
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/login" className="btn btn-primary">
                <span>1개월 무료 체험하기</span>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3 9H15M15 9L10 4M15 9L10 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </Link>
              <a href="#contact" className="btn btn-secondary">
                상담 신청하기
              </a>
            </div>

            {/* 비디오 플레이스홀더 */}
            <div style={{
              marginTop: '4rem',
              borderRadius: '1.5rem',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-2xl)',
              background: 'var(--gray-100)',
              aspectRatio: '16/9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--accent-600)'
            }}>
              시스템 소개 영상
            </div>
          </div>
        </div>
      </section>

      {/* 섹션 구분선 */}
      <div style={{
        height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, var(--gray-300) 50%, transparent 100%)',
        margin: '4rem 0'
      }}></div>

      {/* Why Choose Us 섹션 */}
      <section id="why-choose" style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{
              display: 'inline-block',
              padding: '0.5rem 1rem',
              background: 'var(--accent-100)',
              borderRadius: '2rem',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: 'var(--accent-700)',
              marginBottom: '1rem'
            }}>
              선택하는 이유
            </span>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              fontWeight: '700',
              marginBottom: '1rem'
            }}>
              왜 <span className="gradient-text">스터디케어</span>를<br/>선택해야 할까요?
            </h2>
            <p style={{ color: 'var(--gray-600)', fontSize: '1.125rem' }}>
              프리미엄 교육 서비스를 위한 완벽한 솔루션
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {[
              { icon: '✅', title: '검증된 시스템', desc: '150개 이상의 스터디케어에서 검증된 안정적인 시스템' },
              { icon: '🔧', title: '통합 관리', desc: '15가지 기능을 하나의 시스템으로 통합 관리' },
              { icon: '⚡', title: '시간 절약', desc: '하루 평균 2시간 이상 업무 시간 절감' },
              { icon: '📊', title: '데이터 분석', desc: '과학적 데이터 기반 학습 전략 수립' },
              { icon: '☁️', title: '실시간 동기화', desc: '언제 어디서나 최신 정보 확인 가능' },
              { icon: '🚀', title: '확장 가능', desc: '스터디케어 규모에 맞춘 유연한 시스템' }
            ].map((item, i) => (
              <div key={i} style={{
                background: 'white',
                padding: '2.5rem',
                borderRadius: '1.5rem',
                boxShadow: 'var(--shadow-lg)',
                transition: 'all var(--transition-base)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>{item.icon}</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--gray-600)', lineHeight: '1.7' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer id="contact" style={{
        background: 'var(--primary-900)',
        color: 'white',
        padding: '4rem 0 2rem',
        marginTop: '4rem'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>스터디케어</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)' }}>차별화된 학습 관리 솔루션</p>
          </div>
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '2rem',
            textAlign: 'center',
            color: 'rgba(255,255,255,0.5)',
            fontSize: '0.875rem'
          }}>
            © 2025 스터디케어. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
