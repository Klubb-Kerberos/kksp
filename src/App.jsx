import { useEffect, useRef, useState } from 'react'
import './App.css'

const asset = (path) => `${import.meta.env.BASE_URL}${path}`

const publikSections = [
  {
    id: 'lokalen',
    title: 'Lokalen',
    body:
      'Klubb Kerberos är en fristående kulturlokal med scen, ljud och ljus. Vi ordnar tekniken så att arrangören kan fokusera på innehållet.',
    media: {
      type: 'video',
      src: asset('media/videos/lokalen.mp4'),
      poster: asset('media/images/lokalen-poster.jpg'),
    },
  },
  {
    id: 'evenemang',
    title: 'Evenemang',
    body:
      'Varje kväll är unik. Arrangören bestämmer upplägg, biljetter, tider och vad som händer på scenen.',
    media: {
      type: 'image',
      src: asset('media/images/evenemang.jpg'),
    },
  },
  {
    id: 'mat-dryck',
    title: 'Mat och dryck',
    body:
      'Du får ta med egen mat och dryck till våra evenemang, inklusive alkohol för privat bruk. Ingen försäljning sker på plats.',
    media: {
      type: 'image',
      src: asset('media/images/mat-och-dryck.jpg'),
    },
  },
  {
    id: 'moblering',
    title: 'Möblering',
    body:
      'Lokalen kan möbleras olika beroende på arrangemangets form: stående, sittande eller blandad setup.',
    media: {
      type: 'image',
      src: asset('media/images/moblering.jpg'),
    },
  },
  {
    id: 'sakerhet',
    title: 'Säkerhet och trivsel',
    body:
      'Vi har utrymningsvägar, brandskydd och tekniskt ansvar på plats. Arrangören ansvarar för publikhantering och trivsel under kvällen.',
    media: {
      type: 'image',
      src: asset('media/images/sakerhet-och-trivsel.jpg'),
    },
  },
  {
    id: 'vilka-vi-ar',
    title: 'Vilka vi är',
    body:
      'Klubb Kerberos drivs av en ideell förening utan vinstintresse. Vårt mål är att skapa en plats där kultur får utrymme.',
    media: {
      type: 'image',
      src: asset('media/images/vilka-vi-ar.jpg'),
    },
  },
]

const arrangerSections = [
  {
    id: 'arrangera-hos-oss',
    title: 'Att arrangera hos oss - så fungerar det',
    body:
      'Du är arrangören: du planerar kvällen, biljetter, publikhantering, dörrkontroll och eventuella tillstånd. Vi är platsen och tekniken: ljud, ljus, teknisk säkerhet och praktiskt stöd.',
    bullets: [
      'Vi är helt ideella och tar ingen avgift för vårt tekniska arbete.',
      'Maxkapacitet är 80 personer.',
      'Egen mat och dryck är tillåtet för privat bruk.',
    ],
    media: {
      type: 'video',
      src: asset('media/videos/att-arrangera-hos-oss-sa-fungerar-det.mp4'),
      poster: asset('media/images/att-arrangera-hos-oss-poster.jpg'),
    },
  },
  {
    id: 'kostnader',
    title: 'Kostnader och ansvar',
    body:
      'Klubb Kerberos tar ingen avgift för teknik, drift eller ideellt arbete. Lokalhyra betalas till hyresvärd och städning hanteras av arrangören eller köps av hyresvärden.',
    bullets: [
      'Arrangören ansvarar för publikens säkerhet, dörrkontroll och genomförande.',
      'Klubb Kerberos ansvarar för ljud, ljus, teknisk säkerhet och stöd.',
      'Hyresvärden ansvarar för lokalens grundskick och hyresavtal.',
      'Ibland kan vi även erbjuda arrangörsstöd om vår budget tillåter. Hör gärna av dig så pratar vi om vad som är möjligt.',
    ],
    media: {
      type: 'image',
      src: asset('media/images/kostnader-och-ansvar.jpg'),
    },
  },
  {
    id: 'har-du-en-ide',
    title: 'Har du en idé?',
    body:
      'Hör av dig så ser vi om Klubb Kerberos är rätt plats för ditt arrangemang. Du står för innehållet - vi står för platsen, tekniken och förutsättningarna.',
    media: {
      type: 'image',
      src: asset('media/images/har-du-en-ide.jpg'),
    },
  },
]

function MediaBackground({ media, title }) {
  if (media.type === 'video') {
    return (
      <>
        <video
          className="panel-media"
          autoPlay
          loop
          muted
          playsInline
          poster={media.poster}
        >
          <source src={media.src} type="video/mp4" />
        </video>
        <div className="panel-fallback" style={{ backgroundImage: `url(${media.poster})` }} />
      </>
    )
  }

  return (
    <div
      className="panel-media panel-image"
      style={{ backgroundImage: `url(${media.src})` }}
      role="img"
      aria-label={title}
    />
  )
}

function InfoPanel({ section, kicker }) {
  return (
    <section className="panel" id={section.id}>
      <MediaBackground media={section.media} title={section.title} />
      <div className="panel-overlay" />
      <article className="panel-content">
        <p className="kicker">{kicker}</p>
        <h2>{section.title}</h2>
        <p>{section.body}</p>
        {section.bullets ? (
          <ul>
            {section.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
        {section.id === 'har-du-en-ide' ? (
          <a className="btn btn-primary" href="mailto:klubbkerberos@gmail.com">
            Kontakt
          </a>
        ) : null}
      </article>
    </section>
  )
}

function App() {
  const [showArranger, setShowArranger] = useState(false)
  const arrangerRef = useRef(null)

  useEffect(() => {
    const targets = [...document.querySelectorAll('.panel')]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
          }
        })
      },
      {
        threshold: 0.35,
        rootMargin: '0px 0px -8% 0px',
      }
    )

    targets.forEach((target) => observer.observe(target))

    return () => observer.disconnect()
  }, [showArranger])

  const jumpToArranger = () => {
    if (!showArranger) {
      setShowArranger(true)
      requestAnimationFrame(() => {
        const firstArrangerPanel = document.getElementById('arrangera-hos-oss')
        firstArrangerPanel?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
      return
    }

    const firstArrangerPanel = document.getElementById('arrangera-hos-oss')
    firstArrangerPanel?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main className="page-shell">
      <section className="panel landing" id="start">
        <MediaBackground
          media={{
            type: 'video',
            src: asset('media/videos/valkommen-till-klubb-kerberos.mp4'),
            poster: asset('media/images/valkommen-till-klubb-kerberos-poster.jpg'),
          }}
          title="Publikinfo intro"
        />
        <div className="panel-overlay" />
        <div className="landing-stack">
          <img className="landing-logo" src={asset('images/kklogo.svg')} alt="Klubb Kerberos" />
          <div className="panel-content landing-content">
            <p className="kicker">Klubb Kerberos</p>
            <h1>Välkommen till Klubb Kerberos</h1>
            <p>
              Klubb Kerberos är en ideell scen i Veberöd där livemusik, klubbkvällar och
              andra kulturarrangemang får ta plats.
            </p>
            <div className="cta-row">
              <a className="btn btn-primary" href="#lokalen">
                Publik
              </a>
              <button className="btn btn-ghost" onClick={jumpToArranger}>
                Arrangera hos oss
              </button>
            </div>
          </div>
        </div>
      </section>

      {publikSections.map((section) => (
        <InfoPanel key={section.id} section={section} kicker="Publikinfo" />
      ))}

      <section className="panel end-cta" id="vidare">
        <MediaBackground
          media={{
            type: 'image',
            src: asset('media/images/vill-du-arrangera-nagot.jpg'),
          }}
          title="Fortsätt till arrangörinfo"
        />
        <div className="panel-overlay" />
        <div className="panel-content">
          <p className="kicker">För arrangörer</p>
          <h2>Vill du arrangera något?</h2>
          <p>
            Har du idéer du vill förverkliga? Gå vidare och läs mer om hur du kan
            arrangera hos oss.
          </p>
          <button className="btn btn-primary" onClick={jumpToArranger}>
            Arrangera hos oss
          </button>
        </div>
      </section>

      {showArranger && (
        <section
          className="arranger-shell is-visible"
          ref={arrangerRef}
          id="arrangor"
        >
          {arrangerSections.map((section) => (
            <InfoPanel key={section.id} section={section} kicker="Arrangör" />
          ))}
        </section>
      )}

      <aside className="floating-nav">
        <a
          href="https://www.facebook.com/klubbkerberos"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
          aria-label="Facebook"
          title="Facebook"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </a>
        <a
          href="https://www.instagram.com/klubbkerberos"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
          aria-label="Instagram"
          title="Instagram"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.466.182-.8.398-1.15.748-.35.35-.566.684-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.398.8.748 1.15.35.35.684.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.684.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
          </svg>
        </a>
        <a
          href="mailto:klubbkerberos@gmail.com"
          className="social-link"
          aria-label="Email"
          title="Email"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" opacity="0.3" />
            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
          </svg>
        </a>
      </aside>
    </main>
  )
}

export default App
