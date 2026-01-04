import Link from "next/link";
import { getProductById } from "@/features/catalog/model/repo";
import { notFound } from "next/navigation";
import { ProductPage as ProductPageComponent } from "@/entities/product/ui/product-page";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({ params }: ProductPageProps) => {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  return {
    title: `${product?.name}`,
    description: `${product?.description}`,
  };
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  const product = await getProductById(id);

  if (!product) notFound();

  return (
    <div className="max-w-120 mx-auto p-8">
      <Link
        className="text-sm text-gray-600 dark:text-gray-300 inline-block mb-8"
        href="/"
      >
        ← Back to Catalog
      </Link>
      <ProductPageComponent product={product} />
    </div>
  );
}
