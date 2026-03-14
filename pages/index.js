import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'

const slides = [
  {
    eyebrow: 'Paso 1',
    title: 'Anota en 3 segundos',
    description:
      'Escribí el gasto de forma rápida: "STM" y  "570". Tapify completa y guarda al instante.',
    image: '/assets/IMG_0301-portrait.png',
    alt: 'Registro rápido en Tapify'
  },
  {
    eyebrow: 'Paso 2',
    title: 'Visualizá tu semana de forma clara',
    description:
      'Cada gasto queda ordenado por categoría y fecha para que no tengas que buscar ni pensar de más.',
    image: '/assets/IMG_0302-portrait.png',
    alt: 'Lista de gastos en Tapify'
  },
  {
    eyebrow: 'Paso 3',
    title: 'Decidí mejor rápido',
    description:
      'Mirás un resumen visual y sabés en qué se va tu plata. Sin planillas, sin menús largos.',
    image: '/assets/IMG_0303-portrait.png',
    alt: 'Resumen de gastos en Tapify'
  }
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
                <strong>&lt; 5s</strong>
                <span>para registrar</span>
              </div>
              <div>
                <strong>Flujo limpio</strong>
                <span>sin fricción</span>
              </div>
              <div>
                <strong>Vista clara</strong>
                <span>de tus gastos</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section reveal-up" id="como-funciona" data-reveal>
          <div className="section-head">
            <h2>Una interfaz que respira</h2>
            <p>Deslizá y mirá cómo Tapify te lleva de registrar a decidir rápido.</p>
          </div>

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
              <div className="slide-visual">
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

        <section className="section reveal-up" id="beneficios" data-reveal>
          <div className="section-head">
            <h2>Diseñada para el día a día</h2>
            <p>Solo lo que necesitas para no perder control de tu plata.</p>
          </div>

          <div className="benefits-grid">
            <article className="reveal-up" data-reveal style={{ '--delay': '80ms' }}>
              <h3>Hablas como siempre</h3>
              <p>Escribís monto y concepto en una sola línea, sin pasos extra.</p>
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
            <h2>Estadísticas y tendencias</h2>
            <p>Un bloque separado para visualizar gráficas y reportes semanales.</p>
          </div>

          <article className="step-four-card">
            <div className="step-four-visual">
              <img src="/assets/IMG_0304-portrait.png" alt="Estadísticas de Tapify" />
            </div>
          </article>
        </section>

        <section className="section reveal-up step-four" data-reveal>
          <div className="section-head">
            <h2>Widgets en lockscreen</h2>
            <p>Visualizá tu restante y agregá un gasto rápido desde la pantalla bloqueada.</p>
          </div>

          <article className="step-four-card">
            <div className="step-four-visual widgets-crop">
              <img src="/assets/IMG_0306-portrait.png" alt="Widgets en lockscreen de Tapify" />
            </div>
          </article>
        </section>

      </main>

      <footer className="site-footer">
        <strong>Tapify</strong>
        <span>Tu dinero en orden, sin complicarte.</span>
      </footer>
    </div>
  )
}
