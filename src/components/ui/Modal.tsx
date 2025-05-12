interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-item-background p-8 rounded-lg w-[600px] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white">
          X
        </button>
      </div>
    </div>
  );
}
