import React, { Component } from "react";
import DefaultContent from "../content/DefaultContent";
import Text from "../core/Text";
import { FormGroup } from "reactstrap";
import Checkbox from "../../views/expertSignUp/Checkbox";
import DatePicker from "react-date-picker";
import { FieldArray } from "formik";
import ErrorMessage from "../core/ErrorMessage";
import moment from "moment";
import ExpertProfileEditDatepicker from "./ExpertProfileEditDatepicker";

const ExpertProfileEducation = props => {
  return (
    <>
      <DefaultContent title={"Education"}>
        <p className={["text-inline-grayed"].join("")}>
          We want to know more about what your education. This will help
          prospective clients get a better idea of how impressive you are!
        </p>
        <FieldArray
          name="education"
          render={arrayHelpers => (
            <div className={["educations", "education-editing"].join(" ")}>
              {arrayHelpers.form.values.education &&
                arrayHelpers.form.values.education.map((education, index) => (
                  <div className="education">
                    <div className="field-wrapper">
                      <ErrorMessage name={`education[${index}].collegeName`} />
                      <Text
                        placeholder="College Name"
                        name={`education[${index}].collegeName`}
                        required
                      />
                    </div>
                    <div className="field-wrapper">
                      <Text
                        name={`education[${index}].degree`}
                        placeholder="Degree"
                      />
                    </div>
                    <div className="field-wrapper">
                      <Text
                        placeholder={
                          "Course (ex. Financial management of Business)"
                        }
                        name={`education[${index}].course`}
                      />
                    </div>
                    <div className="field-wrapper">
                      <Text
                        placeholder={
                          "Field of Study (ex. Graphic Design, Economics)"
                        }
                        name={`education[${index}].courseType`}
                      />
                    </div>
                    <div className="field-wrapper">
                      <FormGroup>
                        <ExpertProfileEditDatepicker
                          name={`education[${index}].startDate`}
                          placeholder={"Start date"}
                          value={
                            arrayHelpers.form.values.education[index].startDate
                          }
                          onChange={val => {
                            arrayHelpers.form.values.education[
                              index
                            ].startDate = moment(val).format("YYYY-MM-DD");
                          }}
                          clearIcon={null}
                        />
                      </FormGroup>
                      <FormGroup>
                        <ExpertProfileEditDatepicker
                          name={`education[${index}].endDate`}
                          placeholder={"End date"}
                          value={
                            arrayHelpers.form.values.education[index].endDate
                          }
                          onChange={val => {
                            arrayHelpers.form.values.education[
                              index
                            ].endDate = moment(val).format("YYYY-MM-DD");
                          }}
                          clearIcon={null}
                        />
                      </FormGroup>
                    </div>
                    <div className="field-wrapper">
                      <Checkbox
                        className="custom-checkbox accepted-terms pb-0 mb-0"
                        id={`education_currently_going_here_${index}`}
                        name={`education[${index}].currentlyGoingOn`}
                        label={"Currently going here"}
                      />
                    </div>
                    <div className={["btn-wrapper", "text-right"].join(" ")}>
                      <a
                        className="remove-link"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        Remove
                      </a>
                    </div>
                  </div>
                ))}
              <a
                href="#"
                className="h7"
                onClick={e => {
                  e.preventDefault();
                  arrayHelpers.push({
                    collegeName: "",
                    degree: "",
                    course: "",
                    courseType: "",
                    startDate: new Date(),
                    endDate: new Date()
                  });
                }}
              >
                Add education...
              </a>
            </div>
          )}
        />
      </DefaultContent>
    </>
  );
};

export default ExpertProfileEducation;
