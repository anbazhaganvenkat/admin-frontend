import React from "react";

const NlSelect = props => (
  <>
    {props.text}
    <div className="nl-field nl-dd">
      <ul>
        {props.select.map(x => {
          return <li className="blur">{x.value}</li>;
        })}
      </ul>
    </div>
  </>
);
export default NlSelect;
