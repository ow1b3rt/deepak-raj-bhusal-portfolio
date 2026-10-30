"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ForeignTripsCard } from "./ForeignTripsCard";
import { foreignTripsData } from "./foreignTrips.data";

const gridClassname = `
  grid
  w-full
  gap-3
  sm:gap-4
  lg:gap-5
  grid-cols-1
  [grid-template-areas:'area1'_'area2'_'area3'_'area4'_'area5'_'area6'_'area7']
  sm:grid-cols-2
  sm:[grid-template-areas:'area1_area2'_'area1_area3'_'area4_area5'_'area6_area5'_'area7_area7']
  md:grid-cols-3
  md:grid-rows-3
  md:h-[660px]
  lg:h-[760px]
  xl:h-[820px]
  md:[grid-template-areas:'area1_area2_area3'_'area1_area4_area5'_'area6_area7_area5']
  foreign-trips-grid-areas
`;

const gridClassname4 = `
  grid
  w-full
  gap-3
  sm:gap-4
  lg:gap-5
  grid-cols-1
  sm:grid-cols-2
  md:grid-cols-2
  md:grid-rows-2
  md:h-[660px]
  lg:h-[760px]
  xl:h-[820px]
`;

export function ForeignTrips({ data = foreignTripsData }) {
  const { titleMain, titleHighlight } = data;
  const slides =
    data.slides && data.slides.length > 0
      ? data.slides
      : [{ id: "slide-1", items: data.items || [] }];

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const totalSlides = slides.length;
  const currentSlide = slides[currentSlideIndex] || slides[0];

  const handlePrev = () => {
    setDirection(-1);
    setCurrentSlideIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentSlideIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const variants = {
    enter: (dir) => ({
      opacity: 0,
      x: dir > 0 ? 30 : -30,
    }),
    center: {
      opacity: 1,
      x: 0,
    },
    exit: (dir) => ({
      opacity: 0,
      x: dir > 0 ? -30 : 30,
    }),
  };

  return (
    <section className="w-full flex flex-col items-center">
      <style>{`
        @media (min-width: 768px) {
          .foreign-trips-grid-areas {
            grid-template-areas:
              "area1 area2 area3"
              "area1 area4 area5"
              "area6 area7 area5" !important;
          }
        }
      `}</style>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center justify-center text-center mb-8 md:mb-12"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-neutral-900 dark:text-neutral-100">
          {titleMain}
        </h2>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-primary mt-1">
          {titleHighlight}
        </h2>
      </motion.div>

      {/* Grid with slide transition */}
      <div className="w-full overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide.id || currentSlideIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={currentSlide.items.length <= 4 ? gridClassname4 : gridClassname}
          >
            {currentSlide.items.map((item, index) => (
              <ForeignTripsCard
                key={`${currentSlideIndex}-${item.id}`}
                item={item}
                index={index}
                className={item.area ? `[grid-area:${item.area}]` : ""}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation Buttons & Slide Indicators */}
      <div className="flex items-center justify-center gap-4 mt-6 sm:mt-8">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous trip slide"
          className="size-9 sm:size-10 rounded-full border border-primary/40 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
        >
          <ArrowLeft className="size-4 stroke-[2]" />
        </button>

        {/* Slide Indicator Dots */}
        {totalSlides > 1 && (
          <div className="flex items-center gap-1.5 px-2">
            {slides.map((slide, idx) => (
              <button
                key={slide.id || idx}
                type="button"
                onClick={() => {
                  setDirection(idx > currentSlideIndex ? 1 : -1);
                  setCurrentSlideIndex(idx);
                }}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentSlideIndex
                    ? "w-6 h-2 bg-primary"
                    : "w-2 h-2 bg-neutral-300 dark:bg-neutral-700 hover:bg-primary/50"
                }`}
              />
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next trip slide"
          className="size-9 sm:size-10 rounded-full border border-primary/40 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
        >
          <ArrowRight className="size-4 stroke-[2]" />
        </button>
      </div>
    </section>
  );
}
