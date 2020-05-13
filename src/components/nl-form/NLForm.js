import React, { useEffect, useState } from "react";
import { ChevronDown } from "../../assets/img/icons";
import Sentence from "./NLSentence";

const NLForm = props => {
  const {
    paragraphs,
    extraParagraphs,
    select,
    getSelectedFilters,
    liveFilters,
    renderExpertList,
    hideDiscoverButton
  } = props;
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(prevState => !prevState);
  };

  return (
    <>
      {paragraphs.map((paragraph, index) => {
        return (
          <Sentence
            actualParagraph={paragraph}
            select={select}
            key={index}
            getSelectedFilters={getSelectedFilters}
            liveFilters={liveFilters}
          />
        );
      })}
      {!showFilters && (
        <>
          {!hideDiscoverButton && (
            <div className="btn-wrapper">
              <a
                className="btn btn-primary text-white"
                onClick={e => renderExpertList(e)}
              >
                Discover Experts
              </a>
            </div>
          )}
        </>
      )}

      <div className={`show-more-filters ${!!showFilters && "filters-active"}`}>
        <button type="button" className="btn btn-link" onClick={toggleFilters}>
          <span className="text-primary">
            show {showFilters ? "less" : "more"} filters
          </span>
          <span className="circle-arrow-down">
            <ChevronDown />
          </span>
        </button>
      </div>

      {showFilters && (
        <>
          {extraParagraphs.map((paragraph, index) => {
            return (
              <Sentence
                actualParagraph={paragraph}
                select={select}
                key={index}
                getSelectedFilters={getSelectedFilters}
                liveFilters={liveFilters}
              />
            );
          })}
          {!hideDiscoverButton && (
            <div className="btn-wrapper">
              <a
                className="btn btn-primary text-white"
                onClick={e => renderExpertList(e)}
              >
                Discover Experts
              </a>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default NLForm;
