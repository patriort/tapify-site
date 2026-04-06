import Head from 'next/head'

export default function Privacidad() {
  return (
    <div className="legal-page-shell">
      <Head>
        <title>Politica de Privacidad | Tapify</title>
        <meta
          name="description"
          content="Politica de Privacidad oficial de Tapify."
        />
      </Head>

      <main className="legal-page">
        <a className="back-link" href="/">Volver al inicio</a>

        <header className="legal-header">
          <h1>Politica de Privacidad - Tapify</h1>
          <p>Ultima actualizacion: 24/02/2026</p>
        </header>

        <section className="legal-block">
          <p>
            En Tapify respetamos tu privacidad. Esta aplicacion esta disenada para
            funcionar principalmente en tu dispositivo, minimizando la recopilacion
            y el almacenamiento externo de informacion.
          </p>
        </section>

        <section className="legal-block">
          <h2>1. Informacion que recopilamos</h2>
          <p>
            Tapify no recopila datos personales para su envio a servidores propios.
            La informacion que ingresas en la aplicacion, incluyendo gastos,
            ingresos, categorias, notas y configuracion, se almacena de forma local
            en tu dispositivo.
          </p>
        </section>

        <section className="legal-block">
          <h2>2. Sincronizacion con iCloud</h2>
          <p>
            Si habilitas la sincronizacion, tus datos pueden almacenarse en iCloud
            mediante servicios provistos por Apple.
          </p>
          <ul>
            <li>Los datos se sincronizan mediante tu cuenta de Apple.</li>
            <li>Tapify no tiene acceso directo a tus datos.</li>
            <li>
              El tratamiento de esa informacion se rige por la Politica de
              Privacidad de Apple.
            </li>
          </ul>
          <p>
            Mas informacion:{' '}
            <a
              href="https://www.apple.com/legal/privacy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.apple.com/legal/privacy/
            </a>
          </p>
        </section>

        <section className="legal-block">
          <h2>3. Datos que no recopilamos</h2>
          <ul>
            <li>Tapify no vende datos.</li>
            <li>Tapify no comparte datos con terceros.</li>
            <li>Tapify no utiliza servicios de publicidad.</li>
            <li>Tapify no utiliza herramientas de seguimiento ni analytics.</li>
          </ul>
        </section>

        <section className="legal-block">
          <h2>4. Seguridad</h2>
          <p>
            Los datos permanecen en tu dispositivo y, en caso de activar iCloud,
            quedan protegidos por la infraestructura de seguridad de Apple.
          </p>
        </section>

        <section className="legal-block">
          <h2>5. Cambios futuros</h2>
          <p>
            Si en el futuro Tapify incorpora funcionalidades que impliquen un
            tratamiento adicional de datos, esta politica sera actualizada.
          </p>
        </section>

        <section className="legal-block">
          <h2>6. Contacto</h2>
          <p>
            Si tienes consultas sobre esta Politica de Privacidad, puedes
            contactarnos en:{' '}
            <a href="mailto:patrixd8@outlook.com">patrixd8@outlook.com</a>
          </p>
        </section>
      </main>
    </div>
  )
}
