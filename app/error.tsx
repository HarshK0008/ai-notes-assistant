"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <p className="mb-4 text-red-600">Something went wrong loading your notes.</p>
      <button
        onClick={reset}
        className="rounded bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-700"
      >
        Try again
      </button>
    </div>
  );
}
