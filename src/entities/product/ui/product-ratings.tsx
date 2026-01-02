import { Product } from "@/entities/product/model/types";
import StarIcon from "@/shared/ui/icons/star";

const MAX_RATING = 5;

export default function ProductRatings({ rating }: Pick<Product, "rating">) {
  const filled = Math.floor(rating);
  const formattedRating = rating.toFixed(1);

  return (
    <div className="flex items-center gap-1">
      <div className="flex flex-row gap-0.5">
        {Array.from({ length: MAX_RATING }).map((_, index) => (
          <StarIcon key={`star-rating::${index}`} filled={index < filled} />
        ))}
      </div>
      <span className="text-sm">({formattedRating})</span>
    </div>
  );
}
