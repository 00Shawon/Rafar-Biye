'use client'

import { useState, useMemo, useEffect } from 'react'
import Image from 'next/image'
import { getAllGalleryImages } from '@/lib/getData'
import { motion, AnimatePresence } from 'framer-motion'

const categories = [
  { id: 'all', label: 'All Moments', labelUrdu: 'تمام لمحات' },
  { id: 'wedding', label: 'Wedding', labelUrdu: 'شادی' },
  { id: 'holud', label: 'Holud', labelUrdu: 'ہلدی' },
  { id: 'akth', label: 'Akth', labelUrdu: 'اکھ' },
  { id: 'portraits', label: 'Portraits', labelUrdu: 'تصاویر' },
  { id: 'relatives', label: 'Relatives', labelUrdu: 'رشتے دار' },
]

const ITEMS_PER_PAGE = 12

export default function CinematicGallery() {
  const allImages = getAllGalleryImages()
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState(null)
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)

  // Reset visible count when category changes
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE)
  }, [activeCategory])

  const filteredImages = useMemo(() => {
    const filtered = activeCategory === 'all' 
      ? allImages 
      : allImages.filter(img => img.category === activeCategory)
    return filtered
  }, [activeCategory, allImages])

  const displayedImages = useMemo(() => {
    return filteredImages.slice(0, visibleCount)
  }, [filteredImages, visibleCount])

  const hasMore = visibleCount < filteredImages.length

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + ITEMS_PER_PAGE)
  }

  return (
    <section className="py-32 bg-[#FCFCFB]">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#2B2B2B] tracking-tight mb-4">
            Captured Moments
          </h2>
          <p className="font-arabic text-3xl text-[#2B2B2B]/70 direction-rtl">
            یادگار لمحات
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`group relative px-6 py-3 transition-colors duration-300 ${
                activeCategory === cat.id
                  ? 'text-[#2B2B2B]'
                  : 'text-[#2B2B2B]/50 hover:text-[#2B2B2B]/80'
              }`}
            >
              <span className="font-body text-sm uppercase tracking-wide block mb-1">
                {cat.label}
              </span>
              <span className="font-arabic text-xs block direction-rtl">
                {cat.labelUrdu}
              </span>
              
              <div
                className={`absolute bottom-0 left-0 h-[2px] bg-[#A67C52] transition-all duration-300 ${
                  activeCategory === cat.id ? 'w-full' : 'w-0'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {displayedImages.map((img) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={img.id}
                className="break-inside-avoid mb-6 cursor-pointer overflow-hidden rounded-lg group relative"
                data-cursor="view"
                onClick={() => setSelectedImage(img)}
              >
                <div className="relative overflow-hidden film-grain">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={img.width}
                      height={img.height}
                      className="w-full h-auto object-cover"
                      quality={85}
                    />
                  </motion.div>
                  
                  {/* Gradient overlay on hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"
                  />

                  {/* Category label reveal */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="absolute bottom-0 left-0 right-0 p-6 z-10"
                  >
                    <p className="font-body text-[10px] text-white uppercase tracking-[0.2em]">
                      {img.category}
                    </p>
                    {img.caption && (
                      <p className="font-body text-xs text-white/70 mt-1">
                        {img.caption}
                      </p>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-20 text-center">
            <button
              onClick={handleLoadMore}
              className="group relative inline-flex items-center gap-4 px-12 py-5 border border-[#2B2B2B]/10 hover:border-[#2B2B2B] transition-colors duration-500 overflow-hidden"
            >
              <span className="relative z-10 font-body text-xs uppercase tracking-[0.3em] text-[#2B2B2B] group-hover:text-white transition-colors duration-500">
                Load More Moments
              </span>
              <div className="absolute inset-0 bg-[#2B2B2B] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            </button>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-[#1A1A1A]/97 flex items-center justify-center p-6"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/80 hover:text-white text-5xl font-light z-10 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>

          <div
            className="relative max-w-7xl max-h-[90vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              fill
              quality={95}
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  )
}
