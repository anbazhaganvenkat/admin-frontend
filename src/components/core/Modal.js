import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import SecondaryButton from "./SecondaryButton";
/**
 * Render Add modal
 *
 * @param {*} param0
 */
const AddModal = ({
  toggle,
  toggleModalClose,
  isOpen,
  HeaderClassName,
  FooterClassName,
  modalTitle,
  modalBody,
  modalFooter,
  primaryBtnClassName,
  primaryColor,
  cancelColor,
  hideFooter,
  showAddButton,
  showDeleteButton,
  hideDefaultButtons
}) => (
  <div className="custom-popup">
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      keyboard={true}
      backdrop="static"
      size="xl"
      className={HeaderClassName}
      style={{
        width: "auto",
        height: "auto",
        margin: "10px auto"
      }}
    >
      <ModalHeader
        toggle={toggleModalClose}
        cssModule={{ "modal-title": "w-100 text-center" }}
      >
        <span className="text-center">{modalTitle}</span>
      </ModalHeader>
      <ModalBody
        style={{
          maxHeight: "70vh",
          paddingRight: "20px",
          overflowY: "auto"
        }}
      >
        <div className="mt-2 mb-3">{modalBody}</div>
      </ModalBody>
      {hideFooter ? (
        ""
      ) : (
        <ModalFooter className={FooterClassName}>
          <div className="container-fluid">
            <div className="col-sm-12 text-center">{modalFooter}</div>
          </div>
          {!hideDefaultButtons && (
            <>
              {showAddButton ? (
                <Button
                  color={primaryColor}
                  className={primaryBtnClassName}
                  onClick={toggle}
                >
                  ADD
                </Button>
              ) : (
                <Button
                  type="submit"
                  color={primaryColor}
                  className={primaryBtnClassName}
                  onClick={toggle}
                >
                  Save
                </Button>
              )}
              <SecondaryButton
                color={cancelColor}
                onClick={toggle}
                label="Cancel"
              />
              {showDeleteButton && (
                <Button
                  color={primaryColor}
                  className={primaryBtnClassName}
                  onClick={toggle}
                >
                  DELETE
                </Button>
              )}
            </>
          )}
        </ModalFooter>
      )}
    </Modal>
  </div>
);
export default AddModal;
