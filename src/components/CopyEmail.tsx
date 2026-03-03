"use client";

import { useState, useCallback } from "react";

const EMAIL = "business@utxo.ag";

interface CopyEmailProps {
  className?: string;
  children?: React.ReactNode;
}

export default function CopyEmail({ className, children }: CopyEmailProps) {
  const [copied, setCopied] = useState(false);

  const handleClick = useCallback(() => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  return (
    <button onClick={handleClick} className={className} title={EMAIL}>
      {copied ? (
        <span className="inline-flex items-center gap-2">
          Copied!
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="2,7 5.5,10.5 12,4" />
          </svg>
        </span>
      ) : (
        children ?? EMAIL
      )}
    </button>
  );
}
