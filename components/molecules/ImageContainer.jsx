"use client";

import { useState } from "react";
import Image from "next/image";

const FALLBACK_SRC = "/ssw.png";

export function ImageContainer({
  className,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  alt = "",
  ...props
}) {
  const [hasError, setHasError] = useState(false);
  const [lastSrc, setLastSrc] = useState(props.src);

  if (props.src !== lastSrc) {
    setHasError(false);
    setLastSrc(props.src);
  }
  const resolvedSrc = !props.src || hasError ? FALLBACK_SRC : props.src;

  return (
    <div className={className + " relative overflow-hidden rounded-2xl"}>
      <Image
        onError={() => setHasError(true)}
        className="object-cover transition duration-500 ease-in-out hover:scale-105"
        fill
        sizes={sizes || "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
        alt={alt}
        {...props}
        src={resolvedSrc}
      />
    </div>
  );
}
