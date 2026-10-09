"use client"
import { Paragraph } from '@/components/ui/paragraph';
import { motion } from "motion/react"

const storyText = `Starting from scratch, from a small village of Nepal, I have come a long way to become a successful businessman and a devoted social activist, who wants growth and integrity in both of the areas, for I have attained numerous trainings, attended many workshops and participated in several seminars in Nepal and overseas.\n
I have involved in numerous activities in social and political sector too. In addition to that, I have invested my physical and emotional energies to excel in whatever responsibilities I have been accorded with the larger authorities for social welfare and upliftment on ground. I am a hardworking, organized, and motivated person with a passion for politics, human rights and equality.\n
I am still striving to achieve a lot through participation and attendance.`;

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
