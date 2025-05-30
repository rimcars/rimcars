"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Stagewise configuration
const stagewiseConfig = {
  plugins: [],
};

// Dynamically import the stagewise toolbar only in development
const StagewiseToolbar = dynamic(
  () =>
    import("@stagewise/toolbar-next").then((mod) => mod.StagewiseToolbar),
  {
    ssr: false, // Disable server-side rendering for the toolbar
    loading: () => null, // No loading component needed
  }
);

// Development-only stagewise wrapper
export default function StagewiseDevToolbar() {
  // Only render in development mode
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <StagewiseToolbar config={stagewiseConfig} />
    </Suspense>
  );
}
