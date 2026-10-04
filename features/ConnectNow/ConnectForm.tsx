"use client"

import React, { useState } from "react"
import { ArrowRight, Loader2 } from "lucide-react"
import { motion } from "motion/react"

import { cn } from "cn"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// ─── Types ───────────────────────────────────────────────────────────────────

export type FieldType = "text" | "email" | "tel" | "radio" | "textarea"

export interface FormOption {
  label: string
  value: string
}

export interface FieldConfig {
  name: string
  label: string
  type: FieldType
  placeholder?: string
  options?: FormOption[]
  required?: boolean
  colSpan?: "half" | "full"
}

export interface SectionConfig {
  id: string
  title: string
  fields: FieldConfig[]
  gridCols?: boolean // true = 2-col grid for text fields
}

export interface ConnectFormProps {
  sections: SectionConfig[]
  onSubmit: (data: Record<string, string>) => void | Promise<void>
  submitButtonText?: string
  loading?: boolean
}

// ─── Radio Option ─────────────────────────────────────────────────────────────

function RadioOption({
  name,
  option,
  checked,
  onChange,
}: {
  name: string
  option: FormOption
  checked: boolean
  onChange: () => void
}) {
  return (
    <label className="group flex w-fit cursor-pointer items-center gap-3">
      <input
        type="radio"
        name={name}
        value={option.value}
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      <div className="border-muted-foreground/30 h-6 w-6 rounded-full border-2 transition-all duration-200 peer-checked:border-[7px] peer-checked:border-primary" />
      <span className="text-foreground text-sm font-medium sm:text-base">{option.label}</span>
    </label>
  )
}

// ─── Animated Section ─────────────────────────────────────────────────────────

function AnimatedSection({
  children,
  delay = 0,
}: {
  children: React.ReactNode
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function ConnectForm({
  sections,
  onSubmit,
  submitButtonText = "Send Message",
  loading = false,
}: ConnectFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({})

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-0">
      {sections.map((section, sectionIndex) => (
        <AnimatedSection key={section.id} delay={sectionIndex * 0.08}>
          <section
            className={cn(
              "py-8",
              sectionIndex > 0 && "border-border border-t"
            )}
          >
            <h2 className="text-foreground mb-6 text-xl font-bold sm:text-[21px]">
              {section.title}
            </h2>

            <div
              className={cn(
                section.gridCols
                  ? "grid grid-cols-1 gap-x-16 gap-y-5 md:grid-cols-2 lg:gap-x-24"
                  : "space-y-4"
              )}
            >
              {section.fields.map((field) => {
                if (field.type === "radio") {
                  return (
                    <div
                      key={field.name}
                      className={cn(
                        "space-y-4",
                        section.gridCols && field.colSpan === "full" && "md:col-span-2"
                      )}
                    >
                      {field.options?.map((option) => (
                        <RadioOption
                          key={option.value}
                          name={field.name}
                          option={option}
                          checked={formData[field.name] === option.value}
                          onChange={() => handleChange(field.name, option.value)}
                        />
                      ))}
                    </div>
                  )
                }

                if (field.type === "textarea") {
                  return (
                    <div
                      key={field.name}
                      className={cn(
                        "space-y-2",
                        section.gridCols && field.colSpan === "full" && "md:col-span-2"
                      )}
                    >
                      <Textarea
                        id={field.name}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name] || ""}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        required={field.required}
                        className="min-h-[200px] w-full resize-none rounded-lg px-4 py-3 text-sm sm:text-base"
                      />
                    </div>
                  )
                }

                return (
                  <div
                    key={field.name}
                    className={cn(
                      "space-y-2",
                      section.gridCols && field.colSpan === "full" && "md:col-span-2"
                    )}
                  >
                    <Label htmlFor={field.name} className="text-sm font-semibold sm:text-base">
                      {field.label}
                    </Label>
                    <Input
                      id={field.name}
                      type={field.type}
                      name={field.name}
                      autoComplete="off"
                      placeholder={field.placeholder}
                      value={formData[field.name] || ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      required={field.required}
                      className="h-12 w-full rounded-md px-4 text-sm sm:h-14 sm:text-base"
                    />
                  </div>
                )
              })}
            </div>
          </section>
        </AnimatedSection>
      ))}

      {/* Submit */}
      <AnimatedSection delay={sections.length * 0.08}>
        <div className="border-border border-t pt-6 flex justify-end">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
            <Button
              type="submit"
              disabled={loading}
              className="bg-primary hover:bg-primary/90 h-11 min-w-[160px] cursor-pointer rounded-lg px-6 text-sm font-semibold text-primary-foreground shadow-md transition-colors disabled:cursor-not-allowed disabled:opacity-60 sm:h-12 sm:text-base"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin" />
                  Submitting...
                </span>
              ) : (
                <>
                  {submitButtonText}
                  <ArrowRight className="ml-2 size-4" />
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </AnimatedSection>
    </form>
  )
}
