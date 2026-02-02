'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

export default function LogoReveal() {
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  // Parallax and scale effects
  const logoY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])
  const logoScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])
  const logoRotate = useTransform(scrollYProgress, [0, 1], [0, 2])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section ref={containerRef} className="relative min-h-[50vh] overflow-hidden flex items-center justify-center">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-12 py-24">
        
        {/* Top Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.5, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="text-center mb-12"
        >
          <div className="font-body text-[9px] uppercase tracking-[0.8em] text-graphite">
            In the name of Allah
          </div>
        </motion.div>

        {/* Logo Container with Parallax */}
        <motion.div
          style={{ 
            y: logoY, 
            scale: logoScale,
            rotate: logoRotate,
            opacity 
          }}
          className="relative w-full aspect-square max-w-lg mx-auto"
        >
          {/* Animated Glow Effect */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.3 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute inset-0 bg-clay/20 rounded-full blur-[80px] animate-pulse"
          />

          {/* Logo Image */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(20px)", scale: 0.9 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: [0.19, 1, 0.22, 1] }}
            className="relative w-full h-full"
          >
            <Image
              src="/wedding-logo.png"
              alt="Shawon Weds Rafa - Wedding Logo"
              fill
              quality={95}
              sizes="(max-width: 768px) 90vw, 400px"
              className="object-contain "
              priority
            />
          </motion.div>

          {/* Decorative Corner Accents */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 0.2, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-clay"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 0.2, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1.1 }}
            className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-clay"
          />
        </motion.div>

        {/* Bottom Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 1.2 }}
          className="text-center mt-12 space-y-4"
        >
          <p className="font-body text-base md:text-lg text-graphite/70 italic leading-relaxed max-w-2xl mx-auto">
            "And He placed between you affection and mercy"
          </p>
          <p className="font-arabic text-lg md:text-xl text-clay/80 direction-rtl leading-relaxed">
            وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
          </p>
          <p className="font-body text-xs uppercase tracking-[0.4em] text-graphite/40 pt-4">
            Qur'an 30:21
          </p>
        </motion.div>

        {/* Decorative Bottom Element */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 96 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 1.5 }}
          className="h-[1px] bg-gradient-to-r from-transparent via-clay to-transparent mx-auto mt-16"
        />
      </div>
    </section>
  )
}
