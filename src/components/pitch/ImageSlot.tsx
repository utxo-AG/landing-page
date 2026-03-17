"use client";

import Image from "next/image";
import { type ReactNode, useState } from "react";

interface ImageSlotProps {
  src?: string;
  alt: string;
  aspectRatio?: string;
  fallbackLabel?: string;
  className?: string;
  children?: ReactNode;
}

function Placeholder({ label, className = "", aspectRatio = "4/3" }: { label: string; className?: string; aspectRatio?: string }) {
  return (
    <div
      className={`rounded-lg border-2 border-dashed border-[#ddd] bg-[#fafafa] flex items-center justify-center ${className}`}
      style={{ aspectRatio }}
    >
      <span className="text-[#bbb] text-xs font-mono tracking-wider uppercase">
        {label}
      </span>
    </div>
  );
}

export default function ImageSlot({
  src,
  alt,
  aspectRatio = "4/3",
  fallbackLabel,
  className = "",
  children,
}: ImageSlotProps) {
  const [error, setError] = useState(false);

  if (children) {
    return (
      <div className={`rounded-lg overflow-hidden ${className}`} style={{ aspectRatio }}>
        {children}
      </div>
    );
  }

  if (!src || error) {
    return <Placeholder label={fallbackLabel ?? alt} className={className} aspectRatio={aspectRatio} />;
  }

  return (
    <div
      className={`rounded-lg overflow-hidden relative ${className}`}
      style={{ aspectRatio }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
        onError={() => setError(true)}
      />
    </div>
  );
}
