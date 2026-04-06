import Head from 'next/head'

export default function Soporte() {
  return (
    <div className="legal-page-shell">
      <Head>
        <title>Soporte | Tapify</title>
        <meta
          name="description"
          content="Soporte oficial de Tapify: preguntas frecuentes, reportes y contacto."
        />
      </Head>

      <main className="legal-page">
        <a className="back-link" href="/">Volver al inicio</a>

        <header className="legal-header">
          <h1>Tapify - Soporte</h1>
          <p>Ultima actualizacion: 24/02/2026</p>
        </header>

        <section className="legal-block">
          <p>
            Gracias por utilizar Tapify. Si necesitas asistencia, deseas enviar una
            sugerencia o quieres reportar un error, puedes contactarnos en:
          </p>
          <p>
            <a href="mailto:apptapify@gmail.com">apptapify@gmail.com</a>
          </p>
        </section>

        <section className="legal-block">
          <h2>Preguntas frecuentes</h2>

          <h3>Donde se guardan mis datos?</h3>
          <p>
            La informacion se almacena localmente en tu dispositivo. Si habilitas la
            sincronizacion, tambien se almacena en tu cuenta de iCloud.
          </p>

          <h3>Tapify comparte mi informacion?</h3>
          <p>
            No. Tapify no vende, cede ni comparte informacion personal con terceros.
          </p>

          <h3>La app funciona sin internet?</h3>
          <p>
            Si. Tapify puede utilizarse de forma offline. Solo necesitas conexion
            para sincronizar informacion mediante iCloud.
          </p>

          <h3>Puedo sugerir mejoras?</h3>
          <p>
            Si. Valoramos el feedback de los usuarios y evaluamos mejoras de forma
            continua.
          </p>
        </section>

        <section className="legal-block">
          <h2>Reportar un problema</h2>
          <p>
            Para agilizar el analisis y la resolucion, incluye la siguiente
            informacion:
          </p>
          <ul>
            <li>Modelo de iPhone</li>
            <li>Version de iOS</li>
            <li>Descripcion de lo que estabas haciendo al momento del error</li>
          </ul>
        </section>
      </main>
    </div>
  )
}
