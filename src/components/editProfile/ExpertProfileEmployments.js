import React from "react";
import DefaultContent from "../content/DefaultContent";
import Text from "../core/Text";
import { FormGroup } from "reactstrap";
import Checkbox from "../../views/expertSignUp/Checkbox";
import Select from "../core/Select";
import DatePicker from "react-date-picker";
import TextArea from "../core/TextArea";
import { FieldArray } from "formik";
import ErrorMessage from "../core/ErrorMessage";
import moment from "moment";
import ExpertProfileEditDatepicker from "./ExpertProfileEditDatepicker";

const ExpertProfileEmployments = props => {
  const { employments } = props;
  const EMPLOYMENT_TYPE = [
    {
      value: "Full-time",
      label: "Full Time"
    },
    {
      value: "Part-time",
      label: "Part Time"
    },
    {
      value: "Hourly",
      label: "Hourly"
    }
  ];
  return (
    <DefaultContent title={"Employment"}>
      <p className={["text-inline-grayed"].join("")}>
        We want to know more about what your employment. This will help
        prospective clients get a better idea of how impressive you are!
      </p>
      <FieldArray
        name="employments"
        render={arrayHelpers => (
          <div className={["employments", "employment-editing"].join(" ")}>
            {arrayHelpers.form.values.employments &&
              arrayHelpers.form.values.employments.map((employment, index) => (
                <div className="employment" key={index}>
                  <div className="field-wrapper">
                    <ErrorMessage name={`employments[${index}].title`} />
                    <Text
                      placeholder={"Title"}
                      name={`employments[${index}].title`}
                      required
                    />
                  </div>
                  <div className="field-wrapper">
                    <Select
                      name={`employments[${index}].employmentType`}
                      placeholder="Employment Type"
                      defaultValue={EMPLOYMENT_TYPE.find(
                        type => type.value === employment.employmentType
                      )}
                      options={EMPLOYMENT_TYPE}
                    />
                  </div>
                  <div className="field-wrapper">
                    <Text
                      name={`employments[${index}].companyName`}
                      placeholder="companyName"
                      defaultValue={employment.companyName}
                    />
                  </div>
                  <div className="field-wrapper">
                    <Text
                      name={`employments[${index}].location`}
                      placeholder={"Location"}
                    />
                  </div>
                  <div className="field-wrapper">
                    <TextArea name={`employments[${index}].description`} />
                  </div>
                  <div className="field-wrapper">
                    <FormGroup>
                      <ExpertProfileEditDatepicker
                        name={`employments[${index}].startDate`}
                        placeholder={"Start date"}
                        value={
                          arrayHelpers.form.values.employments[index].startDate
                        }
                        onChange={val => {
                          arrayHelpers.form.values.employments[
                            index
                          ].startDate = moment(val).format("YYYY-MM-DD");
                        }}
                        clearIcon={null}
                      />
                    </FormGroup>
                    <FormGroup>
                      <ExpertProfileEditDatepicker
                        name={`employments[${index}].endDate`}
                        placeholder={"End date"}
                        value={
                          arrayHelpers.form.values.employments[index].endDate
                        }
                        onChange={val => {
                          arrayHelpers.form.values.employments[
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
                      name={`employments[${index}].isCurrentlyWorking`}
                      label={"Currently working here"}
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
                  id: null,
                  title: "",
                  employmentType: "",
                  companyName: "",
                  location: "",
                  startDate: new Date(),
                  endDate: new Date(),
                  isCurrentlyWorking: ""
                });
              }}
            >
              {`Add ${
                employments && employments.length > 0 ? "another" : ""
              } employment...`}
            </a>
          </div>
        )}
      />
    </DefaultContent>
  );
};

export default ExpertProfileEmployments;
