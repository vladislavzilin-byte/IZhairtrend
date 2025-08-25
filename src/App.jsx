import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Routes, Route, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion'

const LOGO_SRC = '/iz-logo.svg'
const HERO_SRC = '/iz-hero.png'

const dict = {
  lt: {
    tag: 'Futuristinė plaukų formavimo sistema',
    buttons: ['Portfelis', 'Parduotuvė', 'Mokymai', 'Kontaktai'],
    back: 'Atgal',
    hero: 'IZ HAIR TREND',
    shopBlurb: 'Atraskite profesionalias priemones ir aksesuarus.',
    eduBlurb: 'Meistriškumo pamokos ir sertifikatai.',
    contactsBlurb: 'Rezervuokite laiką ir susisiekite.',
    portfolioBlurb: 'Darbo galerija ir istorijos.',
  },
  en: {
    tag: 'Futuristic hairstyling system',
    buttons: ['Portfolio', 'Shop', 'Education', 'Contacts'],
    back: 'Back',
    hero: 'IZ HAIR TREND',
    shopBlurb: 'Discover pro tools and accessories.',
    eduBlurb: 'Masterclasses and certifications.',
    contactsBlurb: 'Book an appointment and get in touch.',
    portfolioBlurb: 'Work gallery and stories.',
  },
  ru: {
    tag: 'Футуристическая система укладок',
    buttons: ['Портфолио', 'Магазин', 'Обучение', 'Контакты'],
    back: 'Назад',
    hero: 'IZ HAIR TREND',
    shopBlurb: 'Профессиональные средства и аксессуары.',
    eduBlurb: 'Мастер‑классы и сертификаты.',
    contactsBlurb: 'Запись и связь с нами.',
    portfolioBlurb: 'Галерея работ и истории.',
  },
}

function Starfield() {
  const ref = useRef(null)
  const [dpr, setDpr] = useState(1)
  const mouse = useRef({ x: 0, y: 0 })
  const scroll = useRef(0)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf

    const resize = () => {
      const { innerWidth: w, innerHeight: h, devicePixelRatio } = window
      const ndpr = Math.min(2, devicePixelRatio || 1)
      setDpr(ndpr)
      canvas.width = w * ndpr
      canvas.height = h * ndpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
    }
    resize()
    window.addEventListener('resize', resize)

    const stars = Array.from({ length: 600 }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: Math.random(),
      s: Math.random() * 0.8 + 0.2,
      tw: Math.random() * Math.PI * 2,
    }))

    const draw = () => {
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      const g = ctx.createRadialGradient(w * 0.7, h * 0.3, 0, w * 0.7, h * 0.3, Math.max(w, h))
      g.addColorStop(0, 'rgba(168,132,255,0.10)')
      g.addColorStop(0.5, 'rgba(87,192,255,0.06)')
      g.addColorStop(1, 'rgba(0,0,0,0.0)')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, w, h)

      for (let i = 0; i < stars.length; i++) {
        const st = stars[i]
        st.tw += 0.02
        const px = (st.x - 0.5) * (1 + st.z * 2) * w + (mouse.current.x - 0.5) * 40 * (1 - st.z)
        const py = (st.y - 0.5) * (1 + st.z * 2) * h + (mouse.current.y - 0.5) * 40 * (1 - st.z) + scroll.current * st.z * 0.3
        const size = st.s * (1 + Math.sin(st.tw) * 0.2) * dpr
        ctx.globalAlpha = 0.6 + Math.sin(st.tw) * 0.3
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(px + w * 0.5, py + h * 0.5, size, size)
      }
      raf = requestAnimationFrame(draw)
    }

    const onMove = (e) => {
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight
      mouse.current = { x, y }
    }
    const onScroll = () => {
      scroll.current = window.scrollY
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('scroll', onScroll)

    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [dpr])

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 -z-50 bg-black [mask-image:radial-gradient(ellipse_at_center,rgba(255,255,255,1),rgba(255,255,255,0.6)_60%,transparent_100%)]"
    />
  )
}

function Intro({ onDone }) {
  const [show, setShow] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 2200)
    const t2 = setTimeout(() => onDone && onDone(), 2600)
    return () => { clearTimeout(t); clearTimeout(t2) }
  }, [onDone])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
        >
          <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', duration: 1.2 }} className="relative">
            <div className="w-[140px] h-[140px] rounded-full bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center shadow-[0_0_120px_rgba(167,139,250,0.45)]">
              <img src={LOGO_SRC} alt="IZ" className="w-16 h-16 object-contain" onError={(e)=>{e.currentTarget.style.display='none'}}/>
              <span className="absolute text-white/90 font-semibold tracking-widest" style={{display:'none'}}>IZ</span>
            </div>
            <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
              <motion.div
                className="absolute left-0 right-0 h-14 bg-gradient-to-b from-white/60 via-white/0 to-transparent"
                initial={{ y: -120, opacity: 0.8 }}
                animate={{ y: 140 }}
                transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function LangSwitch({ lang, setLang }) {
  const items = [{ code: 'lt', label: 'LT' }, { code: 'en', label: 'EN' }, { code: 'ru', label: 'RU' }]
  return (
    <div className="fixed right-4 top-4 z-50 flex gap-2">
      {items.map(it => (
        <button
          key={it.code}
          onClick={() => setLang(it.code)}
          className={
            `px-3 py-1 rounded-full border backdrop-blur-md text-sm transition-all ${
              lang === it.code ? 'border-white/40 bg-white/10 text-white' : 'border-white/10 bg-white/5 text-white/70 hover:text-white'
            }`
          }
        >
          {it.label}
        </button>
      ))}
    </div>
  )
}

function PolymerButton({ label, to, idx }) {
  const navigate = useNavigate()
  const [flying, setFlying] = useState(false)
  const click = () => {
    setFlying(true)
    setTimeout(() => navigate(to), 550)
  }
  return (
    <motion.button
      onClick={click}
      disabled={flying}
      className="group relative w-56 h-16 rounded-2xl border border-white/30 bg-white/10 backdrop-blur-xl text-white/90 font-medium tracking-wide overflow-hidden shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2),0_8px_40px_rgba(146,112,255,0.25)]"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      animate={flying ? { x: 620, rotate: -8, opacity: 0 } : { x: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 240, damping: 20 }}
      style={{ transformOrigin: 'center right' }}
    >
      <span className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/5 to-white/0 opacity-40" />
      <span className="absolute -left-10 top-0 h-[150%] w-10 rotate-12 bg-white/40 blur-md opacity-0 group-hover:opacity-60 transition-opacity" />
      <span className="relative z-10">{label}</span>
      <span className="pointer-events-none absolute -bottom-3 right-4 size-12 rounded-full bg-white/20 blur-2"></span>
      <span className="pointer-events-none absolute -top-2 left-4 size-6 rounded-full bg-white/10 blur"></span>
    </motion.button>
  )
}

function HoloPortrait() {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rx = useTransform(y, [-0.5, 0.5], [12, -12])
  const ry = useTransform(x, [-0.5, 0.5], [-18, 18])
  const srx = useSpring(rx, { stiffness: 120, damping: 12 })
  const sry = useSpring(ry, { stiffness: 120, damping: 12 })

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    x.set(px)
    y.set(py)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d' }}
      className="relative w-[320px] h-[520px] rounded-[28px] border border-white/15 bg-white/[0.02] backdrop-blur-xl overflow-hidden shadow-[0_10px_120px_rgba(146,112,255,0.25)]"
    >
      <img src={HERO_SRC} alt="IZ portrait" className="absolute inset-0 w-full h-full object-cover"/>
      <div className="absolute inset-0 pointer-events-none mix-blend-screen">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-300/20 via-cyan-200/10 to-transparent" />
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-30" style={{ backgroundImage: 'repeating-linear-gradient(transparent,transparent 2px,rgba(255,255,255,0.12) 3px,transparent 4px)' }} />
      <motion.div className="absolute left-4 bottom-3 text-white/80 text-xs tracking-widest" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        IZ HAIR TREND
      </motion.div>
    </motion.div>
  )
}

function Home({ lang }) {
  const labels = dict[lang].buttons
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const glow = useTransform(scrollYProgress, [0, 1], [0.2, 0.6])

  return (
    <div className="min-h-[200vh] w-full text-white">
      <Starfield />

      <div className="pt-20 flex flex-col items-center gap-3 select-none">
        <div className="flex items-center gap-3">
          <img src={LOGO_SRC} alt="logo" className="w-10 h-10 object-contain" onError={(e)=>{e.currentTarget.style.display='none'}}/>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-[0.35em]">{dict[lang].hero}</h1>
        </div>
        <motion.p style={{ filter: glow.to(v=>`drop-shadow(0 0 20px rgba(167,139,250,${v}))`) }} className="text-white/70 text-sm md:text-base">
          {dict[lang].tag}
        </motion.p>
      </div>

      <div className="relative mx-auto mt-10 md:mt-16 w-full max-w-6xl flex flex-col items-center">
        <motion.div style={{ scale }} className="absolute -z-10 top-24 h-[560px] w-[560px] rounded-full bg-gradient-to-tr from-indigo-500/10 via-fuchsia-400/10 to-cyan-400/10 blur-3xl"/>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-8 md:gap-12">
          <div className="flex flex-col gap-4 items-end order-2 md:order-1">
            <PolymerButton label={labels[0]} to="/portfolio" idx={0} />
            <PolymerButton label={labels[1]} to="/shop" idx={1} />
          </div>
          <div className="order-1 md:order-2">
            <HoloPortrait />
          </div>
          <div className="flex flex-col gap-4 items-start order-3">
            <PolymerButton label={labels[2]} to="/education" idx={2} />
            <PolymerButton label={labels[3]} to="/contacts" idx={3} />
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-2 text-white/60">
          <div className="text-xs tracking-widest">SCROLL</div>
          <motion.div className="w-0.5 h-16 bg-white/30" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ repeat: Infinity, repeatType: 'reverse', duration: 1.3 }} />
        </div>
      </div>

      <section className="mt-28 md:mt-40 px-6 md:px-10">
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <FrostCard title={dict[lang].buttons[0]} desc={dict[lang].portfolioBlurb} href="/portfolio"/>
          <FrostCard title={dict[lang].buttons[1]} desc={dict[lang].shopBlurb} href="/shop"/>
          <FrostCard title={dict[lang].buttons[2]} desc={dict[lang].eduBlurb} href="/education"/>
        </div>
      </section>
    </div>
  )
}

function FrostCard({ title, desc, href }) {
  return (
    <Link to={href} className="group block">
      <motion.div whileHover={{ y: -6 }} className="relative rounded-3xl border border-white/15 bg-white/[0.04] backdrop-blur-xl p-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <h3 className="text-lg font-medium text-white">{title}</h3>
        <p className="mt-2 text-white/70 text-sm">{desc}</p>
      </motion.div>
    </Link>
  )
}

function PageFrame({ lang, title, children }) {
  return (
    <div className="min-h-screen text-white relative">
      <Starfield />
      <header className="fixed top-0 inset-x-0 z-40 flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 text-white/90 hover:text-white">
          <img src={LOGO_SRC} alt="logo" className="w-6 h-6 object-contain" onError={(e)=>{e.currentTarget.style.display='none'}}/>
          <span className="font-semibold tracking-widest">IZ HAIR TREND</span>
        </Link>
        <BackButton label={dict[lang].back} />
      </header>
      <main className="pt-24 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-semibold mb-6 tracking-wide drop-shadow-[0_0_30px_rgba(167,139,250,0.5)]">{title}</h1>
          {children}
        </div>
      </main>
    </div>
  )
}

function BackButton({ label }) {
  const nav = useNavigate()
  return (
    <button onClick={() => nav(-1)} className="px-3 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur text-sm text-white/80 hover:text-white">
      {label}
    </button>
  )
}

function PortfolioPage({ lang }) {
  return (
    <PageFrame lang={lang} title={dict[lang].buttons[0]}>
      <Gallery />
    </PageFrame>
  )
}

function Gallery() {
  const imgs = Array.from({ length: 12 }, (_, i) => `https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=60&sig=${i}`)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {imgs.map((src, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }} className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <img src={src} alt="work" className="w-full h-64 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </motion.div>
      ))}
    </div>
  )
}

function ShopPage({ lang }) {
  const items = Array.from({ length: 8 }, (_, i) => ({ title: `Pro Tool ${i + 1}`, price: (29 + i * 5) + '€', img: `https://images.unsplash.com/photo-1556228453-efd1f2ea2cfe?auto=format&fit=crop&w=900&q=60&sig=${i}` }))
  return (
    <PageFrame lang={lang} title={dict[lang].buttons[1]}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((it, idx) => (
          <motion.div key={idx} whileHover={{ y: -6 }} className="rounded-3xl overflow-hidden border border-white/15 bg-white/[0.04] backdrop-blur-xl">
            <img src={it.img} alt="item" className="w-full h-44 object-cover" />
            <div className="p-4">
              <div className="font-medium">{it.title}</div>
              <div className="text-white/70">{it.price}</div>
              <button className="mt-3 px-3 py-1.5 rounded-full border border-white/20 bg-white/10 text-sm">Add to cart</button>
            </div>
          </motion.div>
        ))}
      </div>
    </PageFrame>
  )
}

function EducationPage({ lang }) {
  const blocks = [
    { t: 'Cut & Style Masterclass', d: '8h intensive, model included' },
    { t: 'Color & Shine', d: 'Balayage, toning, aftercare' },
    { t: 'Bridal Perfection', d: 'Long‑lasting updos & accessories' },
  ]
  return (
    <PageFrame lang={lang} title={dict[lang].buttons[2]}>
      <div className="grid md:grid-cols-3 gap-6">
        {blocks.map((b, i) => (
          <motion.div key={i} whileHover={{ y: -6 }} className="rounded-3xl p-6 border border-white/15 bg-white/[0.04] backdrop-blur-xl">
            <div className="text-lg font-medium">{b.t}</div>
            <div className="text-white/70 mt-2">{b.d}</div>
            <button className="mt-4 px-3 py-1.5 rounded-full border border-white/20 bg-white/10 text-sm">Enroll</button>
          </motion.div>
        ))}
      </div>
    </PageFrame>
  )
}

function ContactsPage({ lang }) {
  return (
    <PageFrame lang={lang} title={dict[lang].buttons[3]}>
      <div className="grid md:grid-cols-2 gap-8">
        <form className="rounded-3xl p-6 border border-white/15 bg-white/[0.04] backdrop-blur-xl">
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="Name" className="col-span-2 md:col-span-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 outline-none"/>
            <input placeholder="Email" className="col-span-2 md:col-span-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 outline-none"/>
          </div>
          <input placeholder="Subject" className="mt-3 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 outline-none"/>
          <textarea placeholder="Message" rows={5} className="mt-3 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 outline-none"/>
          <button className="mt-4 px-4 py-2 rounded-xl border border-white/20 bg-white/10">Send</button>
        </form>
        <div className="rounded-3xl p-6 border border-white/15 bg-white/[0.04] backdrop-blur-xl space-y-3">
          <div className="text-white/80">Klaipėda, Lithuania</div>
          <div className="text-white/80">+370 ••• •• •••</div>
          <div className="text-white/80">@irinazilina.hairtrend</div>
          <div className="h-64 rounded-2xl bg-gradient-to-tr from-indigo-400/20 via-fuchsia-300/10 to-cyan-300/10 flex items-center justify-center text-white/50">
            Map placeholder
          </div>
        </div>
      </div>
    </PageFrame>
  )
}

export default function App() {
  const [lang, setLang] = React.useState('ru')
  return (
    <div>
      <Intro onDone={() => {}} />
      <LangSwitch lang={lang} setLang={setLang} />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home lang={lang} />} />
          <Route path="/portfolio" element={<PortfolioPage lang={lang} />} />
          <Route path="/shop" element={<ShopPage lang={lang} />} />
          <Route path="/education" element={<EducationPage lang={lang} />} />
          <Route path="/contacts" element={<ContactsPage lang={lang} />} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}
