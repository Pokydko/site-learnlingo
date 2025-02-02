import ReactModal from "react-modal";
import "./ModalGlobal.css";
import css from "./ModalCustom.module.css";

export default function Modal({ isOpen, onClose, children }) {
  return (
    <ReactModal
      isOpen={isOpen}
      overlayClassName={{
        base: css.modalBackdrop,
        afterOpen: css.modalBackdropAfterOpen,
        beforeClose: css.modalBackdropBeforeClose,
      }}
      className={{
        base: css.modalContent,
        afterOpen: css.modalContentAfterOpen,
        beforeClose: css.modalContentBeforeClose,
      }}
      onRequestClose={onClose}
      // openTimeoutMS={2000}
      closeTimeoutMS={500}
    >
      {children}
      <button onClick={onClose} className={css.modalCloseBtn}>
        &times;
      </button>
    </ReactModal>
  );
}
