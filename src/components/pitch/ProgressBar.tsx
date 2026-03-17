"use client";

export default function ProgressBar({
  progress,
}: {
  progress: number;
}) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-[#ccc]">
      <div
        className="h-full bg-[#1e2a4a] transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
