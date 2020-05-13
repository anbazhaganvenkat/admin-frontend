import React from "react";
import {
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

/**
 * Confirmation modal popup
 *
 * @param {*} param0
 */
const CustomModal = ({
  modal_header,
  modal_footer,
  headerTitle,
  children,
  toggle,
  isOpen,
  classHeader,
  classBody,
  classFooter,
  classFeature,
  cancelColor,
  buttonLabel,
  onDelete
}) => {
  return (
    <div>
      <Col>
        <Modal
          isOpen={isOpen}
          toggle={toggle}
          className="success-modal-popup"
          backdrop="static"
        >
          {modal_header && (
            <ModalHeader className={classHeader} toggle={toggle}>
              {headerTitle || "Modal Title"}
            </ModalHeader>
          )}

          <ModalBody className={classBody} toggle={toggle}>
            {children}
          </ModalBody>

          {modal_footer && (
            <ModalFooter className={classFooter}>
              <Button onClick={toggle} className="btn btn-outline-dark">
                Cancel
              </Button>
              <Button
                color={cancelColor || "danger"}
                onClick={onDelete}
                className={classFeature}
              >
                {buttonLabel ? buttonLabel : "Add"}
              </Button>
            </ModalFooter>
          )}
        </Modal>
      </Col>
    </div>
  );
};

export default CustomModal;
