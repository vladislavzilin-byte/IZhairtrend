import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
type Props = { label: string, to: string, delay?: number }
export default function GlassButton({ label, to, delay = 0 }: Props) {
  const nav = useNavigate()
  const [flying, setFlying] = React.useState(false)
  return (
    <motion.button
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      onClick={() => { setFlying(true); setTimeout(()=>nav(to), 420) }}
      className='relative w-56 h-14 rounded-2xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-xl text-white font-medium tracking-wide'
      style={{ WebkitBackdropFilter: 'blur(20px)' as any }}
    >
      <span className='absolute inset-0 bg-gradient-to-br from-white/15 to-white/5' />
      <span className='absolute -inset-[1px] rounded-2xl ring-1 ring-white/20' />
      <motion.span className='relative z-10' animate={flying?{ x: 600, opacity: 0.3, rotate: -8 }:{ x:0, opacity:1, rotate:0 }} transition={{ type: 'spring', stiffness: 120, damping: 16 }}>{label}</motion.span>
      <motion.span className='absolute left-[-20%] top-0 bottom-0 w-[40%] bg-white/20 skew-x-12' animate={{ x: ['-20%','160%'] }} transition={{ duration: 2.8, repeat: Infinity, ease: 'linear' }} />
    </motion.button>
  )
}
