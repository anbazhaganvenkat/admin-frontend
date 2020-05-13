import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import DatePicker from "react-datepicker";

const ShareAvailabilityModal = ({
  projectDetails,
  modal,
  setModal,
  startDate,
  startTime,
  setDateAndTime,
  shareExpertAvailability
}) => {
  const { id, name } = projectDetails;

  return (
    <Modal
      isOpen={modal}
      toggle={setModal}
      className={["edit-task-modal", "active-alert-modal"].join(" ")}
    >
      <ModalHeader toggle={setModal}>
        <h4 className={["font-weight-bold"].join(" ")}>Project Active!</h4>
      </ModalHeader>
      <ModalBody className={["text-center", "mb-4"].join(" ")}>
        <div className="content">
          <p>
            <span className="font-weight-bold">“{name}”</span> is now active!
            Please select a few dates and times for when you’ll be available for
            a kickoff call.
          </p>
        </div>
        <div className="form-wrapper mt-4">
          <div className="field-wrapper">
            <div className="datepicker-wrapper">
              <DatePicker
                id="date"
                name={`datepicker-date`}
                className="datepicker"
                placeholderText="MM/DD/YYYY"
                selected={startDate}
                onChange={date => setDateAndTime("startDate", date)}
              />
            </div>
            <div className="datepicker-wrapper">
              <DatePicker
                selected={startTime}
                onChange={date => setDateAndTime("startTime", date)}
                className="datepicker"
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter className={["justify-content-center"].join(" ")}>
        <div className="btn-wrapper">
          <button className="btn btn-outline-secondary mr-2" onClick={setModal}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              shareExpertAvailability(id);
              setModal();
            }}
          >
            Share My Availability
          </button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default ShareAvailabilityModal;
