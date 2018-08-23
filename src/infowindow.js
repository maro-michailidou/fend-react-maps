import React from "react";

function infowindow(props) {
  const { markerNow, information } = props;

  return (
    <aside className="info-window-box" tabIndex={0}>
      <p className="credits">Provided by Wikipedia</p>
      <h2>{markerNow.title}</h2>
      <article>{information}</article>
    </aside>
  );
}

export default infowindow;
