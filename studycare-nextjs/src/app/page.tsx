'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 100);
          animationObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => animationObserver.observe(el));

    return () => animationObserver.disconnect();
  }, []);

  useEffect(() => {
    // Auto-scroll reviews
    const reviewsLeft = document.querySelector('.reviews-row-left');
    const reviewsRight = document.querySelector('.reviews-row-right');

    if (reviewsLeft && reviewsRight) {
      let scrollInterval: NodeJS.Timeout;

      const startAutoScroll = () => {
        scrollInterval = setInterval(() => {
          if (reviewsLeft) {
            reviewsLeft.scrollLeft += 1;
            if (reviewsLeft.scrollLeft >= reviewsLeft.scrollWidth / 2) {
              reviewsLeft.scrollLeft = 0;
            }
          }
          if (reviewsRight) {
            reviewsRight.scrollLeft -= 1;
            if (reviewsRight.scrollLeft <= 0) {
              reviewsRight.scrollLeft = reviewsRight.scrollWidth / 2;
            }
          }
        }, 30);
      };

      startAutoScroll();

      return () => clearInterval(scrollInterval);
    }
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      <Header />

      {/* 히어로 섹션 */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">프리미엄 교육 관리 솔루션</div>
            <h1 className="hero-title">
              자기주도학습의 새로운 기준,<br/>
              <span className="gradient-text">프리미엄 솔루션</span>
            </h1>
            <p className="hero-description">
              150개 이상의 스터디케어가 선택한 검증된 시스템으로<br/>
              차별화된 스터디케어 관리 경험을 제공합니다
            </p>
            <div className="hero-actions">
              <Link href="/login" className="btn btn-primary">
                <span>1개월 무료 체험하기</span>
                <div className="btn-icon">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M3 9H15M15 9L10 4M15 9L10 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </Link>
              <a href="#contact" className="btn btn-secondary">
                상담 신청하기
              </a>
            </div>
            <div className="hero-video">
              <div className="video-container">
                <video controls poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='900' height='506'%3E%3Crect fill='%23fafaf9' width='900' height='506'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='serif' font-size='28' fill='%23ca8a04' font-weight='600'%3E시스템 소개 영상%3C/text%3E%3C/svg%3E">
                  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4"/>
                  <source src="https://www.w3schools.com/html/mov_bbb.ogg" type="video/ogg"/>
                  귀하의 브라우저는 비디오 태그를 지원하지 않습니다.
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 섹션 구분선 */}
      <div className="section-divider">
        <div className="divider-line">
          <div className="divider-ornament"></div>
        </div>
      </div>

      {/* Why Choose Us 섹션 */}
      <section className="why-choose-us" id="why-choose">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">선택하는 이유</span>
            <h2 className="section-title">왜 <span className="highlight">스터디케어</span>을<br/>선택해야 할까요?</h2>
            <p className="section-description">
              프리미엄 교육 서비스를 위한 완벽한 솔루션
            </p>
          </div>

          <div className="why-grid">
            {whyChooseData.map((item, index) => (
              <div key={index} className="why-card animate-on-scroll">
                <div className="why-card-icon" dangerouslySetInnerHTML={{ __html: item.icon }} />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 섹션 구분선 */}
      <div className="section-divider">
        <div className="divider-line">
          <div className="divider-ornament"></div>
        </div>
      </div>

      {/* How It Works 섹션 */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">도입 과정</span>
            <h2 className="section-title">간단한 <span className="highlight">도입 과정</span></h2>
            <p className="section-description">
              복잡한 설치 없이 빠르게 시작할 수 있습니다
            </p>
          </div>

          <div className="process-timeline">
            {processSteps.map((step, index) => (
              <div key={index} className="process-step animate-on-scroll">
                <div className="process-number">{index + 1}</div>
                <div className="process-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 섹션 구분선 */}
      <div className="section-divider">
        <div className="divider-line">
          <div className="divider-ornament"></div>
        </div>
      </div>

      {/* 주요 기능 섹션 */}
      <section id="features" className="features">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">주요 기능</span>
            <h2 className="section-title">자기주도학습에 필요한<br/><span className="highlight">모든 기능</span>을 하나로</h2>
            <p className="section-description">
              출결 관리부터 성적 분석까지, 스터디케어 관리의 모든 과정을<br/>
              효율적으로 관리할 수 있는 통합 솔루션입니다
            </p>
          </div>

          <div className="features-grid">
            {featuresData.map((feature, index) => (
              <Link
                key={index}
                href={`/feature-detail-${index + 1}`}
                className="feature-card"
                data-color={feature.color}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className="feature-image">
                  <img src={`/assets/screenshot-${index + 2}.png`} alt={feature.title} loading="lazy" />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 섹션 구분선 */}
      <div className="section-divider">
        <div className="divider-line">
          <div className="divider-ornament"></div>
        </div>
      </div>

      {/* 후기 섹션 */}
      <section id="reviews" className="reviews">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">고객 후기</span>
            <h2 className="section-title">실제 <span className="highlight">사용 후기</span></h2>
          </div>

          <div className="reviews-slider-wrapper">
            <div className="reviews-row reviews-row-left">
              {[...reviewsDataLeft, ...reviewsDataLeft].map((review, index) => (
                <div key={index} className="review-card">
                  <div className="review-rating">
                    <span>⭐⭐⭐⭐⭐</span>
                    <span className="rating-text">5.0</span>
                  </div>
                  <p className="review-content">{review.content}</p>
                  <div className="review-author">
                    <div className="author-avatar">{review.avatar}</div>
                    <div className="author-info">
                      <strong>{review.name}</strong>
                      <span>{review.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="reviews-row reviews-row-right">
              {[...reviewsDataRight, ...reviewsDataRight].map((review, index) => (
                <div key={index} className="review-card">
                  <div className="review-rating">
                    <span>⭐⭐⭐⭐⭐</span>
                    <span className="rating-text">5.0</span>
                  </div>
                  <p className="review-content">{review.content}</p>
                  <div className="review-author">
                    <div className="author-avatar">{review.avatar}</div>
                    <div className="author-info">
                      <strong>{review.name}</strong>
                      <span>{review.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 섹션 구분선 */}
      <div className="section-divider">
        <div className="divider-line">
          <div className="divider-ornament"></div>
        </div>
      </div>

      {/* 기능 비교표 섹션 */}
      <section className="comparison">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">경쟁력 비교</span>
            <h2 className="section-title">타사 대비 우위</h2>
            <p className="section-description">
              다른 솔루션과 비교해 보세요
            </p>
          </div>

          <div className="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>기능</th>
                  <th>스터디케어</th>
                  <th>A사</th>
                  <th>B사</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.feature}</td>
                    <td><span className={item.studycare ? 'comparison-check' : 'comparison-cross'}>{item.studycare ? '✓' : '×'}</span></td>
                    <td><span className={item.companyA ? 'comparison-check' : 'comparison-cross'}>{item.companyA ? '✓' : '×'}</span></td>
                    <td><span className={item.companyB ? 'comparison-check' : 'comparison-cross'}>{item.companyB ? '✓' : '×'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 섹션 구분선 */}
      <div className="section-divider">
        <div className="divider-line">
          <div className="divider-ornament"></div>
        </div>
      </div>

      {/* FAQ 섹션 */}
      <section className="faq">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">자주 묻는 질문</span>
            <h2 className="section-title">자주 묻는 질문</h2>
            <p className="section-description">
              궁금하신 점을 빠르게 해결해 드립니다
            </p>
          </div>

          <div className="faq-container">
            {faqData.map((item, index) => (
              <div key={index} className="faq-item animate-on-scroll">
                <button className="faq-question" onClick={() => toggleFaq(index)}>
                  <span>{item.question}</span>
                  <div className={`faq-icon ${openFaq === index ? 'open' : ''}`}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </button>
                <div className={`faq-answer ${openFaq === index ? 'open' : ''}`}>
                  <div className="faq-answer-content">
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 섹션 구분선 */}
      <div className="section-divider">
        <div className="divider-line">
          <div className="divider-ornament"></div>
        </div>
      </div>

      {/* 파트너 로고 섹션 */}
      <section className="partners">
        <div className="container">
          <div className="partners-content">
            <h3 className="partners-title">150개 이상의 스터디케어에서 신뢰하는 파트너</h3>
            <div className="partners-grid">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div key={num} className="partner-logo">
                  <svg width="150" height="60" viewBox="0 0 150 60" fill="none">
                    <rect width="150" height="60" rx="8" fill={num % 2 === 0 ? '#1e293b' : '#334155'}/>
                    <text x="75" y="35" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold" fill="white" textAnchor="middle">Academy {num}</text>
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 섹션 구분선 */}
      <div className="section-divider">
        <div className="divider-line">
          <div className="divider-ornament"></div>
        </div>
      </div>

      {/* 가격 섹션 */}
      <section id="pricing" className="pricing">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">PRICING</span>
            <h2 className="section-title">합리적인 가격 정책</h2>
            <p className="section-description">스터디케어 규모에 맞는 플랜을 선택하세요</p>
          </div>

          <div className="pricing-grid">
            {pricingData.map((plan, index) => (
              <div key={index} className={`pricing-card ${plan.featured ? 'featured' : ''}`}>
                {plan.featured && <div className="pricing-badge">인기</div>}
                <div className="pricing-header">
                  <h3>{plan.name}</h3>
                  <p>{plan.description}</p>
                </div>
                <div className="pricing-price">
                  <span className="price-amount">{plan.price}</span>
                  <span className="price-period">{plan.period}</span>
                </div>
                <ul className="pricing-features">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M5 10L8 13L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href="#contact" className={`btn ${plan.featured ? 'btn-primary' : 'btn-outline-primary'}`}>문의하기</a>
              </div>
            ))}
          </div>

          <div className="pricing-note">
            <p>💡 모든 플랜은 1개월 무료 체험 기간을 제공합니다</p>
            <p>💡 월 유지보수 비용은 별도 협의 (서버 관리, 기술지원 포함)</p>
          </div>
        </div>
      </section>

      {/* 섹션 구분선 */}
      <div className="section-divider">
        <div className="divider-line">
          <div className="divider-ornament"></div>
        </div>
      </div>

      {/* 연락처 섹션 */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="contact-wrapper">
            <div className="contact-info">
              <span className="section-badge">CONTACT</span>
              <h2>무료 상담을<br/>신청하세요</h2>
              <p>스터디케어에 맞는 최적의 솔루션을 제안해 드립니다</p>

              <div className="contact-items">
                {contactItems.map((item, index) => (
                  <div key={index} className="contact-item">
                    <div className="contact-icon" dangerouslySetInnerHTML={{ __html: item.icon }} />
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.content}</p>
                      <span>{item.subtitle}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-row">
                <div className="form-group">
                  <label>업체명</label>
                  <input type="text" placeholder="업체명을 입력하세요" required />
                </div>
                <div className="form-group">
                  <label>담당자명</label>
                  <input type="text" placeholder="담당자명을 입력하세요" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>연락처</label>
                  <input type="tel" placeholder="010-0000-0000" required />
                </div>
                <div className="form-group">
                  <label>이메일</label>
                  <input type="email" placeholder="example@email.com" required />
                </div>
              </div>
              <div className="form-group">
                <label>학생 수</label>
                <select required>
                  <option value="">학생 수를 선택하세요</option>
                  <option value="50">50명 이하</option>
                  <option value="100">50-100명</option>
                  <option value="200">100-200명</option>
                  <option value="300">200-300명</option>
                  <option value="more">300명 이상</option>
                </select>
              </div>
              <div className="form-group">
                <label>문의 내용</label>
                <textarea placeholder="문의하실 내용을 입력해주세요" rows={5} required></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                <span>상담 신청하기</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect width="32" height="32" rx="8" fill="url(#gradient2)"/>
                  <path d="M16 8L22 12V20L16 24L10 20V12L16 8Z" stroke="white" strokeWidth="2" fill="none"/>
                  <defs>
                    <linearGradient id="gradient2" x1="0" y1="0" x2="32" y2="32">
                      <stop offset="0%" stopColor="#3b82f6"/>
                      <stop offset="100%" stopColor="#2563eb"/>
                    </linearGradient>
                  </defs>
                </svg>
                <span>스터디케어</span>
              </div>
              <p>스마트한 학습 관리 솔루션</p>
            </div>

            <div className="footer-links">
              <div className="footer-section">
                <h4>제품</h4>
                <ul>
                  <li><a href="#features">기능</a></li>
                  <li><a href="#gallery">갤러리</a></li>
                  <li><a href="#pricing">가격</a></li>
                </ul>
              </div>

              <div className="footer-section">
                <h4>지원</h4>
                <ul>
                  <li><a href="#contact">문의하기</a></li>
                  <li><a href="#">가이드</a></li>
                  <li><a href="#">FAQ</a></li>
                </ul>
              </div>

              <div className="footer-section">
                <h4>회사</h4>
                <ul>
                  <li><a href="#">소개</a></li>
                  <li><a href="#">이용약관</a></li>
                  <li><a href="#">개인정보처리방침</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2025 스터디케어 관리 시스템. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

// 데이터 정의
const whyChooseData = [
  {
    icon: `<svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="45" cy="45" r="44" fill="#fef9c3" opacity="0.3"/>
      <circle cx="45" cy="45" r="35" fill="url(#gold-gradient)"/>
      <path d="M45 25L60 35V55L45 65L30 55V35L45 25Z" stroke="white" stroke-width="3" fill="none"/>
      <path d="M38 45L43 50L53 40" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <defs>
        <linearGradient id="gold-gradient" x1="10" y1="10" x2="80" y2="80">
          <stop offset="0%" stop-color="#fde047"/>
          <stop offset="50%" stop-color="#ca8a04"/>
          <stop offset="100%" stop-color="#854d0e"/>
        </linearGradient>
      </defs>
    </svg>`,
    title: '검증된 시스템',
    description: '150개 이상의 스터디케어에서 검증된 안정적인 시스템으로 신뢰할 수 있는 자기주도학습을 보장합니다.'
  },
  {
    icon: `<svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="45" cy="45" r="44" fill="#e2e8f0" opacity="0.3"/>
      <rect x="20" y="20" width="22" height="22" rx="5" fill="#475569"/>
      <rect x="48" y="20" width="22" height="22" rx="5" fill="#64748b"/>
      <rect x="20" y="48" width="22" height="22" rx="5" fill="#64748b"/>
      <rect x="48" y="48" width="22" height="22" rx="5" fill="#475569"/>
      <circle cx="31" cy="31" r="3" fill="white"/>
      <circle cx="59" cy="31" r="3" fill="white"/>
      <circle cx="31" cy="59" r="3" fill="white"/>
      <circle cx="59" cy="59" r="3" fill="white"/>
    </svg>`,
    title: '통합 관리',
    description: '출결, 성적, 상담, 일정까지 15가지 핵심 기능을 하나의 플랫폼에서 통합 관리합니다.'
  },
  {
    icon: `<svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="45" cy="45" r="44" fill="#d1f4e0" opacity="0.3"/>
      <circle cx="45" cy="45" r="25" fill="url(#sage-gradient)"/>
      <circle cx="45" cy="45" r="20" fill="#52a378"/>
      <circle cx="45" cy="45" r="3" fill="white"/>
      <path d="M45 30v15l10 5" stroke="white" stroke-width="3" stroke-linecap="round"/>
      <path d="M60 30l5 5-5 5M30 60l-5-5 5-5" stroke="#3d8860" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <defs>
        <linearGradient id="sage-gradient" x1="20" y1="20" x2="70" y2="70">
          <stop offset="0%" stop-color="#6dbe90"/>
          <stop offset="100%" stop-color="#2d6d4a"/>
        </linearGradient>
      </defs>
    </svg>`,
    title: '시간 절약',
    description: '자동화된 업무 처리로 하루 평균 2시간 이상의 귀중한 시간을 절약할 수 있습니다.'
  },
  {
    icon: `<svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="45" cy="45" r="44" fill="#fef9c3" opacity="0.2"/>
      <rect x="20" y="55" width="10" height="15" rx="2" fill="#ca8a04"/>
      <rect x="33" y="45" width="10" height="25" rx="2" fill="#eab308"/>
      <rect x="46" y="35" width="10" height="35" rx="2" fill="#ca8a04"/>
      <rect x="59" y="25" width="10" height="45" rx="2" fill="#eab308"/>
      <circle cx="25" cy="42" r="3" fill="#854d0e"/>
      <circle cx="38" cy="35" r="3" fill="#854d0e"/>
      <circle cx="51" cy="28" r="3" fill="#854d0e"/>
      <circle cx="64" cy="20" r="3" fill="#854d0e"/>
      <path d="M25 42l13-7 13-7 13-8" stroke="#a16207" stroke-width="2" stroke-dasharray="3 3"/>
    </svg>`,
    title: '데이터 분석',
    description: '체계적인 성적 분석과 학습 패턴 파악으로 맞춤형 학습 전략을 수립합니다.'
  },
  {
    icon: `<svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="45" cy="45" r="44" fill="#e2e8f0" opacity="0.2"/>
      <path d="M55 38c0-6-5-11-11-11s-11 5-11 11c-5 0-9 4-9 9s4 9 9 9h22c4 0 7-3 7-7s-3-7-7-7z" fill="#475569"/>
      <rect x="28" y="56" width="16" height="12" rx="2" fill="#64748b"/>
      <rect x="48" y="56" width="16" height="12" rx="2" fill="#64748b"/>
      <circle cx="36" cy="62" r="1.5" fill="white"/>
      <circle cx="56" cy="62" r="1.5" fill="white"/>
      <path d="M40 44l5 5 5-5M45 49V39" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`,
    title: '실시간 동기화',
    description: '클라우드 기반으로 모든 데이터가 실시간 동기화되어 언제 어디서나 접근 가능합니다.'
  },
  {
    icon: `<svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="45" cy="45" r="44" fill="#d1f4e0" opacity="0.2"/>
      <rect x="32" y="56" width="26" height="14" rx="4" fill="#52a378"/>
      <rect x="28" y="40" width="18" height="14" rx="4" fill="#6dbe90"/>
      <rect x="44" y="40" width="18" height="14" rx="4" fill="#6dbe90"/>
      <rect x="36" y="24" width="18" height="14" rx="4" fill="#52a378"/>
      <path d="M45 20l4-4 4 4M49 16v10" stroke="#2d6d4a" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="45" cy="63" r="2" fill="white"/>
    </svg>`,
    title: '확장 가능',
    description: '학원 규모에 맞춰 유연하게 확장 가능한 시스템으로 성장을 함께합니다.'
  }
];

const processSteps = [
  {
    title: '무료 상담 신청',
    description: '스터디케어 규모와 필요한 기능을 파악하기 위한 무료 상담을 진행합니다. 전문 컨설턴트가 맞춤형 솔루션을 제안해 드립니다.'
  },
  {
    title: '시스템 구축',
    description: '스터디케어 맞춤형 시스템을 구축하고 기존 데이터를 안전하게 마이그레이션합니다. 평균 3일 이내 완료됩니다.'
  },
  {
    title: '교육 및 트레이닝',
    description: '시스템 사용법에 대한 상세한 교육을 제공합니다. 온라인/오프라인 교육을 선택할 수 있습니다.'
  },
  {
    title: '운영 시작',
    description: '모든 준비가 완료되면 즉시 시스템을 활용할 수 있습니다. 초기 한 달간 집중 지원을 제공합니다.'
  }
];

const featuresData = [
  { title: '자습관 신청', description: '주차별 자습실 예약 및 좌석 배정을 효율적으로 관리하세요', color: 'blue' },
  { title: '학습현황', description: '학생들의 실시간 학습 기록과 진도를 한눈에 파악합니다', color: 'purple' },
  { title: '학습닷컴', description: '일정 관리와 출결 체크를 자동화하여 시간을 절약하세요', color: 'green' },
  { title: '출결 캘린더', description: '학생별 출결 현황을 달력으로 직관적으로 확인 가능합니다', color: 'orange' },
  { title: '일정 알림', description: '수업, 시험, 상담 일정을 자동으로 학생과 학부모에게 알립니다', color: 'pink' },
  { title: '생기부 활동', description: '생활기록부에 기재할 활동을 체계적으로 관리합니다', color: 'indigo' },
  { title: '내신 추이', description: '교과별 성적 변화를 그래프로 시각화하여 분석합니다', color: 'cyan' },
  { title: '모의고사 추이', description: '국어/수학/영어 모의고사 성적을 과목별로 추적합니다', color: 'teal' },
  { title: 'OMR 추이', description: 'OMR 분석을 통해 오답률과 취약점을 파악합니다', color: 'red' },
  { title: '수시/정시 검색', description: '지역별, 학과별로 대학 정보를 손쉽게 검색합니다', color: 'violet' },
  { title: '성적 분석표', description: '다양한 조건으로 학생별 맞춤 성적 분석을 제공합니다', color: 'amber' }
];

const reviewsDataLeft = [
  {
    content: '"자습실 관리부터 성적 분석까지 모든 기능이 한 곳에 있어서 정말 편리합니다. 학부모님들도 실시간으로 자녀의 학습 현황을 확인하실 수 있어서 만족도가 매우 높습니다."',
    avatar: '김',
    name: '김○○ 원장',
    location: '서울 강남구 ○○스터디케어'
  },
  {
    content: '"출결 관리와 일정 알림 기능 덕분에 행정 업무 시간이 절반으로 줄었습니다. 그만큼 학생 상담과 수업 준비에 더 많은 시간을 쓸 수 있게 되었어요."',
    avatar: '이',
    name: '이○○ 부원장',
    location: '부산 해운대구 △△스터디케어'
  },
  {
    content: '"내신과 모의고사 추이를 그래프로 한눈에 볼 수 있어서 학생 상담할 때 정말 유용합니다. 데이터 기반으로 정확한 학습 방향을 제시할 수 있게 되었습니다."',
    avatar: '박',
    name: '박○○ 실장',
    location: '대전 서구 □□스터디케어'
  }
];

const reviewsDataRight = [
  {
    content: '"시스템 도입 후 학부모 만족도가 크게 높아졌습니다. 특히 실시간 알림 기능이 정말 유용해요."',
    avatar: '최',
    name: '최○○ 원장',
    location: '인천 남동구 ◇◇스터디케어'
  },
  {
    content: '"성적 분석 기능이 정말 강력합니다. 학생 맞춤 학습 계획을 세우는 데 큰 도움이 됩니다."',
    avatar: '정',
    name: '정○○ 실장',
    location: '대구 수성구 ▽▽스터디케어'
  },
  {
    content: '"직관적인 UI로 누구나 쉽게 사용할 수 있습니다. 교육 지원도 잘 되어 있어 만족합니다."',
    avatar: '강',
    name: '강○○ 부원장',
    location: '광주 동구 ☆☆스터디케어'
  }
];

const comparisonData = [
  { feature: '실시간 출결 관리', studycare: true, companyA: true, companyB: false },
  { feature: '성적 분석 시스템', studycare: true, companyA: false, companyB: true },
  { feature: '자습실 예약 시스템', studycare: true, companyA: false, companyB: false },
  { feature: '학부모 알림 서비스', studycare: true, companyA: true, companyB: true },
  { feature: '생기부 관리', studycare: true, companyA: false, companyB: false },
  { feature: '대학 정보 검색', studycare: true, companyA: false, companyB: true },
  { feature: '24시간 지원', studycare: true, companyA: false, companyB: false },
  { feature: '무료 업데이트', studycare: true, companyA: true, companyB: false }
];

const faqData = [
  {
    question: '도입 비용은 얼마나 드나요?',
    answer: '학원 규모와 필요한 기능에 따라 차이가 있습니다. 기본 패키지는 50만원부터 시작하며, 정확한 견적은 무료 상담을 통해 안내해 드립니다. 또한 1개월 무료 체험 기간을 제공하여 충분히 테스트해보신 후 결정하실 수 있습니다.'
  },
  {
    question: '기존 데이터를 옮길 수 있나요?',
    answer: '네, 가능합니다. 엑셀, CSV 등 다양한 형식의 데이터를 안전하게 마이그레이션해 드립니다. 전문 기술팀이 데이터 이전 과정을 도와드리며, 데이터 무결성을 100% 보장합니다.'
  },
  {
    question: '사용법이 어렵지 않을까요?',
    answer: '직관적인 인터페이스로 설계되어 누구나 쉽게 사용할 수 있습니다. 도입 시 상세한 교육을 제공하며, 동영상 가이드와 매뉴얼도 함께 제공됩니다. 필요시 언제든지 고객지원팀의 도움을 받으실 수 있습니다.'
  },
  {
    question: '보안은 안전한가요?',
    answer: '모든 데이터는 SSL 암호화를 통해 전송되며, 서버는 24시간 모니터링됩니다. 정기적인 백업과 개인정보보호법을 준수하는 보안 시스템으로 안전하게 관리됩니다.'
  },
  {
    question: '모바일에서도 사용 가능한가요?',
    answer: '네, PC와 태블릿, 스마트폰 모든 기기에서 사용 가능합니다. 반응형 웹 디자인으로 제작되어 어떤 화면 크기에서도 최적화된 경험을 제공합니다.'
  },
  {
    question: '계약 기간이 있나요?',
    answer: '최소 계약 기간은 없습니다. 월 단위로 자유롭게 이용하실 수 있으며, 언제든지 해지 가능합니다. 연간 계약 시에는 할인 혜택을 제공해 드립니다.'
  }
];

const pricingData = [
  {
    name: '스타터',
    description: '소규모 스터디케어에 최적화',
    price: '50만원',
    period: '최초 구축',
    features: ['핵심 기능 10가지', '학생 100명까지', '기본 교육 제공', '이메일 지원'],
    featured: false
  },
  {
    name: '프로페셔널',
    description: '중대형 스터디케어 추천',
    price: '80만원',
    period: '최초 구축',
    features: ['전체 기능 15가지', '학생 300명까지', '맞춤형 교육 및 설치', '우선 기술 지원', '데이터 백업'],
    featured: true
  },
  {
    name: '엔터프라이즈',
    description: '대형 스터디케어 및 프랜차이즈',
    price: '맞춤 견적',
    period: '규모별 협의',
    features: ['모든 기능 무제한', '학생 수 무제한', '전담 매니저 배정', '24/7 기술 지원', '커스터마이징'],
    featured: false
  }
];

const contactItems = [
  {
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M5 4H9L11 9L8.5 10.5C9.5 12.5 11.5 14.5 13.5 15.5L15 13L20 15V19C20 19.5 19.5 20 19 20C10.5 20 4 13.5 4 5C4 4.5 4.5 4 5 4Z" stroke="currentColor" stroke-width="2"/>
    </svg>`,
    title: '전화 문의',
    content: '010-XXXX-XXXX',
    subtitle: '평일 09:00 - 18:00'
  },
  {
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="6" width="16" height="12" rx="2" stroke="currentColor" stroke-width="2"/>
      <path d="M4 8L12 13L20 8" stroke="currentColor" stroke-width="2"/>
    </svg>`,
    title: '이메일',
    content: 'contact@example.com',
    subtitle: '24시간 접수 가능'
  },
  {
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M21 15C21 15.5 20.5 16 20 16H7L4 19V5C4 4.5 4.5 4 5 4H20C20.5 4 21 4.5 21 5V15Z" stroke="currentColor" stroke-width="2"/>
    </svg>`,
    title: '카카오톡',
    content: '@스터디케어관리시스템',
    subtitle: '실시간 상담 가능'
  }
];