import { Modal } from "choco-modal-component";
import { CartModalContent } from "../CartModalContent/CartModalContent";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartModal = ({ isOpen, onClose }: CartModalProps) => {
  const rootElement = document.getElementById("root");
  const rootWidth = window.getComputedStyle(rootElement!).width;

  return (
    <Modal
      modalPosition="bottom"
      title="장바구니"
      closeButtonPosition="bottom"
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={() => {}}
      size="small"
      buttonText="닫기"
      rootWidth={rootWidth}
    >
      <CartModalContent />
    </Modal>
  );
};
