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

  const [start_hr, set_start_hr] = useState(0);
  const [start_min, set_start_min] = useState(0);
  const [start_sec, set_start_sec] = useState(0);
  const [start_ms, set_start_ms] = useState(0);
  const [stop_hr, set_stop_hr] = useState(0);
  const [stop_min, set_stop_min] = useState(0);
  const [stop_sec, set_stop_sec] = useState(0);
  const [stop_ms, set_stop_ms] = useState(0);

  const [subtitleToAdd, setSubtitleToAdd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleUrlFetch = () => {
    let player = videojs.players["video-player-id-1"];
    player.poster(null);
    player.src({ src: videoUrl, type: videoType });
  };

  const toVTT = (utf8str) => {
    const vttString = "WEBVTT FILE\r\n\r\n"; // leading text

    if (!utf8str) return vttString;

    const str = utf8str
      .replace(/\{\\([ibu])\}/g, "</$1>")
      .replace(/\{\\([ibu])1\}/g, "<$1>")
      .replace(/\{([ibu])\}/g, "<$1>")
      .replace(/\{\/([ibu])\}/g, "</$1>")
      .replace(/(\d\d:\d\d:\d\d),(\d\d\d)/g, "$1.$2")
      .concat("\r\n\r\n");

    return vttString.concat(str);
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

      if (file.name?.endsWith(".vtt")) {
        setVideoSubtitles(data);
      } else {
        setVideoSubtitles(toVTT(data));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getSubtitleFileUrl = (data) => {
    const file = new File([data], "default.vtt");
    const fileUrl = URL.createObjectURL(file);
    return fileUrl;
  };

  const applyCaptions = (data) => {
    const url = getSubtitleFileUrl(data);

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

  const setFuncObject = {
    start_hr: set_start_hr,
    start_min: set_start_min,
    start_sec: set_start_sec,
    start_ms: set_start_ms,
    stop_hr: set_stop_hr,
    stop_min: set_stop_min,
    stop_sec: set_stop_sec,
    stop_ms: set_stop_ms,
  };

  const maxLimitCheck = {
    start_hr: 0,
    start_min: 59,
    start_sec: 59,
    start_ms: 999,
    stop_hr: 0,
    stop_min: 59,
    stop_sec: 59,
    stop_ms: 999,
  };

  const handleTimeStampChange = async (e) => {
    const id = e.target.id;
    let value = e.target.value;

    const setFunc = setFuncObject[id];
    const maxLimit = maxLimitCheck[id];

    if (maxLimit && value > maxLimit) value = maxLimit;
    if (value < 0) value = 0;

    setFunc(value);
  };

  const handleAddSubtitle = () => {
    let errMsg = "";

    const startValue =
      ((start_hr * 60 + start_min) * 60 + start_sec) * 1000 + start_ms;

    const stopValue =
      ((stop_hr * 60 + stop_min) * 60 + stop_sec) * 1000 + stop_ms;

    if (startValue > stopValue) {
      errMsg = "Start Time should be less than End Time";
    } else if (startValue === stopValue) {
      errMsg = "Start Time should not be same as End Time";
    }

    if (!subtitleToAdd) {
      errMsg = "Caption should not be empty";
    }

    if (errMsg) {
      setErrMsg(errMsg);
      setTimeout(() => {
        setErrMsg("");
      }, 5000);

      return;
    }

    const digit2 = (n) => {
      const a = `00${n}`;
      return a.slice(-2);
    };

    const digit3 = (n) => {
      const a = `000${n}`;
      return a.slice(-3);
    };

    const newSubtitle = `
${start_sec}
${start_hr}:${digit2(start_min)}:${digit2(start_sec)}.${digit3(
      start_ms
    )} --> ${stop_hr}:${digit2(stop_min)}:${digit2(stop_sec)}.${digit3(stop_ms)}
${subtitleToAdd.trim()}
`;

    const addedSubtitle = videoSubtitles + newSubtitle;
    setVideoSubtitles(addedSubtitle);
    applyCaptions(addedSubtitle);
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
              src={getSubtitleFileUrl(videoSubtitles)}
              srcLang="en"
              label="Default"
              default={true}
            />
          </video>
        </div>

        <div className="addTimestamp">
          <div className="heading">Add Caption For A Time Stamp</div>
          <div className="timeRow">
            <span>Start Time </span>
            HH
            <input
              type="number"
              id="start_hr"
              min={0}
              value={start_hr}
              onChange={handleTimeStampChange}
            />
            :mm
            <input
              type="number"
              id="start_min"
              min={0}
              max={59}
              value={start_min}
              onChange={handleTimeStampChange}
            />
            :ss
            <input
              type="number"
              id="start_sec"
              min={0}
              max={59}
              value={start_sec}
              onChange={handleTimeStampChange}
            />
            .SSS
            <input
              type="number"
              id="start_ms"
              min={0}
              max={999}
              value={start_ms}
              onChange={handleTimeStampChange}
            />
          </div>
          <div className="timeRow">
            <span>End Time </span>
            HH
            <input
              type="number"
              id="stop_hr"
              min={0}
              value={stop_hr}
              onChange={handleTimeStampChange}
            />
            :mm
            <input
              type="number"
              id="stop_min"
              min={0}
              max={59}
              value={stop_min}
              onChange={handleTimeStampChange}
            />
            :ss
            <input
              type="number"
              id="stop_sec"
              min={0}
              max={59}
              value={stop_sec}
              onChange={handleTimeStampChange}
            />
            .SSS
            <input
              type="number"
              id="stop_ms"
              min={0}
              max={999}
              value={stop_ms}
              onChange={handleTimeStampChange}
            />
          </div>

          <div className="timeRow">
            <span> Caption:</span>
            <input
              type="text"
              value={subtitleToAdd}
              onChange={(e) => setSubtitleToAdd(e.target.value)}
            />
            <div className="addCaption" onClick={handleAddSubtitle}>
              +
            </div>
          </div>
          <div className="errorDiv">{errMsg}</div>
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

        <div
          className="applyCaptions"
          onClick={() => applyCaptions(videoSubtitles)}
        >
          Apply Captions
        </div>
      </div>
    </div>
  );
}

export default App;
