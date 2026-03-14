import Head from 'next/head'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Tapify — Personal finance made simple</title>
        <meta name="description" content="Tapify — gestión de gastos e ingresos" />
      </Head>

      <main>
        <div className="hero">
          <div className="left">
            <h1>Tapify</h1>
            <p>Guarda tus gastos de forma rápida y sencilla. Minimalista y agradable al usar.</p>

            <div className="hero-row">
              <input className="input" placeholder="Ej. Café 3.50 €" />
              <button className="btn btn-primary" style={{marginLeft:8}}>Comenzar</button>
            </div>

            <div style={{marginTop:18,display:'flex',gap:8}}>
              <button className="btn btn-ghost">Cómo funciona</button>
              <a className="btn btn-primary" href="#features" style={{textDecoration:'none'}}>Probar ahora</a>
            </div>
          </div>

          <div className="right" style={{width:360}}>
            <div className="screenshot">
              <img src="/assets/illustration-hero.svg" alt="Tapify illustration" style={{width:'100%',display:'block'}} />
            </div>
          </div>
        </div>

        <section id="features" className="section">
          <h2 style={{margin:0}}>Características</h2>
          <p className="muted" style={{marginTop:6}}>Diseñado para registrar y visualizar gastos al instante.</p>

          <div className="features">
            <div className="feature">
              <div className="icon" style={{background:'var(--primary)'}}>1</div>
              <div>
                <h3>Registro rápido</h3>
                <p>Añade un gasto con una sola entrada y sigue tu flujo.</p>
              </div>
            </div>

            <div className="feature">
              <div className="icon" style={{background:'var(--primary-2)'}}>2</div>
              <div>
                <h3>Resumen claro</h3>
                <p>Vistas limpias que muestran tus gastos por categorías.</p>
              </div>
            </div>

            <div className="feature">
              <div className="icon" style={{background:'var(--accent)'}}>✓</div>
              <div>
                <h3>Privacidad</h3>
                <p>Tus datos se mantienen locales y bajo tu control.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <h2 style={{margin:0}}>Cómo funciona</h2>
          <p className="muted" style={{marginTop:6}}>Abre la app, escribe el monto y categorízalo en segundos.</p>

          <div className="testimonials" style={{marginTop:12}}>
            <div className="testimonial">
              <strong>"Me ahorra tiempo"</strong>
              <div className="muted">— Usuario feliz</div>
            </div>
            <div className="testimonial">
              <strong>"Interfaz simple y clara"</strong>
              <div className="muted">— Otra persona</div>
            </div>
          </div>
        </section>

        <footer>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12,flexWrap:'wrap'}}>
            <div>
              <strong>Tapify</strong>
              <div className="muted">Gestión simple de gastos</div>
            </div>
            <div className="muted">© {new Date().getFullYear()} Tapify</div>
          </div>
        </footer>
      </main>
    </div>
  )
}
