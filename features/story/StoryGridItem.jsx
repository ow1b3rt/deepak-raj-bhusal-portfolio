"use client"
import { Paragraph } from '@/components/ui/paragraph';
import { motion } from "motion/react"

const storyText = `Deepak Raj Bhusal is a passionate professional, leader, and entrepreneur committed to creating meaningful opportunities and positive impact. Through his professional journey, he has worked across education, business, leadership, and community initiatives.\n

With a strong belief in collaboration and continuous growth, Deepak focuses on connecting people, developing ideas, and turning opportunities into meaningful outcomes. His journey reflects a commitment to excellence, innovation, and purposeful leadership. A passionate professional committed to leadership, innovation, and meaningful contributions to society. Driven by a desire to create positive change, he believes in continuous learning, meaningful collaboration, and turning ideas into opportunities that create lasting value.`;

export function StoryGridItem({ gridArea }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`bg-black text-white p-6 ${gridArea}`}
    >
      <h2 className="text-6xl font-extrabold mb-6">Short Story</h2>
      <Paragraph text={storyText} />
    </motion.div>
  );
}
