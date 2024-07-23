import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import "../App.css";

function VideoPlayer() {
  const [videoUrl, setVideoUrl] = useState(""); // URL of the video
  const [captions, setCaptions] = useState([]); // Array to store captions
  const [currentCaption, setCurrentCaption] = useState(""); // Current caption text input
  const [startTime, setStartTime] = useState(""); // Start time input
  const [endTime, setEndTime] = useState(""); // End time input

  const playerRef = useRef(null); // Reference to the video player
  const captionRef = useRef(null); // Reference to the caption display

  // Function to add a new caption
  const addCaption = () => {
    if (currentCaption && startTime && endTime) {
      setCaptions([
        ...captions,
        {
          text: currentCaption,
          start: parseFloat(startTime),
          end: parseFloat(endTime),
        },
      ]);
      setCurrentCaption(""); // Clear the current caption input
      setStartTime(""); // Clear the start time input
      setEndTime(""); // Clear the end time input
    } else {
      alert("Please fill in all fields");
    }
  };

  // Function to handle time updates in the video player
  const handleTimeUpdate = ({ playedSeconds }) => {
    const caption = captions.find(
      (c) => playedSeconds >= c.start && playedSeconds <= c.end
    ); // Find the caption for current time
    if (caption) {
      captionRef.current.innerText = caption.text; // Display the caption text
    } else {
      captionRef.current.innerText = ""; // Clear the caption display
    }
  };

  return (
    <div className="App">
      <h1>Video Captions</h1>
      <div>
        <input
          type="text"
          placeholder="Enter video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)} // Update video URL state
        />
      </div>
      <ReactPlayer
        ref={playerRef}
        url={videoUrl}
        controls
        onProgress={handleTimeUpdate} // Call handleTimeUpdate on time update
        width="100%"
        height="400px"
      />
      <div ref={captionRef} className="caption"></div> {/* Caption display */}
      <div>
        <input
          type="text"
          placeholder="Enter caption text"
          value={currentCaption}
          onChange={(e) => setCurrentCaption(e.target.value)} // Update caption text state
        />
        <input
          type="number"
          placeholder="Start time (seconds)"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)} // Update start time state
        />
        <input
          type="number"
          placeholder="End time (seconds)"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)} // Update end time state
        />
        <button onClick={addCaption}>Add Caption</button>{" "}
        {/* Add caption button */}
      </div>
      <div className="captions-list">
        <h2>Captions List</h2>
        <ul>
          {captions.map((caption, index) => (
            <li key={index}>
              <span>
                {caption.start}s - {caption.end}s: {caption.text}
              </span>
              <button
                onClick={() =>
                  setCaptions(captions.filter((_, i) => i !== index))
                }
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default VideoPlayer;
