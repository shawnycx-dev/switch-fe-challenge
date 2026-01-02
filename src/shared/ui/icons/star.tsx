export default function StarIcon({ filled }: { filled: boolean }) {
  return <span aria-hidden="true">{filled ? "★" : "☆"}</span>;
}
