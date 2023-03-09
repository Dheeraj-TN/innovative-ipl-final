import React from "react";
import "./Widgets.css";
function Widgets() {
  return (
    <div className="widgets">
      {/* iframe is used to get a web page inside the web page */}
      <div className="iFrame">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/Fj02iTrWUx0"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/7yYb2224yH0"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
}

export default Widgets;
