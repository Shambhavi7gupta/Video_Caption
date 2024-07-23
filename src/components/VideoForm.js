import React, { useState } from "react";

const VideoForm = ({ onSubmit }) => {
  const [videoUrl, setVideoUrl] = useState("");
  const [currentCaption, setCurrentCaption] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(videoUrl, {
      text: currentCaption,
      start: parseFloat(startTime),
      end: parseFloat(endTime),
    });
    setCurrentCaption("");
    setStartTime("");
    setEndTime("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter video URL"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter caption text"
        value={currentCaption}
        onChange={(e) => setCurrentCaption(e.target.value)}
      />
      <input
        type="number"
        placeholder="Start time (seconds)"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <input
        type="number"
        placeholder="End time (seconds)"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      />
      <button type="submit">Add Caption</button>
    </form>
  );
};

export default VideoForm;
