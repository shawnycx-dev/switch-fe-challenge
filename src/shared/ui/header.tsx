import { ThemeToggle } from "@/shared/ui/theme-toggle";

export default function Header() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800 shadow">
      <div className="flex items-center gap-2 justify-end p-4">
        <ThemeToggle />
      </div>
    </header>
  );
}
