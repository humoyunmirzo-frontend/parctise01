import { Backdrop, Modal, Fade } from "@mui/material";

export default function ModalContent({ isOpen, handleModal, children }) {
  return (
    <Modal
      open={isOpen}
      onClose={() => handleModal(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isOpen}>{children}</Fade>
    </Modal>
  );
}
