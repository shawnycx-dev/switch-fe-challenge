import { getProductById } from "@/features/catalog/model/repo";
import { notFound } from "next/navigation";
import { Modal, ModalContent } from "./modal";
import { ProductPage } from "@/entities/product/ui/product-page";

interface ProductPreviewModalProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPreviewModal({
  params,
}: ProductPreviewModalProps) {
  const { id } = await params;

  const product = await getProductById(id);

  if (!product) notFound();

  return (
    <Modal>
      <ModalContent>
        <ProductPage product={product} />
      </ModalContent>
    </Modal>
  );
}
