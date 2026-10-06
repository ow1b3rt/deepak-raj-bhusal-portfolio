'use client';

import { SafeImage } from '@/components/ui/safe-image';
import { motion } from 'motion/react';

export function PhotoStat({ photo, topContent, bottomContent }) {
  return (
    <div className='grid h-[80vh] gap-4 grid-cols-[3fr_1fr] grid-rows-[4fr_1fr]'>
      <motion.div
        className='relative overflow-hidden rounded-4xl'
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <SafeImage
        src={photo}
        alt='Photo'
        fill
        className='object-cover w-full h-full'
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className='bg-black rounded-4xl h-1/2'
      >
        {topContent}
      </motion.div>

      <div className='col-start-2 row-start-2 relative flex items-center justify-center'>
        <motion.div
          initial={{ opacity: 0, y: 20, x: 20 }}
          whileInView={{ opacity: 1, y: 0, x: 0 }}
          viewport={{ once: false, margin: '-100px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className='absolute bottom-0 z-10 h-[300%] w-[200%] right-0 red-gradient rounded-4xl'
        >
          {bottomContent}
        </motion.div>
      </div>
    </div>
  );
}

