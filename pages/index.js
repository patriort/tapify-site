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
          </div>

          <div className="right" style={{width:240}}>
            <div className="card">
              <div>
                <div style={{fontWeight:700}}>Rápido</div>
                <div className="muted">Añade un gasto en un toque</div>
              </div>
              <div style={{color:'var(--primary)'}}>•</div>
            </div>

            <div className="card" style={{marginTop:12}}>
              <div>
                <div style={{fontWeight:700}}>Limpio</div>
                <div className="muted">Sin distracciones</div>
              </div>
              <div style={{color:'var(--accent)'}}>•</div>
            </div>
          </div>
        </div>

        <p style={{marginTop:18}}>
          <a href="https://github.com/your-username/tapify-site" target="_blank" rel="noopener noreferrer">Repo en GitHub</a>
        </p>
      </main>
    </div>
  )
}
