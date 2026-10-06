export function ItemHead({ text, className = "text-black" }) {
  if (!text) {
    return null // Return null if text is not provided
  }

  const capitalized = text.toUpperCase()

  return <h2 className={`text-xl md:text-4xl font-bold ${className}`}>{capitalized}</h2>
}
