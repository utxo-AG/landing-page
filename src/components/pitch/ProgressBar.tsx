"use client";

export default function ProgressBar({
  progress,
}: {
  progress: number;
}) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-[#eee]">
      <div
        className="h-full bg-[#111] transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
