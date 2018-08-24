import React from "react";

function Infowindow(props) {
  const { nowmarker, information } = props;

  return (
    <aside className="info-window-box" tabIndex={0}>
      <p className="credits">Information by Wikipedia</p>
      <h2>{nowmarker.type}</h2>
      <article>{information}</article>
    </aside>
  );
}

export default Infowindow;
