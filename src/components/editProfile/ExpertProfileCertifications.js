import React, { useState } from "react";
import DefaultContent from "../content/DefaultContent";
import Text from "../core/Text";
import File from "../core/File";
import Checkbox from "../../views/expertSignUp/Checkbox";
import { FormGroup } from "reactstrap";
import { FieldArray } from "formik";
import moment from "moment";
import ExpertProfileEditDatepicker from "./ExpertProfileEditDatepicker";
import ErrorMessage from "../core/ErrorMessage";
import CustomFile from "../core/CustomFile";

const doBase64encode = eventTarget => {
  return new Promise((resolve, reject) => {
    const { files } = eventTarget.target;
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      return resolve(reader.result);
    });

    if (files && files.length > 0) {
      reader.readAsDataURL(files[0]);
    }
  });
};

const ExpertProfileCertifications = props => {
  const { certifications } = props;
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  return (
    <DefaultContent title={"Certifications"}>
      <p className={["text-inline-grayed"].join("")}>
        If you have certifications, list them! They’ll help clients know you’re
        great.
      </p>
      <FieldArray
        name="certifications"
        render={arrayHelpers => (
          <div
            className={["certifications", "certifications-editing"].join(" ")}
          >
            {arrayHelpers.form.values.certifications &&
              arrayHelpers.form.values.certifications.map(
                (certification, index) => (
                  <div
                    className={["certification-editing"].join(" ")}
                    key={index}
                  >
                    <div className="field-wrapper">
                      <ErrorMessage name={`certifications[${index}].name`} />
                      <Text
                        placeholder={"Certificate name"}
                        name={`certifications[${index}].name`}
                        required
                      />
                    </div>
                    <div className="field-wrapper">
                      <div className="inline-field-wrapper">
                        <ErrorMessage
                          name={`certifications[${index}].institute`}
                        />
                        <Text
                          name={`certifications[${index}].institute`}
                          placeholder={"Certificate institution"}
                          required
                        />
                      </div>
                      <CustomFile
                        label={"Attach documentation..."}
                        name={`certifications[${index}].file`}
                        className={["file-upload"].join(" ")}
                        accept=".docx, .doc, .pdf, image/*, text/*"
                        setFieldValue={arrayHelpers.form.setFieldValue}
                        onChange={async e => {
                          arrayHelpers.form.values.certifications[
                            index
                          ].file = await doBase64encode(e);
                        }}
                      />
                    </div>
                    <div className="field-wrapper" key={index}>
                      <FormGroup>
                        <ExpertProfileEditDatepicker
                          name={`certifications[${index}].startDate`}
                          placeholder={"Start date"}
                          value={
                            arrayHelpers.form.values.certifications[index]
                              .startDate
                          }
                          onChange={val => {
                            arrayHelpers.form.values.certifications[
                              index
                            ].startDate = moment(val).format("YYYY-MM-DD");
                          }}
                          clearIcon={null}
                        />
                      </FormGroup>

                      <FormGroup>
                        <ExpertProfileEditDatepicker
                          name={`certifications[${index}].endDate`}
                          placeholder={"End date"}
                          value={
                            arrayHelpers.form.values.certifications[index]
                              .endDate
                          }
                          onChange={val => {
                            arrayHelpers.form.values.certifications[
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
                        name={`certifications[${index}].certificationNoEndDate`}
                        label={"Certificate has no end date "}
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
                )
              )}
            <a
              href="#"
              className="h7"
              onClick={e => {
                e.preventDefault();
                arrayHelpers.push({
                  file: "",
                  institute: "",
                  name: "",
                  startDate: new Date(),
                  endDate: new Date()
                });
              }}
            >
              {`Add ${
                certifications && certifications.length > 0 ? "another" : ""
              } certificate...`}
            </a>
          </div>
        )}
      />
    </DefaultContent>
  );
};

export default ExpertProfileCertifications;
