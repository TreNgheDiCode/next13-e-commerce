"use client"

import { useStoreModal } from "@/hooks/use-store-modal"
import { Modal } from "../ui/modal"

export const StoreModal = () => {
  const storeModal = useStoreModal();

  return (
    <Modal
      title="Tạo cửa hàng"
      description="Thêm một cửa hàng để quản lý sản phẩm và danh mục thể loại"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      Future Create Store Form
    </Modal>
  );
};