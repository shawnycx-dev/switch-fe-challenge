import { cn } from "@/shared/lib/cn";

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm",
        className
      )}
      {...props}
    />
  );
}
