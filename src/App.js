import React, { useState } from "react";
import videojs from "video.js";
import "videojs-youtube";
import "video.js/dist/video-js.css";
import "./App.css";
import defaultSubtitle from "./defaultSubtitle";

function App() {
  const [videoUrl, setVideoUrl] = useState("https://youtu.be/Gjnup-PuquQ");
  const [videoType, setVideoType] = useState("video/youtube");
  const [videoSubtitles, setVideoSubtitles] = useState(defaultSubtitle);

  const handleUrlFetch = () => {
    let player = videojs.players["video-player-id-1"];
    player.poster(null);
    player.src({ src: videoUrl, type: videoType });
  };

  const readFileContent = async (e) => {
    const reader = new FileReader();
    try {
      const file = e.target.files[0];
      if (!file) return;

      const data = await new Promise((resolve, reject) => {
        reader.onload = (event) => resolve(event.target.result);
        reader.onerror = (error) => reject(error);
        reader.readAsText(file);
      });
      setVideoSubtitles(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getSubtitleFileUrl = () => {
    const file = new File([videoSubtitles], "default.vtt");
    const fileUrl = URL.createObjectURL(file);
    return fileUrl;
  };

  const applyCaptions = () => {
    const url = getSubtitleFileUrl();

    let player = videojs.players["video-player-id-1"];
    const lastTrack = player.textTracks().tracks_[0];

    player.removeRemoteTextTrack(lastTrack);

    player.addRemoteTextTrack({
      kind: "subtitles",
      srcLang: "en",
      label: "Default",
      default: true,
      src: url,
      mode: "showing",
    });
  };

  return (
    <div className="App">
      <div className="column1">
        <div className="appHeader">
          <div className="appHeaderLabelContainer">
            <span>Video Type:</span>
            <label>
              <input
                type="radio"
                name={"mp4"}
                checked={videoType === "video/mp4"}
                onChange={() => {
                  setVideoType("video/mp4");
                }}
              />
              MP4
            </label>
            <label>
              <input
                type="radio"
                name={"webm"}
                checked={videoType === "video/webm"}
                onChange={() => {
                  setVideoType("video/webm");
                }}
              />
              WEBM
            </label>
            <label>
              <input
                type="radio"
                name={"youtube"}
                checked={videoType === "video/youtube"}
                onChange={() => {
                  setVideoType("video/youtube");
                }}
              />
              YouTube
            </label>
          </div>
          <div className="appHeaderUrlContainer">
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
            <div className="fetchButton" onClick={handleUrlFetch}>
              Fetch
            </div>
          </div>
        </div>

        <div className="videoContainer">
          <video
            id="video-player-id-1"
            className="video-js vjs-default-skin "
            controls={true}
            autoPlay={true}
            width="1040"
            // height="720"
            data-setup={JSON.stringify({
              techOrder: ["youtube", "html5"],
              youtube: {
                ytControls: 0,
                disablekb: 1,
              },
            })}
          >
            <source src={videoUrl} type={videoType}></source>
            <track
              id={"video-track-id"}
              kind="subtitles"
              src={getSubtitleFileUrl()}
              srcLang="en"
              label="Default"
              default={true}
            />
          </video>
        </div>
      </div>
      <div className="column2">
        <div className="uploadCaptions">
          <span>Upload Captions:</span>
          <input
            type="file"
            name="file"
            id="uploadCaptions"
            onChange={readFileContent}
          />
        </div>

        <textarea
          value={videoSubtitles}
          onChange={(e) => setVideoSubtitles(e.target.value)}
        />

        <div className="applyCaptions" onClick={applyCaptions}>
          Apply Captions
        </div>
      </div>
    </div>
  );
}

export default App;
