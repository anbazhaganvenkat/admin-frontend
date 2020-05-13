import React, { useState, useEffect } from "react";
import { FieldArray } from "formik";
import DefaultContent from "../content/DefaultContent";
import Text from "../core/Text";
import TextArea from "../core/TextArea";
import Email from "../core/Email";
import ErrorMessage from "../core/ErrorMessage";

const ExpertProfileRecommendations = props => {
  const { recommendations } = props;

  return (
    <DefaultContent title={"Recommendations"}>
      <p className={["text-inline-grayed"].join("")}>
        We want to know more about what your recommendations. This will help
        prospective clients get a better idea of how impressive you are!
      </p>
      <FieldArray
        name="recommendations"
        render={arrayHelpers => (
          <div
            className={["recommendations", "recommendations-editing"].join(" ")}
          >
            {arrayHelpers.form.values.recommendations &&
              arrayHelpers.form.values.recommendations.map(
                (recommendation, index) => (
                  <div className="recommendation" key={index}>
                    <div className="field-wrapper">
                      <ErrorMessage name={`recommendations[${index}].name`} />
                      <Text
                        name={`recommendations[${index}].name`}
                        placeholder={"Recommendation Name"}
                        required
                      />
                    </div>
                    <div className="field-wrapper">
                      <ErrorMessage
                        name={`recommendations[${index}].companyName`}
                      />
                      <Text
                        name={`recommendations[${index}].companyName`}
                        placeholder={"Company Name"}
                        required
                      />
                    </div>
                    <div className="field-wrapper">
                      <ErrorMessage name={`recommendations[${index}].role`} />
                      <Text
                        name={`recommendations[${index}].role`}
                        placeholder={"Role/Occupation"}
                        required
                      />
                    </div>
                    <div
                      className="field-wrapper"
                      style={{ marginBottom: "1rem" }}
                    >
                      <ErrorMessage name={`recommendations[${index}].email`} />
                      <Email
                        name={`recommendations[${index}].email`}
                        placeholder={"Email Address"}
                        required
                      />
                    </div>
                    <div className="field-wrapper">
                      <ErrorMessage
                        name={`recommendations[${index}].testimonial`}
                      />
                      <TextArea
                        name={`recommendations[${index}].testimonial`}
                        placeholder="Testiminial"
                        maxLength={false}
                        required
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
                  tempId: recommendations && recommendations.length + 1,
                  name: "",
                  companyName: "",
                  role: "",
                  email: "",
                  testimonial: ""
                });
              }}
            >
              {`Add ${
                recommendations && recommendations.length > 0 ? "another" : ""
              } recommendation...`}
            </a>
          </div>
        )}
      />
    </DefaultContent>
  );
};

export default ExpertProfileRecommendations;
