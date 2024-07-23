import Modal from "react-modal";
import ModalHeader from "./ModalHeader";
import CreateOrderModal from "./ModalBodys/CreateOrderModal";
import Approve from "./ModalBodys/Approve";
import CreateProductModal from "./ModalBodys/CreateProductModal";
import ZoomImages from "./ModalBodys/ZoomImages";
import WarningSignIn from "./ModalBodys/WarningSignIn";
import CallPhone from "./ModalBodys/CallPhone";
import WarningOrg from "./ModalBodys/WarningOrg";

function UniversalModal({
  body,
  isOpen,
  toggleModal,
  closeModal,
  orderId,
  approveFunction,
  headerText,
  title,
  productId,
  img,
  phone,
  typeOfWarning,
}) {
  const customStyles = {
    content: {
      maxWidth: "550px",
      padding: "1.25rem",
      transform: "auto",
      margin: "auto",
      // border: "none",
      // background: "none",
    },
    overlay: {
      background: "rgba(0, 0, 0, 0.75)",
      zIndex: "50",
    },
  };

  const customStyles2 = {
    content: {
      maxWidth: "550px",
      transform: "auto",
      margin: "auto",
      marginTop: "100px",
      border: "none",
      background: "none",
    },
    overlay: {
      background: "rgba(0, 0, 0, 0.75)",
      zIndex: "50",
    },
  };

  const zoomStyles = {
    content: {
      maxWidth: "900px",
      border: "none",
      background: "none",
      padding: "1.25rem",
      transform: "auto",
      margin: "auto",
    },
    overlay: {
      background: "rgba(0, 0, 0, 0.75)",
      zIndex: "50",
    },
  };

  const modalFull = {
    content: {
      maxWidth: "100%",
      padding: "1.25rem",
      transform: "auto",
      display: "flex",
      justifyContent: "center",
      alignCenter: "center",
      border: "none",
      background: "none",
    },
    overlay: {
      background: "rgba(0, 0, 0, 0.75)",
      zIndex: "50",
    },
  };
  const switchBody = () => {
    switch (body) {
      case "createOrder":
        return <CreateOrderModal closeModal={closeModal} orderId={orderId} />;
      case "createProduct":
        return (
          <CreateProductModal closeModal={closeModal} productId={productId} />
        );
      case "approve":
        return (
          <Approve
            toggleModal={toggleModal}
            approveFunction={approveFunction}
            headerText={headerText}
            title={title}
          />
        );
      case "zoomImg":
        return <ZoomImages imgUrl={img} />;
      case "warningSignIn":
        return <WarningSignIn typeOfWarning={typeOfWarning} />;
      case "warningOrg":
        return <WarningOrg />;
      case "phone":
        return <CallPhone phone={phone} />;
      default:
        return "Bunday jadval topilmadi";
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      style={
        body === "signup" || body === "createOrder" || body === "createProduct"
          ? { ...customStyles }
          : body === "zoomImg"
          ? { ...zoomStyles }
          : body === "phone" ||
            body === "warningSignIn" ||
            body === "warningOrg" ||
            body === "approve"
          ? { ...customStyles2 }
          : { ...modalFull }
      }
      onRequestClose={closeModal || toggleModal}
      closeTimeoutMS={100}
      contentLabel='Example Modal'
      appElement={document.getElementById("root") || undefined}
    >
      <ModalHeader toggleModal={closeModal || toggleModal} />
      {switchBody()}
    </Modal>
  );
}

export default UniversalModal;
