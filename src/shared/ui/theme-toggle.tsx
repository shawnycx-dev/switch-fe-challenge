"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Use resolvedTheme to get the actual theme (handles "system" theme)
  // Fallback to "light" during SSR/unmounted state
  const currentTheme = mounted && resolvedTheme ? resolvedTheme : "light";
  const isDark = currentTheme === "dark";

  const handleOnClick = () => {
    setTheme(isDark ? "light" : "dark");
  };

  // Provide accessible label that describes action and current state
  const ariaLabel = isDark
    ? "Switch to light mode. Currently using dark mode."
    : "Switch to dark mode. Currently using light mode.";

  return (
    <button
      type="button"
      onClick={handleOnClick}
      aria-label={ariaLabel}
      aria-pressed={isDark}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground rounded"
    >
      <span className="text-2xl" aria-hidden="true">
        {isDark ? "🌙" : "☀️"}
      </span>
      <span className="sr-only">{ariaLabel}</span>
    </button>
  );
}
