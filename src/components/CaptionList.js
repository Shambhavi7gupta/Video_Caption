import React from "react";

const CaptionList = ({ captions, removeCaption }) => (
  <div className="captions-list">
    <h2>Captions List</h2>
    <ul>
      {captions.map((caption, index) => (
        <li key={index}>
          <span>
            {caption.start}s - {caption.end}s: {caption.text}
          </span>
          <button onClick={() => removeCaption(index)}>&times;</button>
        </li>
      ))}
    </ul>
  </div>
);

export default CaptionList;
