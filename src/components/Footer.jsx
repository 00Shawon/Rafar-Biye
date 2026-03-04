'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  return (
    <footer className="bg-graphite text-bone pt-20 pb-10 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-clay/30 to-transparent" />
      
      <div className="container mx-auto px-6" data-cursor-text="Contact">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="flex flex-col items-center text-center"
        >
          <motion.h2 
            variants={itemVariants}
            className="font-display text-4xl md:text-5xl lg:text-6xl mb-6 text-saffron"
          >
            Get in Touch
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="font-body text-clay/80 max-w-lg mb-12 text-lg leading-relaxed"
          >
            We would love to hear from you. For any inquiries or just to send your blessings, please reach out.
          </motion.p>

          <div className="flex flex-col md:flex-row gap-8 md:gap-16 mb-20">
            {/* Email */}
            <motion.a
              variants={itemVariants}
              href="mailto:mehedishawon121@gmail.com"
              className="group flex flex-col items-center gap-4 p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-clay/30 transition-all duration-300 w-64"
              data-cursor-text="Email Us"
            >
              <div className="w-12 h-12 rounded-full bg-deep-wine/20 flex items-center justify-center text-saffron group-hover:scale-110 transition-transform duration-300">
                <Mail size={24} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-display text-lg text-clay">Email</span>
                <span className="font-body text-sm text-bone/90 break-all">mehedishawon121@gmail.com</span>
              </div>
            </motion.a>

            {/* WhatsApp */}
            <motion.a
              variants={itemVariants}
              href="https://wa.me/8801954638110"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-4 p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-clay/30 transition-all duration-300 w-64"
              data-cursor-text="Chat on WhatsApp"
            >
              <div className="w-12 h-12 rounded-full bg-deep-wine/20 flex items-center justify-center text-saffron group-hover:scale-110 transition-transform duration-300">
                <Phone size={24} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-display text-lg text-clay">WhatsApp</span>
                <span className="font-body text-sm text-bone/90 tracking-wide">+88 01954638110</span>
              </div>
            </motion.a>
          </div>

          <motion.div 
            variants={itemVariants}
            className="w-full max-w-4xl h-px bg-white/10 mb-8"
          />

          <motion.div 
            variants={itemVariants}
            className="flex flex-col md:flex-row justify-between items-center w-full max-w-4xl gap-4 font-body text-sm text-clay/60"
          >
            <p>&copy; {currentYear} Rafa & Shawon. All rights reserved.</p>
            <p className="flex items-center gap-2">
              Made with <Heart size={14} className="text-deep-wine fill-deep-wine animate-pulse" /> for our special day
            </p>
          </motion.div>

        </motion.div>
      </div>
    </footer>
  )
}
