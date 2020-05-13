import React, { useEffect, useState } from "react";
import NLForm from "./NLForm";
import { ChevronDown } from "../../assets/img/icons";

const NLFormWrapper = props => {
  const {
    paragraphs,
    extraParagraphs,
    selectObj,
    getSelectedFilters,
    liveFilters,
    renderExpertList,
    hideDiscoverButton
  } = props;

  const [clicked, setClicked] = useState({});
  const [select, setSelect] = useState(selectObj);

  let staticObject = {};

  useEffect(() => {
    for (let x in selectObj) {
      staticObject[x] = false;
    }
  }, []);

  useEffect(() => setClicked(staticObject), []);

  const onPress = (name, clicked) => {
    let newVal = clicked;
    newVal[name] = clicked;
    setClicked(newVal);
  };

  const changeDefault = (name, selection) => {
    let newVal = select;
    newVal[name] = newVal[name].map(val => {
      return {
        value: val.value,
        selected: val.value === selection
      };
    });
    setSelect(newVal);

    onPress(name, false);
  };

  return (
    <div className="nl-form">
      <NLForm
        onPress={onPress}
        changeDefault={changeDefault}
        clicked={clicked}
        select={select}
        paragraphs={paragraphs}
        extraParagraphs={extraParagraphs}
        getSelectedFilters={getSelectedFilters}
        liveFilters={liveFilters}
        renderExpertList={e => renderExpertList(e)}
        hideDiscoverButton={hideDiscoverButton}
      />
    </div>
  );
};

export default NLFormWrapper;
