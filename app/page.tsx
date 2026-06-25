'use client'

import { useEffect } from 'react'
import Image from 'next/image'

export default function Home() {
  useEffect(() => {
    // Cursor
    const cursor = document.getElementById('cursor')
    const ring = document.getElementById('cursorRing')

    setTimeout(() => {
      if (cursor) cursor.style.opacity = '1'
      if (ring) ring.style.opacity = '0.5'
    }, 100)

    const onMove = (e: MouseEvent) => {
      if (cursor) {
        cursor.style.left = e.clientX - 4 + 'px'
        cursor.style.top = e.clientY - 4 + 'px'
      }
      if (ring) {
        ring.style.left = e.clientX - 16 + 'px'
        ring.style.top = e.clientY - 16 + 'px'
      }
    }
    document.addEventListener('mousemove', onMove)

    // Scroll animations
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.15 }
    )
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el))

    // Active nav
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]')
    const onScroll = () => {
      let current = ''
      document.querySelectorAll('section[id]').forEach(section => {
        if (window.scrollY >= (section as HTMLElement).offsetTop - 200) current = section.id
      })
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + current)
      })
    }
    window.addEventListener('scroll', onScroll)

    // Skill dots
    const skillLevels: Record<string, number> = {
  'WordPress': 2, 'HTML / CSS': 3, 'JavaScript': 2, 'TypeScript': 2, 'React': 2, 'Next.js': 2, 'Python': 2, 'FastAPI': 2,
  'SQL / PostgreSQL': 2, 'PHP': 1,'Git': 2,'Azure': 1,
}
            document.querySelectorAll('.skill-item').forEach(item => {
           const nameEl = item.querySelector('.skill-name')
            if (!nameEl) return
         const level = skillLevels[nameEl.textContent?.trim() || ''] || 1
          const dots = document.createElement('div')
           dots.className = 'skill-dots'
           for (let i = 1; i <= 3; i++) {
        const dot = document.createElement('span')
        dot.className = i <= level ? 'dot filled' : 'dot'
        dots.appendChild(dot)
      }
      item.appendChild(dots)
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const setLang = (lang: 'fi' | 'en') => {
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'))
    document.querySelector(`.lang-btn:${lang === 'fi' ? 'first' : 'last'}-child`)?.classList.add('active')
    document.querySelectorAll(`[data-${lang}]`).forEach(el => {
      el.innerHTML = el.getAttribute(`data-${lang}`) || ''
    })
    document.documentElement.lang = lang
  }

  return (
    <>


      {/* Navigation */}
      <nav>
        <a href="#" className="nav-logo">JK</a>
        <div className="nav-right">
          <a href="#about" className="nav-link" data-fi="Tietoa" data-en="About">Tietoa</a>
          <a href="#skills" className="nav-link" data-fi="Osaaminen" data-en="Skills">Osaaminen</a>
          <a href="#projects" className="nav-link" data-fi="Projektit" data-en="Projects">Projektit</a>
          <a href="#services" className="nav-link" data-fi="Palvelut" data-en="Services">Palvelut</a>
          <a href="#contact" className="nav-link" data-fi="Yhteystiedot" data-en="Contact">Yhteystiedot</a>
          <div className="lang-toggle">
            <button className="lang-btn active" onClick={() => setLang('fi')}>FI</button>
            <button className="lang-btn" onClick={() => setLang('en')}>EN</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="hero">
        <div style={{ flex: 1 }}>
          <div
            className="hero-tag"
            data-fi="Tietojenkäsittely · Seinäjoki"
            data-en="Information Technology · Seinäjoki"
          >
            Tietojenkäsittely · Seinäjoki
          </div>
          <h1 className="hero-name">
            JESPER <span style={{ display: 'inline-block', width: '0.1em' }}></span><em>KÄRNÄ</em>
          </h1>
          <p
            className="hero-desc"
            data-fi='Olen kiinnostunut erityisesti <span class="about-highlight">full stack -kehityksestä</span> ja tekoälysovelluksista. Rakennan jatkuvasti uutta ja opin tekemällä. Haluan rakentaa asioita jotka ratkaisevat oikeita ongelmia.'
            data-en='I am particularly interested in <span class="about-highlight">full stack development</span> and AI applications. I keep building and learning by doing. I want to build things that solve real problems.'  
          >
            Olen kiinnostunut erityisesti{' '}
            <span className="about-highlight">full stack -kehityksestä</span>{' '} ja tekoälysovelluksista. Rakennan jatkuvasti uutta ja opin tekemällä. Haluan rakentaa asioita jotka ratkaisevat oikeita ongelmia.
          </p>
          <div className="hero-cta">
            <a href="#projects" className="btn-primary" data-fi="Katso projektit" data-en="View projects">
              Katso projektit
            </a>
            <a href="#contact" className="btn-secondary" data-fi="Ota yhteyttä" data-en="Get in touch">
              Ota yhteyttä
            </a>
          </div>
        </div>
        <div style={{ flexShrink: 0, marginLeft: '4rem', opacity: 0, animation: 'fadeUp 0.8s ease 1s forwards' }}>
          <Image
            src="/jesper.jpg"
            alt="Jesper Kärnä"
            width={550}
            height={680}
            style={{
              width: 'min(550px, 40vw)',
              height: 'auto',
              objectFit: 'cover',
              objectPosition: 'center top',
              borderRadius: '16px',
              border: '1px solid #1e2235',
            }}
            priority
          />
        </div>
        <div className="hero-scroll" data-fi="Selaa alas" data-en="Scroll down">Selaa alas</div>
      </div>

      <hr className="divider" />

      {/* About */}
      <section id="about">
        <div className="section-label" data-fi="// Tietoa minusta" data-en="// About me">
          // Tietoa minusta
        </div>
        <div className="about-grid fade-in">
          <div className="about-text">
            <p
              data-fi='Opiskelen tietojenkäsittelyn tradenomiksi <span class="about-highlight">Savonia-ammattikorkeakoulussa</span> ja teen samalla töitä Lähihoitajana. Olen tottunut itsenäiseen ja vastuulliseen työskentelyyn.'
              data-en='I study Business IT at <span class="about-highlight">Savonia University of Applied Sciences</span> while working alongside my studies. I am used to working independently and taking responsibility.'
            >
              Opiskelen tietojenkäsittelyn tradenomiksi{' '}
              <span className="about-highlight">Savonia-ammattikorkeakoulussa</span> ja teen samalla
              töitä Lähihoitajana. Olen tottunut itsenäiseen ja vastuulliseen työskentelyyn.
            </p>
            <p
              data-fi='Olen kiinnostunut erityisesti <span class="about-highlight">full stack -kehityksestä</span> ja web-ohjelmoinnista. Haluan rakentaa asioita jotka toimivat oikeasti ja tuottavat arvoa.'
              data-en='I am particularly interested in <span class="about-highlight">full stack development</span> and web programming. I want to build things that actually work and deliver real value.'
            >
              Olen kiinnostunut erityisesti{' '}
              <span className="about-highlight">full stack -kehityksestä</span> ja
              web-ohjelmoinnista. Haluan rakentaa asioita jotka toimivat oikeasti ja tuottavat arvoa.
            </p>
            <p
              data-fi="Asun Seinäjoella ja olen valmis myös etätöihin."
              data-en="I am based in Seinäjoki and open to remote work as well."
            >
              Asun Seinäjoella ja olen valmis myös etätöihin.
            </p>
          </div>
          <div className="about-facts">
            {[
              { fi: 'Koulutus', en: 'Education', value: 'Savonia AMK' },
              { fi: 'Tutkinto', en: 'Degree', valueFi: 'Tradenomi, tietojenkäsittely', valueEn: 'BBA, Business IT' },
              { fi: 'Sijainti', en: 'Location', value: 'Seinäjoki, Finland' },
              { fi: 'Kielet', en: 'Languages', valueFi: 'Suomi, Englanti', valueEn: 'Finnish, English' },
              { fi: 'Suuntautuminen', en: 'Focus', value: 'Full Stack' },
            ].map((f, i) => (
              <div className="fact-item" key={i}>
                <span className="fact-label" data-fi={f.fi} data-en={f.en}>{f.fi}</span>
                <span
                  className="fact-value"
                  data-fi={f.valueFi || f.value}
                  data-en={f.valueEn || f.value}
                >
                  {f.valueFi || f.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* Skills */}
      <section id="skills">
        <div className="section-label" data-fi="// Osaaminen" data-en="// Skills">
          // Osaaminen
        </div>
        <div className="skills-grid fade-in">
          {[
              { name: 'HTML / CSS', fi: 'Perusteet & tyyli', en: 'Fundamentals & styling' },
              { name: 'JavaScript', fi: 'Frontend logiikka', en: 'Frontend logic' },
              { name: 'TypeScript', fi: 'Tyyppiturvallinen JS', en: 'Type-safe JavaScript' },
              { name: 'React', fi: 'Komponenttikehitys', en: 'Component development' },
              { name: 'Next.js', fi: 'Fullstack React', en: 'Fullstack React' },
              { name: 'Python', fi: 'Scripting & data', en: 'Scripting & data' },
              { name: 'FastAPI', fi: 'REST API -kehitys', en: 'REST API development' },
              { name: 'SQL / PostgreSQL', fi: 'Tietokantakehitys', en: 'Database development' },
              { name: 'WordPress', fi: 'Sivustokehitys', en: 'Site development' },
              { name: 'PHP', fi: 'WordPress-kehitys', en: 'WordPress development' },
              { name: 'Git', fi: 'Versionhallinta', en: 'Version control' },
              { name: 'Azure', fi: 'Pilvipalvelut', en: 'Cloud services' },
    ].map((s, i) => (
       <div className="skill-item" key={i}>
    <div className="skill-name">{s.name}</div>
   <div className="skill-level" data-fi={s.fi} data-en={s.en}>{s.fi}</div>
  </div>
))}

        </div>
      </section>

      <hr className="divider" />

      {/* Projects */}
      <section id="projects">
        <div className="section-label" data-fi="// Projektit" data-en="// Projects">
          // Projektit
        </div>
        <div className="projects-grid fade-in">

          <div className="project-card">
            <span className="project-tag">WordPress · Elementor</span>
            <h3 className="project-title">Kivikko Oy</h3>
            <p
              className="project-desc"
              data-fi="Hoiva- ja kotipalvelu Kivikko Oy:n verkkosivut. Palvelulistaus, yhteystiedot ja yhteydenottolomake. Ensimmäinen asiakastyö."
              data-en="Website for Kivikko Oy home care services. Service listing, contact details and inquiry form. First client project."
            >
              Hoiva- ja kotipalvelu Kivikko Oy:n verkkosivut. Palvelulistaus, yhteystiedot ja
              yhteydenottolomake. Ensimmäinen asiakastyö.
            </p>
            <div className="project-stack">
              {['WordPress', 'Elementor'].map(t => (
                <span className="stack-tag" key={t}>{t}</span>
              ))}
            </div>
            <div style={{ marginTop: '1.5rem' }}>
              <a
                href="https://kivikko.fi"
                target="_blank"
                className="btn-primary"
                style={{ fontSize: '0.7rem', padding: '0.6rem 1.2rem' }}
                data-fi="Katso live"
                data-en="View live"
              >
                Katso live
              </a>
            </div>
          </div>

          <div className="project-card">
            <span className="project-tag">Shopify · Liquid · Custom Theme</span>
            <h3 className="project-title">Sting Rocko</h3>
            <p
              className="project-desc"
              data-fi="Täysin itse rakennettu Shopify-teema suomalaiselle käsintehdyille vaatteille. Custom Liquid-templatet, FI/EN-kielivalinta, Mailchimp-integraatio ja drop teaser -osio."
              data-en="Fully custom Shopify theme built from scratch for a Finnish handmade clothing brand. Custom Liquid templates, FI/EN language switcher, Mailchimp integration and drop teaser section."
            >
              Täysin itse rakennettu Shopify-teema suomalaiselle käsintehdyille vaatteille. Custom
              Liquid-templatet, FI/EN-kielivalinta, Mailchimp-integraatio ja drop teaser -osio.
            </p>
            <div className="project-stack">
              {['Shopify', 'Liquid', 'CSS', 'JavaScript', 'Mailchimp'].map(t => (
                <span className="stack-tag" key={t}>{t}</span>
              ))}
            </div>
            <div style={{ marginTop: '1.5rem' }}>
              <a
                href="https://stingrocko.com"
                target="_blank"
                className="btn-primary"
                style={{ fontSize: '0.7rem', padding: '0.6rem 1.2rem' }}
                data-fi="Katso live"
                data-en="View live"
              >
                Katso live
              </a>
            </div>
          </div>

        </div>
      </section>

      <hr className="divider" />

      {/* Services */}
      <section id="services">
        <div className="section-label" data-fi="// Palvelut" data-en="// Services">
          // Palvelut
        </div>
        <p
          className="services-intro fade-in"
          data-fi="Tarjoan web-kehityspalveluita opiskelija hinnoin. Jokainen projekti on yksilöllinen – ota yhteyttä niin jutellaan lisää."
          data-en="I offer web development services at student prices. Every project is unique – get in touch and let's talk."
        >
          Tarjoan web-kehityspalveluita opiskelija hinnoin. Jokainen projekti on yksilöllinen – ota
          yhteyttä niin jutellaan lisää.
        </p>
        <div className="services-grid fade-in">
          {[
            {
              tag: 'WordPress · Elementor',
              nameFi: 'WordPress', nameEn: 'WordPress',
              fi: 'WordPress-sivusto joka on helppo itse päivittää. Sisältää teeman ja tarvittavat lisäosat.',
              en: 'WordPress site easy to update yourself. Includes theme and necessary plugins.',
              priceFi: 'alkaen 300 €', priceEn: 'from €300',
            },
            {
              tag: 'HTML · CSS · JS',
              nameFi: 'Nettisivut', nameEn: 'Website',
              fi: 'Siisti, nopea ja mobiiliystävällinen staattinen sivusto. Sopii portfolioille, yrityksille ja tapahtumille.',
              en: 'Clean, fast and mobile-friendly static website. Perfect for portfolios, businesses and events.',
              priceFi: 'alkaen 600 €', priceEn: 'from €600',
            },
            {
              tag: 'Full Stack · AI',
              nameFi: 'Web-sovellus', nameEn: 'Web Application',
              fi: 'Räätälöity sovellus tietokannalla, kirjautumisella tai tekoälyominaisuuksilla. Hinta riippuu laajuudesta.',
              en: 'Custom app with database, authentication or AI features. Price depends on scope.',
              priceFi: 'alkaen 1 000 €', priceEn: 'from €1,000',
            },
            {
              tag: 'Support',
              nameFi: 'Ylläpito & päivitykset', nameEn: 'Maintenance & updates',
              fi: 'Olemassa olevan sivuston pienet muutokset, sisältöpäivitykset ja tekninen tuki.',
              en: 'Small edits, content updates and technical support for existing sites.',
              priceFi: 'alkaen 25 € / kk', priceEn: 'from €25 / month',
            },
          ].map((s, i) => (
            <div className="service-card" key={i}>
              <span className="project-tag">{s.tag}</span>
              <h3 className="service-name" data-fi={s.nameFi} data-en={s.nameEn}>{s.nameFi}</h3>
              <p className="service-desc" data-fi={s.fi} data-en={s.en}>{s.fi}</p>
              <div className="service-price" data-fi={s.priceFi} data-en={s.priceEn}>{s.priceFi}</div>
              <a href="#contact" className="btn-secondary service-cta" data-fi="Kysy lisää" data-en="Ask more">
                Kysy lisää
              </a>
            </div>
          ))}
        </div>
      </section>

      <hr className="divider" />

      {/* Contact */}
      <section id="contact">
        <div className="contact-inner fade-in">
          <h2 className="contact-title">
            Ota <em>yhteyttä</em>
          </h2>
          <p
            className="contact-sub"
            data-fi="Olen avoinna uusille mahdollisuuksille, yhteistyöprojekteille ja mielenkiintoisille haasteille."
            data-en="I am open to new opportunities, collaboration projects and interesting challenges."
          >
            Olen avoinna uusille mahdollisuuksille, yhteistyöprojekteille ja mielenkiintoisille
            haasteille.
          </p>
          <div className="contact-links">
            <a href="mailto:jesper.karna24@gmail.com" className="contact-link">
              ✉ jesper.karna24@gmail.com
            </a>
            <a href="tel:0451025757" className="contact-link">
              ☎ 045 102 5757
            </a>
            <a href="https://github.com/JesperK25" target="_blank" className="contact-link">
              ↗ GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/jesper-kärnä-240b3a3a7"
              target="_blank"
              className="contact-link"
            >
              in LinkedIn
            </a>
          </div>
        </div>
      </section>

      <footer>
        <span>Jesper Kärnä © 2026</span>
        <span data-fi="Rakennettu Next.js:llä" data-en="Built with Next.js">
          Rakennettu Next.js:llä
        </span>
      </footer>
    </>
  )
}