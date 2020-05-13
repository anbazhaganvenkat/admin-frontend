import React from "react";

function _renderSquare(currentValue, currentStep, maximumSteps) {
  const showActive = currentStep === currentValue ? "active" : "in-active";
  return currentStep < maximumSteps ? (
    <div className={`box ${showActive}`} />
  ) : (
    ""
  );
}

export default function _renderWizardIndicator(currentStep, maximumSteps) {
  const stepArray = [...Array(maximumSteps).keys()];
  return (
    <div className="expert-request-active-btn-section d-flex">
      {stepArray.map((n, index) => {
        return n > 0 ? _renderSquare(n, currentStep, maximumSteps) : "";
      })}
    </div>
  );
}
