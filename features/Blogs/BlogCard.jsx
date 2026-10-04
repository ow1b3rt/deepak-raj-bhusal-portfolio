'use client'
import { SafeImage } from "@/components/ui/safe-image";
import { MoreButton } from "@/components/shared/MoreButton";
import { resolveUrl, stripHtml } from "@/lib/utils";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export function BlogCard({ blog }) {
  if (!blog) {
    return null;
  }

  const mediaUrl = resolveUrl(blog.media?.url)


  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className='flex flex-col md:flex-row gap-4 md:gap-10'
    >
      <div className='relative overflow-hidden rounded-4xl aspect-[4/3] w-full md:w-1/4'>
        <SafeImage 
          src={mediaUrl}
          alt={blog.media?.alt || blog.title}
          fill
          sizes='(max-width: 768px) 100vw, 25vw'
        />
      </div>

      <div className='flex flex-col gap-2 md:gap-4 flex-1'>
        <span className='text-xs md:text-base xl:text-lg text-gray-500'>{blog.author?.name}</span>
        <h2 className='text-base md:text-xl xl:text-2xl font-bold line-clamp-1'>{blog.title}</h2>
        <p className='text-sm md:text-lg xl:text-xl text-gray-600 line-clamp-2'>{stripHtml(blog.content)}</p>
        <MoreButton href={`/blogs/${blog.slug}`} content={
          <span className='font-bold'>Read More <ArrowUpRight className='inline-block ml-1 w-6 h-6' /></span>
        }/>
      </div>

    </motion.div>
  );
}
