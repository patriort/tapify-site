import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'

const slides = [
  {
    eyebrow: 'Paso 1',
    title: 'Anotá en 3 segundos',
    description:
      'Escribí el gasto de forma rápida: "STM" y  "600". Tapify completa y guarda al instante.',
    image: '/assets/paso1.png',
    alt: 'Registro rápido en Tapify',
    cropTopHalf: true
  },
  {
    eyebrow: 'Paso 2',
    title: 'Visualizá tu gasto de forma clara',
    description:
      'Tapify se encarga automáticamente de asignar el ícono y la categoria.',
    image: '/assets/paso2.png',
    alt: 'Lista de recientes en Tapify',
    cropTopHalf: true
  },
]

export default function Home() {
  const AUTO_ADVANCE_MS = 3800
  const TRANSITION_LOCK_MS = 360
  const [activeSlide, setActiveSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [slideDirection, setSlideDirection] = useState('next')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isShowcaseInView, setIsShowcaseInView] = useState(false)
  const [isPageVisible, setIsPageVisible] = useState(true)
  const showcaseRef = useRef(null)
  const resumeTimerRef = useRef(null)
  const transitionTimerRef = useRef(null)

  const pauseAndResume = (delay = 6000) => {
    setIsPaused(true)
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current)
    }
    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false)
    }, delay)
  }

  const goToSlide = (nextIndex, direction) => {
    if (isTransitioning) {
      return
    }
    setIsTransitioning(true)
    setSlideDirection(direction)
    setActiveSlide(nextIndex)

    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current)
    }
    transitionTimerRef.current = setTimeout(() => {
      setIsTransitioning(false)
    }, TRANSITION_LOCK_MS)
  }

  const handleNext = () => {
    pauseAndResume()
    goToSlide((activeSlide + 1) % slides.length, 'next')
  }

  const handlePrev = () => {
    pauseAndResume()
    goToSlide((activeSlide - 1 + slides.length) % slides.length, 'prev')
  }

  useEffect(() => {
    if (isPaused || !isShowcaseInView || !isPageVisible) {
      return undefined
    }

    const autoplayTimer = setTimeout(() => {
      if (isTransitioning) {
        return
      }
      setSlideDirection('next')
      setActiveSlide((current) => (current + 1) % slides.length)
    }, AUTO_ADVANCE_MS)

    return () => {
      clearTimeout(autoplayTimer)
    }
  }, [isPaused, isShowcaseInView, isPageVisible, activeSlide, AUTO_ADVANCE_MS, isTransitioning])

  useEffect(() => {
    const currentShowcase = showcaseRef.current
    if (!currentShowcase) {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        setIsShowcaseInView(Boolean(entry?.isIntersecting))
      },
      { threshold: 0.45 }
    )

    observer.observe(currentShowcase)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onVisibilityChange = () => {
      setIsPageVisible(!document.hidden)
    }

    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [])

  useEffect(() => {
    const revealNodes = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    revealNodes.forEach((node) => observer.observe(node))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current)
      }
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current)
      }
    }
  }, [])

  return (
    <div className="page-shell">
      <Head>
        <title>Tapify | Tus gastos, bajo control y sin vueltas</title>
        <meta
          name="description"
          content="Anotá gastos en segundos y mirá en qué se te va la plata con una app simple y rápida."
        />
        {slides.map((slide) => (
          <link key={slide.image} rel="preload" as="image" href={slide.image} />
        ))}
      </Head>

      <header className="site-nav">
        <a className="brand" href="#inicio" aria-label="Tapify inicio">
          <img src="/assets/logo.png" alt="Tapify" />
          <span>Tapify</span>
        </a>

        <nav className="site-links" aria-label="Navegación principal">
          <a href="#como-funciona">Producto</a>
          <a href="#beneficios">Ventajas</a>
          <a href="#dispositivos">Dispositivos</a>
          <a href="#contact">Contacto</a>
        </nav>
      </header>

      <main className="page-content" id="inicio">
        <section className="hero reveal-up is-visible" data-reveal>
          <p className="launch-note">Próximamente en App Store</p>
          <div className="hero-copy">
            <h1>Minimalista por fuera. Potente por dentro.</h1>
            <p>Anotá gastos en segundos y entendé tu semana sin menús largos ni pantallas de sobra.</p>

            <div className="hero-metrics">
              <div>
                <strong>1 toque</strong>
                <span>para registrar</span>
              </div>
              <div>
                <strong>Flujo limpio</strong>
                <span>sin fricción</span>
              </div>
              <div>
                <strong>Vista clara</strong>
                <span>de tus registros</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section reveal-up" id="como-funciona" data-reveal>
          <section className="section reveal-up step-four" data-reveal>
          <div className="section-head">
            <h2>Widgets en lockscreen</h2>
            <p>Visualizá tu restante y agregá un gasto rápido con un solo toque.</p>
          </div>
          

          <article className="step-four-card">
            <div className="step-four-visual widgets-crop">
              <img src="/assets/IMG_0306-portrait.png" alt="Widgets en lockscreen de Tapify" />
            </div>
          </article>
        </section>
          <div
          
            ref={showcaseRef}
            className={isPaused ? 'showcase paused' : 'showcase'}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            onFocusCapture={() => setIsPaused(true)}
            onBlurCapture={() => setIsPaused(false)}
            style={{ '--autoplay-ms': `${AUTO_ADVANCE_MS}ms` }}
          >
            <div className="glow glow-a" />
            <div className="glow glow-b" />

            <button
              className="slide-arrow left"
              onClick={handlePrev}
              aria-label="Slide anterior"
              type="button"
              disabled={isTransitioning}
            >
              <span>◀</span>
            </button>

            <article
              className={slideDirection === 'prev' ? 'slide-card slide-prev' : 'slide-card slide-next'}
              aria-live="polite"
              key={slides[activeSlide].title}
            >
              <div className={slides[activeSlide].cropTopHalf ? 'slide-visual crop-top-half' : 'slide-visual'}>
                <img src={slides[activeSlide].image} alt={slides[activeSlide].alt} loading="eager" />
              </div>
              <div className="slide-copy">
                <span>{slides[activeSlide].eyebrow}</span>
                <h3>{slides[activeSlide].title}</h3>
                <p>{slides[activeSlide].description}</p>
              </div>
            </article>

            <button
              className="slide-arrow right"
              onClick={handleNext}
              aria-label="Slide siguiente"
              type="button"
              disabled={isTransitioning}
            >
              <span>▶</span>
            </button>
          </div>

          <div className="dots" role="tablist" aria-label="Selección de slides">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                role="tab"
                aria-selected={activeSlide === index}
                aria-label={`Ir a ${slide.title}`}
                className={activeSlide === index ? 'dot active' : 'dot'}
                onClick={() => {
                  if (index === activeSlide) {
                    return
                  }
                  pauseAndResume()
                  goToSlide(index, index > activeSlide ? 'next' : 'prev')
                }}
                disabled={isTransitioning}
              />
            ))}
          </div>
        </section>

        <section className="section wallet reveal-up" id="wallet" data-reveal>
          <div className="wallet-card" style={{marginTop:15}}>
              <div className="wallet-row">
              <img src="/assets/Wallet_App_icon_iOS_12.png" alt="Wallet icon" className="wallet-icon" />
              <div className="wallet-text">
                <strong>Integración con Wallet</strong>
                <p className="muted">Tapify se conecta con Wallet para que cualquier compra que realices se guarde automáticamente en la app.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="section reveal-up" id="beneficios" data-reveal>
          <div className="section-head">
            <h2>Diseñada para el día a día</h2>
            <p>Solo lo que necesitas para no perder control de tu plata.</p>
          </div>

          <div className="benefits-grid">
            <article className="reveal-up" data-reveal style={{ '--delay': '80ms' }}>
              <h3>Rápido</h3>
              <p>Escribís monto y concepto, sin pasos extra.</p>
            </article>
            <article className="reveal-up" data-reveal style={{ '--delay': '160ms' }}>
              <h3>Orden sin esfuerzo</h3>
              <p>Todo queda acomodado por fecha y categoría, automáticamente.</p>
            </article>
            <article className="reveal-up" data-reveal style={{ '--delay': '240ms' }}>
              <h3>Panorama rápido</h3>
              <p>En un vistazo sabés en qué se te va la plata y ajustás a tiempo.</p>
            </article>
          </div>
          
        </section>


        <section className="section reveal-up step-four" data-reveal>
          <div className="section-head">
            <h2>Fijos</h2>
            <p>Guardá tus ingresos y gastos recurrentes.</p>
          </div>
          <article className="step-four-card">
            <div className="step-four-visual step-four-visual-pair">
              <img src="/assets/fijos.png" alt="Fijos de Tapify" />
            </div>
          </article>
          <p></p>
          <div className="section-head">
            <h2>Calendario y estadísticas</h2>
            <p>Un bloque separado para visualizar gráficas y reportes semanales.</p>
          </div>

          <article className="step-four-card">
            <div className="step-four-visual step-four-visual-pair">
              <img src="/assets/IMG_0303-portrait.png" alt="Tendencias de Tapify" />
              <img src="/assets/IMG_0304-portrait.png" alt="Estadísticas de Tapify" />
            </div>
          </article>
          
        </section>

        <section id="dispositivos" className="section sync-section reveal-up" data-reveal>
          <div className="sync-head">
            <h2>Sincronización entre dispositivos</h2>
            <p>Tapify se sincroniza automáticamente mediante iCloud para que tus gastos estén disponibles en iPhone y iPad.</p>
                        <p>Proximamente también disponible en Mac.</p>

          </div>

          <div className="sync-row">
            <div className="sync-row">
              <div style={{flex:'1 1 56%',display:'flex',justifyContent:'center'}}>
                  <div className="sync-visual mock-side">
                    <div className="mock-portrait-side">
                      <img src="/assets/Captura de pantalla 2026-03-14 a la(s) 20.59.23-portrait.png" alt="Sync portrait" />
                    </div>
                    <div className="mock-landscape-side">
                      <img src="/assets/Captura de pantalla 2026-03-14 a la(s) 20.59.33-landscape.png" alt="Sync landscape" />
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </section>

      </main>

        {/* Contact section (email + Instagram) */}
        <section id="contact" className="section reveal-up" data-reveal>
          <div className="section-head">
            <h2>Contacto</h2>
          </div>

          <div className="contact-grid" style={{marginTop:12}}>
            <div className="contact-links" style={{display:'flex',gap:16,alignItems:'center'}}>
              <a href="mailto:apptapify@gmail.com" className="contact-link" aria-label="Enviar correo" style={{display:'inline-flex',alignItems:'center',gap:8,color:'inherit',textDecoration:'none'}}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M3 5.5C3 4.67157 3.67157 4 4.5 4H19.5C20.3284 4 21 4.67157 21 5.5V18.5C21 19.3284 20.3284 20 19.5 20H4.5C3.67157 20 3 19.3284 3 18.5V5.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3.5 6.5L12 12.2L20.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>apptapify@gmail.com</span>
              </a>

              <a id="instagram-link" href="https://www.instagram.com/tapifyapp_" className="contact-link" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{display:'inline-flex',alignItems:'center',gap:8,color:'inherit',textDecoration:'none'}}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M8 11.5C8 9.567 9.567 8 11.5 8C13.433 8 15 9.567 15 11.5C15 13.433 13.433 15 11.5 15C9.567 15 8 13.433 8 11.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17.5 6.5L17.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>tapifyapp_</span>
              </a>
            </div>
          </div>
        </section>

      <footer className="site-footer">
        <strong>Tapify</strong>
        <span>Tu dinero en orden, sin complicarte.</span>
      </footer>
    </div>
  )
}
