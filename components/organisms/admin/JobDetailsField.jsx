"use client"

import { useEffect, useRef, useState } from "react"
import { useResolvedDefault } from "@/packages/admin"

const SECTIONS = [
  { key: "responsibilities", label: "Responsibilities" },
  { key: "requirements", label: "Requirements" },
]

const itemClass =
  "w-full resize-none overflow-hidden rounded-sm border border-transparent bg-transparent px-2 py-1 text-sm text-gray-900 transition-colors hover:border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"

function BulletListEditor({ items = [""], onChange, placeholder }) {
  const refs = useRef([])
  const focusIndex = useRef(null)

  useEffect(() => {
    if (focusIndex.current !== null) {
      refs.current[focusIndex.current]?.focus()
      focusIndex.current = null
    }
  }, [items])

  const update = (i, val) =>
    onChange(items.map((it, idx) => (idx === i ? val : it)))

  const handleKeyDown = (e, i) => {
    if (e.nativeEvent?.isComposing) return

    if (e.key === "Enter") {
      e.preventDefault()
      const next = [...items]
      next.splice(i + 1, 0, "")
      focusIndex.current = i + 1
      onChange(next)
    } else if (e.key === "Backspace" && items[i] === "" && items.length > 1) {
      e.preventDefault()
      focusIndex.current = Math.max(i - 1, 0)
      onChange(items.filter((_, idx) => idx !== i))
    }
  }

  const handlePaste = (e, i) => {
    const text = e.clipboardData.getData("text")
    if (!text.includes("\n")) return
    e.preventDefault()
    const lines = text
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean)
    if (!lines.length) return
    const next = [...items]
    next.splice(items[i] === "" ? i : i + 1, items[i] === "" ? 1 : 0, ...lines)
    focusIndex.current = next.length - 1
    onChange(next)
  }

  return (
    <div className="flex flex-col gap-1.5">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-2">
          <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gray-400" />
          <textarea
            ref={(el) => (refs.current[i] = el)}
            rows={1}
            className={itemClass}
            value={item}
            placeholder={placeholder}
            onChange={(e) => update(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            onPaste={(e) => handlePaste(e, i)}
          />
        </div>
      ))}
    </div>
  )
}

export function JobDetailsField({ name = "details", caption = "Job Details" }) {
  const { defaultValue } = useResolvedDefault(name, {})
  const [details, setDetails] = useState(
    Object.fromEntries(SECTIONS.map(({ key }) => [key, [""]]))
  )
  const [resolved, setResolved] = useState(false)

  useEffect(() => {
    if (defaultValue && typeof defaultValue === "object") {
      setDetails(
        Object.fromEntries(
          SECTIONS.map(({ key }) => {
            const list = defaultValue[key]
            return [key, Array.isArray(list) && list.length ? list : [""]]
          })
        )
      )
    }
    setResolved(true)
  }, [defaultValue])

  if (!resolved) return null

  const payload = Object.fromEntries(
    SECTIONS.map(({ key }) => [
      key,
      (details[key] || []).map((s) => s.trim()).filter(Boolean),
    ])
  )
  const hasContent = SECTIONS.some(({ key }) => payload[key].length > 0)

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold text-gray-900">{caption}</h3>

      {SECTIONS.map(({ key, label }) => (
        <section
          key={key}
          className="flex flex-col gap-2 rounded-lg border border-gray-200 p-4"
        >
          <h4 className="text-sm font-semibold text-gray-800">{label}</h4>
          <BulletListEditor
            items={details[key] || [""]}
            placeholder="Type bullet point, press Enter for new item"
            onChange={(items) =>
              setDetails((prev) => ({ ...prev, [key]: items }))
            }
          />
        </section>
      ))}

      <p className="text-xs text-gray-400">
        Press Enter to add a new bullet item. Backspace on an empty item removes it.
      </p>

      <input
        type="hidden"
        name={name}
        value={hasContent ? JSON.stringify(payload) : ""}
        readOnly
      />
    </div>
  )
}
