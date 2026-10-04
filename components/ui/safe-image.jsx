'use client';

import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';

export function SafeImage({
  src,
  alt,
  fallbackSrc = '/images/logo.svg',
  width,
  height,
  fill = false,
  sizes,
  priority = false,
  quality = 75,
  objectFit = 'cover',
  rounded = false,
  className = '',
  containerClassName = '',
  showSkeleton = true,
  skeletonClassName = '',
  onLoadComplete,
  onError,
  unoptimized = false,
  ...rest
}) {
  const isValidSrc = typeof src === 'string' && src.trim().length > 0;

  const [currentSrc, setCurrentSrc] = useState(isValidSrc ? src : fallbackSrc);
  const [isLoading, setIsLoading] = useState(true);
  const [hasErrored, setHasErrored] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const nextIsValid = typeof src === 'string' && src.trim().length > 0;
    setCurrentSrc(nextIsValid ? src : fallbackSrc);
    setHasErrored(false);
    setIsLoading(true);
  }, [src, fallbackSrc]);

  // Catches the case where the image was already cached and
  // the native load event fired before React attached onLoad
  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoading(false);
    }
  }, [currentSrc]);

  const handleError = (event) => {
    if (!hasErrored) {
      setHasErrored(true);
      setCurrentSrc(fallbackSrc);
    }
    setIsLoading(false);
    onError?.(event);
  };

  const handleLoad = useCallback(
    (event) => {
      setIsLoading(false);
      onLoadComplete?.(event);
    },
    [onLoadComplete],
  );

  const roundedClass =
    rounded === true
      ? 'rounded-md'
      : typeof rounded === 'string'
        ? `rounded-${rounded}`
        : '';

  const objectFitClass =
    {
      cover: 'object-cover',
      contain: 'object-contain',
      fill: 'object-fill',
      none: 'object-none',
      'scale-down': 'object-scale-down',
    }[objectFit] || '';

  return (
    <div
      className={`relative overflow-hidden ${
        fill ? 'h-full w-full' : ''
      } ${roundedClass} ${containerClassName}`}
    >
      {showSkeleton && isLoading && (
        <div
          className={`absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700 ${roundedClass} ${skeletonClassName}`}
          aria-hidden="true"
        />
      )}

      <Image
        ref={imgRef}
        src={currentSrc}
        alt={alt || ''}
        {...(fill
          ? { fill: true }
          : { width: width || 100, height: height || 100 })}
        sizes={sizes}
        priority={priority}
        quality={quality}
        unoptimized={unoptimized || hasErrored}
        onError={handleError}
        onLoad={handleLoad}
        className={`${objectFitClass} ${roundedClass} ${className} ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } transition-opacity duration-300`}
        {...rest}
      />
    </div>
  );
}

