"use client"
import { motion } from "motion/react"

export function PhotoGridItem({ gridArea, url }) {
  const bgImage = url ? `url(${url})` : 'none';
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`flex bg-gray-200  ${gridArea}`} 
      style={{ backgroundImage: bgImage, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className='flex-1 overflow-hidden flex'>
        <div className='flex-1 rounded-br-xl shadow-[0_0_0_9999px_white]' />
      </div>
      <div className='flex-4 flex flex-col' >
        <div className='flex-9 -mb-4 z-10 overflow-hidden flex'>
          <div className='flex-1 rounded-br-xl shadow-[0_0_0_9999px_white]' />
        </div>
        <div className='flex-2' />
      </div>
    </motion.div>
  );
}


