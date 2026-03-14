import Head from 'next/head'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Tapify — Personal finance made simple</title>
        <meta name="description" content="Tapify — gestión de gastos e ingresos" />
      </Head>

      <main>
        <h1>Tapify</h1>
        <p>Landing page para Tapify. Construida con Next.js — despliega en Vercel.</p>
        <p>
          <a href="https://github.com/your-username/tapify-site" target="_blank" rel="noopener noreferrer">Repo en GitHub</a>
        </p>
      </main>
    </div>
  )
}
