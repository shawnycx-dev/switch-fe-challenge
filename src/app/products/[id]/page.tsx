import { getProductById } from "@/features/catalog/model/repo";
import { notFound } from "next/navigation";
import { ProductPage as ProductPageComponent } from "@/entities/product/ui/product-page";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  const product = await getProductById(id);

  if (!product) notFound();

  return (
    <div className="max-w-120 mx-auto p-8">
      <ProductPageComponent product={product} />
    </div>
  );
}
