"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { toast } from "sonner"
import { ConnectForm, SectionConfig } from "./ConnectForm"

const easeOut = [0.22, 1, 0.36, 1] as const

const connectFormSections: SectionConfig[] = [
  {
    id: "personal",
    title: "Personal Information",
    gridCols: true,
    fields: [
      {
        name: "firstName",
        label: "First Name",
        type: "text",
        placeholder: "Enter your first name",
        required: true,
      },
      {
        name: "lastName",
        label: "Last Name",
        type: "text",
        placeholder: "Enter your last name",
        required: true,
      },
      {
        name: "email",
        label: "Email Address",
        type: "email",
        placeholder: "Enter your email address",
        required: true,
      },
      {
        name: "phone",
        label: "Phone Number",
        type: "tel",
        placeholder: "Enter your phone number",
        required: true,
      },
      {
        name: "company",
        label: "Company / Organization",
        type: "text",
        placeholder: "Enter company or organization name",
        colSpan: "full",
      },
    ],
  },
  {
    id: "interest",
    title: "I'm Interested In",
    gridCols: false,
    fields: [
      {
        name: "interest",
        label: "Interest",
        type: "radio",
        required: true,
        options: [
          { label: "Collaboration", value: "collaboration" },
          { label: "Business Inquiry", value: "business_inquiry" },
          {
            label: "Professional Opportunity",
            value: "professional_opportunity",
          },
          { label: "Speaking / Event", value: "speaking_event" },
          { label: "General Inquiry", value: "general_inquiry" },
        ],
      },
    ],
  },
  {
    id: "message",
    title: "Your Message",
    gridCols: false,
    fields: [
      {
        name: "message",
        label: "Message",
        type: "textarea",
        placeholder: "Write your message here...",
        required: true,
      },
    ],
  },
]

export function ConnectSection() {
  const [loading, setLoading] = useState(false)
  const [resetKey, setResetKey] = useState(0)

  const handleSubmit = async (data: Record<string, string>) => {
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API || "http://localhost:5000/api"}/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      )

      if (!response.ok) {
        throw new Error("Failed to submit")
      }

      toast.success("Message sent!", {
        description: "Thank you for reaching out. We'll be in touch soon.",
      })
      // Increment resetKey to trigger form clear in ConnectForm
      setResetKey((k) => k + 1)
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong", {
        description: "Your message couldn't be sent. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="connect"
      className="w-full bg-background px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="w-fual container mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl leading-tight font-bold text-foreground sm:text-5xl">
            Let&apos;s Connect
          </h1>
          <p className="mt-3 text-sm text-primary sm:text-base">
            Have an idea, opportunity, or collaboration in mind? Let&apos;s
            start a conversation.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: easeOut }}
        >
          <ConnectForm
            sections={connectFormSections}
            onSubmit={handleSubmit}
            submitButtonText="Send Message"
            loading={loading}
            resetKey={resetKey}
          />
        </motion.div>
      </div>
    </section>
  )
}
