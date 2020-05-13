import reactStringReplace from "react-string-replace";
import SelectDropdown from "../core/SelectDropdown";
import React, { Component } from "react";
import CheckboxDropdown from "../core/CheckboxDropdown";
import CheckboxDropdown2 from "../core/CheckboxDropdownV2";
import LocationSearchInput from "../LocationSearchInput";

export default class Sentence extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      actualParagraph,
      objectNames,
      select,
      getSelectedFilters,
      liveFilters
    } = this.props;
    this.newSentence = actualParagraph;
    getSelectObjectsFrom(actualParagraph).forEach((objectName, index) => {
      this.newSentence = reactStringReplace(
        this.newSentence,
        `{${objectName}}`,
        (match, i) => {
          return select[objectName][0].multiselect !== undefined ? (
            <CheckboxDropdown2
              buttonLabel={select[objectName][1].label}
              dropdownLinks={select[objectName]}
              hideCaret
              hideChevron
              key={objectName + index}
              getSelectedFilters={getSelectedFilters}
              selectName={objectName}
              liveFilters={liveFilters}
            />
          ) : select[objectName][0].location ? (
            <LocationSearchInput
              selectName={objectName}
              getSelectedFilters={getSelectedFilters}
              liveFilters={liveFilters}
            />
          ) : (
            <SelectDropdown
              buttonLabel={select[objectName][0].label}
              dropdownLinks={select[objectName]}
              hideCaret
              hideChevron
              key={objectName + index}
              getSelectedFilters={getSelectedFilters}
              selectName={objectName}
              liveFilters={liveFilters}
              nlFormFilter={true}
            />
          );
        }
      );
    });

    return <h4>{this.newSentence}</h4>;
  }
}

function getSelectObjectsFrom(paragraph) {
  let results = [];
  let re = /{([^}]+)}/g;
  let text;
  let i = 0;
  while ((text = re.exec(paragraph))) {
    results.push(text[1]);
  }

  return results;
}
