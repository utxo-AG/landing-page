"use client";

export function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#1e2a4a] ${className}`}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function XIcon({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#e5e5e5] ${className}`}
    >
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M2.5 2.5L7.5 7.5M7.5 2.5L2.5 7.5" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export function PartialIcon({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#f0f0f0] ${className}`}
    >
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M2.5 5H7.5" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </span>
  );
}
