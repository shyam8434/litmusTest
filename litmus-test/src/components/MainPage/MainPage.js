import React, { useState, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import Room from "../../Assets/1202.jpg";
import Map from "../../Assets/map.jpg";
import Song from "../../Assets/music.mp3";
import "./main.style.css";
import { useDispatch } from "react-redux";
import { setHomeData } from "../../AppConfig/Store/actions";

const MainPage = () => {
  const dispatch = useDispatch();
  const [viewMap, setViewMap] = useState(false);
  const [doorUnlock, setDoorunlock] = useState(false);
  const [key, setKeyPosition] = useState({
    top: "60%",
    left: "45%",
  });
  const [ripple, setRipple] = useState({
    door1: false,
    door2: false,
  });

  const data = useSelector((state) => state.appCommon.data);
  console.log(data);
  const mainRef = useRef();
  const audioRef = useRef();

  const hanldeClickDoorOpen = () => {
    if (!doorUnlock) {
      return;
    }
    dispatch(setHomeData(data.count + 1));

    setViewMap(true);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const handleMusicPlay = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, [audioRef]);

  const handleOnBack = () => {
    setViewMap(false);
    setDoorunlock(false);
    setKeyPosition({
      top: "60%",
      left: "45%",
    });
  };

  const onDragKey = (evt) => {
    if (MainPage.draggable && mainRef.current) {
      let xPos = (evt.pageX * 100) / mainRef.current.offsetWidth - 3;
      let yPos = (evt.pageY * 100) / mainRef.current.offsetHeight - 5;
      let elemnets = document.elementsFromPoint(evt.pageX, evt.pageY);
      setKeyPosition({
        left: "" + xPos + "%",
        top: "" + yPos + "%",
      });
      for (var index = 0; index < elemnets.length; index++) {
        if (elemnets[index].id === "door1") {
          setRipple({
            ...ripple,
            door1: true,
          });
          return;
        }
        if (elemnets[index].id === "door2") {
          setRipple({
            ...ripple,
            door2: true,
          });
          return;
        }
        if (elemnets[index].id === "dropTarget") {
          MainPage.draggable = false;
          setKeyPosition({
            left: "17px",
            top: "10px",
          });
          setDoorunlock(true);
        }
      }
      setRipple({
        door1: false,
        door2: false,
      });
    }
  };

  return (
    <>
      {viewMap ? (
        <div className="mainContainer">
          <img src={Map} alt="NoImage" width="100%"></img>
          <div className="mapContainer">
            <div className="indiaContainer" onClick={handleOnBack}>
              <div className="ripleContainer">
                <div className="mapRipple" />
              </div>
              India
            </div>
            <div className="visaContainer">
              <div className="ripleContainer">
                <div className="mapRipple" />
              </div>
              Visa
            </div>
          </div>
        </div>
      ) : (
        <div className="mainContainer" ref={mainRef} onClick={handleMusicPlay}>
          <img src={Room} alt="NoImage" width="100%"></img>
          <div id="dropTarget" className="accessContainer" />
          <span className="dataCount">{`Visited: ${data.count}`}</span>
          <div
            id="door1"
            className="door1"
            onMouseOut={(evt) => {
              setRipple({ ...ripple, door1: false });
              evt.preventDefault();
            }}
            onMouseOver={() => {
              setRipple({ ...ripple, door1: true });
            }}
            onClick={hanldeClickDoorOpen}
          />
          {ripple.door1 && <div className={"doorRipple1"} />}
          <div
            id="door2"
            className="door2"
            onMouseOut={(evt) => {
              setRipple({ ...ripple, door2: false });
              evt.preventDefault();
            }}
            onMouseOver={() => {
              setRipple({ ...ripple, door2: true });
            }}
            onClick={hanldeClickDoorOpen}
          />
          {ripple.door2 && <div className={"doorRipple2"} />}
          <div
            className="keyContainer"
            style={{
              top: key.top,
              left: key.left,
            }}
            onMouseDown={() => {
              MainPage.draggable = true;
            }}
            onMouseMove={(evt) => {
              onDragKey(evt);
            }}
            onMouseUp={() => {
              MainPage.draggable = false;
            }}
          />
          <audio autoPlay={true} src={Song} controls={false} ref={audioRef} />
        </div>
      )}
    </>
  );
};

export default MainPage;
