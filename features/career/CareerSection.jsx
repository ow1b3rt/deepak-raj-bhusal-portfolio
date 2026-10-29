"use client"

import React, { useState } from "react"
import { motion } from "motion/react"
import { CareerCard } from "./CareerCard"
import { JobApplicationForm } from "./JobApplicationForm"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Pagenav } from "@/components/molecules/Pagenav"

export function CareerSection({ jobs = [], openPositions = [], pagination = {} }) {
  const [selectedJob, setSelectedJob] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const { page = 1, totalPages = 1 } = pagination

  const handleApply = (job) => {
    setSelectedJob(job)
    setModalOpen(true)
  }

  const positions =
    openPositions.length > 0
      ? openPositions
      : jobs.map((j) => ({
          value: j.title,
          label: j.title,
          slug: j.slug,
          id: j.id,
        }))

  React.useEffect(() => {
    if (modalOpen) {
      window.lenis?.stop()
    } else {
      window.lenis?.start()
    }
    return () => {
      window.lenis?.start()
    }
  }, [modalOpen])

  return (
    <section className="relative w-full px-4 py-8 sm:px-6 md:py-14 lg:px-8">
      {/* ── Section Title & Subtitle ── */}
      <div className="mx-auto max-w-4xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl font-black tracking-tight text-neutral-900 md:text-5xl lg:text-6xl dark:text-white"
        >
          Careers
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-2.5 text-sm font-semibold text-[#EA0614] sm:text-base md:mt-3 dark:text-red-500"
        >
          Have an idea, opportunity, or collaboration in mind? Let&apos;s start a conversation.
        </motion.p>
      </div>

      {/* ── Job Cards Stack ── */}
      <div className="mx-auto mt-10 max-w-5xl space-y-6 md:mt-14 md:space-y-8">
        {jobs.length > 0 ? (
          <>
            {jobs.map((job, index) => (
              <motion.div
                key={job.id || job.slug || index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <CareerCard job={job} onApply={handleApply} />
              </motion.div>
            ))}

            {/* ── Pagination & Back to Top ── */}
            <Pagenav
              page={page}
              totalPages={totalPages}
              basePath="/careers"
              className="pt-4"
            />
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-auto mt-8 max-w-md rounded-2xl border border-dashed border-neutral-200 p-12 text-center dark:border-neutral-700"
          >
            <p className="text-lg font-semibold text-neutral-700 dark:text-neutral-300">
              No open positions right now
            </p>
            <p className="mt-2 text-sm text-neutral-400">
              Check back soon — new opportunities are on the way.
            </p>
          </motion.div>
        )}
      </div>

      {/* ── Interactive Apply Modal ── */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent
          data-lenis-prevent
          className="flex max-h-[88vh] w-full max-w-3xl flex-col overflow-y-auto overscroll-contain rounded-3xl p-6 sm:p-8"
        >
          <DialogHeader className="border-b border-neutral-100 pb-4 text-left dark:border-neutral-800">
            <DialogTitle className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Apply for {selectedJob?.title || "Career Position"}
            </DialogTitle>
            <DialogDescription className="text-sm text-neutral-500 dark:text-neutral-400">
              Complete the information below and upload your CV/Resume to submit your application.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <JobApplicationForm
              defaultPosition={selectedJob?.title || ""}
              positions={positions}
              onSuccess={() => {
                setTimeout(() => setModalOpen(false), 2500)
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
