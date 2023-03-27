import React from "react";
import { Modal } from "react-bootstrap";

const ImageOverlay = ({ data, show, setShow }) => {
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={() => setShow(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {data.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
          <img src={data.image} className="img-fluid img-thumbnail w-100" alt={data.type} />
        
      </Modal.Body>
    </Modal>
  );
};

export default ImageOverlay;
