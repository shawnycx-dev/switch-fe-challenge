import type { Category } from "@/entities/category/model/types";
import { cn } from "@/shared/lib/cn";
import Link from "next/link";

interface CatalogFiltersProps {
  categories: Category[];
  selectedCategory?: string;
}

const FilterButton = ({
  isActive,
  href,
  children,
  className,
}: {
  isActive: boolean;
  href: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Link
      className={cn(
        "transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded py-1",
        isActive && "text-blue-500 font-semibold",
        className
      )}
      href={href}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  );
};

export default function CatalogFilters({
  categories,
  selectedCategory,
}: CatalogFiltersProps) {
  const filterId = "category-filter";

  return (
    <nav className="my-2" aria-labelledby={filterId}>
      <h2 id={filterId}>Filter by category:</h2>
      <div className="flex gap-2 items-center flex-wrap">
        <FilterButton isActive={!selectedCategory} href="/catalog">
          All
        </FilterButton>

        {categories.map((c) => {
          const isSelected =
            c.name.toLowerCase() === selectedCategory?.toLowerCase();
          const encodedCategory = encodeURIComponent(c.name);

          return (
            <FilterButton
              key={c.id}
              href={`/catalog?category=${encodedCategory}`}
              isActive={isSelected}
            >
              {c.name}
            </FilterButton>
          );
        })}
      </div>
    </nav>
  );
}
