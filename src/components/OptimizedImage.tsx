import React, { useState, useCallback } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  sizes = '100vw',
  priority = false,
  onLoad,
  onError,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Generate responsive image URLs
  const generateSrcSet = useCallback((baseSrc: string) => {
    const ext = baseSrc.split('.').pop();
    const baseName = baseSrc.replace(`.${ext}`, '');
    
    // For mobile optimization, we'll use different sizes
    const sizes = [128, 256, 512, 1024];
    return sizes.map(size => `${baseName}-${size}w.webp ${size}w`).join(', ');
  }, []);

  const handleLoad = useCallback(() => {
    setImageLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setImageError(true);
    onError?.();
  }, [onError]);

  // Create WebP and fallback versions
  const webpSrc = src.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  const fallbackSrc = src;

  return (
    <picture className={className}>
      {/* Modern formats for better compression */}
      <source
        type="image/webp"
        srcSet={generateSrcSet(webpSrc)}
        sizes={sizes}
      />
      <source
        type="image/avif"
        srcSet={generateSrcSet(src.replace(/\.(png|jpg|jpeg|webp)$/i, '.avif'))}
        sizes={sizes}
      />
      
      {/* Fallback image */}
      <img
        src={fallbackSrc}
        alt={alt}
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        } ${imageError ? 'opacity-50' : ''}`}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        style={{
          aspectRatio: width && height ? `${width}/${height}` : undefined,
        }}
      />
      
      {/* Loading placeholder */}
      {!imageLoaded && !imageError && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{
            aspectRatio: width && height ? `${width}/${height}` : undefined,
          }}
        />
      )}
    </picture>
  );
};

export default OptimizedImage;
