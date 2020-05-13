import React from "react";
import { Modal } from "reactstrap";

const ProjectDetailsModal = ({ classNames, modal, setModal, children }) => (
  <Modal isOpen={modal} toggle={setModal} className={classNames}>
    {children}
  </Modal>
);

export default ProjectDetailsModal;
