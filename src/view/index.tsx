import { useState, useRef } from "react";
import ReactPlayer from "react-player";
import { Box, Button } from "@mui/material";

const VideoPlayer = () => {
  const [cropWidth, setCropWidth] = useState(50);
  const [cropHeight, setCropHeight] = useState(28);
  const [cropStartX, setCropStartX] = useState(20);
  const [cropStartY, setCropStartY] = useState(20);
  const [down, setDown] = useState(false);
  const [rightDown, setRightDown] = useState(false);
  const [prevWidth, setPrevWidth] = useState(0);
  const [prevHeight, setPrevHeight] = useState(0);
  const [marginTop, setMarginTop] = useState(0);
  const [marginLeft, setMarginLeft] = useState(0);
  const [prevMT, setPrevMT] = useState(0);
  const [prevML, setPrevML] = useState(0);
  const [zoomWidth, setZoomWidth] = useState(5000);
  const [zoomHeight, setZoomHeight] = useState(2860);
  const [zoomMT, setZoomMT] = useState(0);
  const [zoomML, setZoomML] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(0);

  const player1Ref = useRef<ReactPlayer | null>(null);
  const player2Ref = useRef<ReactPlayer | null>(null);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleProgress = (state: any) => {
    setPlayed(state.played);
  };

  const handleClickSync = () => {
    if (player1Ref.current && player2Ref.current) {
      player2Ref.current.seekTo(played);
    }
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    
  };

  const handleMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    let deltaX = event.clientX - cropStartX;
    let deltaY = event.clientY - cropStartY;
    if (down) {
      if (deltaY / deltaX > 286 / 500) {
        deltaX = (deltaY * 500) / 286;
      } else {
        deltaY = (deltaX * 286) / 500;
      }
      setCropWidth(prevWidth + deltaX);
      setCropHeight(prevHeight + deltaY);
      setZoomWidth(250000 / cropWidth);
      setZoomHeight((286 * 286) / cropHeight);
      setZoomMT((marginTop / cropHeight) * 286);
      setZoomML((marginLeft / cropWidth) * 500);
    } else {
      setMarginTop(deltaY);
      setMarginLeft(deltaX);
      setZoomMT((deltaY / cropHeight) * 286);
      setZoomML((deltaX / cropWidth) * 500);
    }
  };

  const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <Box mt="20px" ml="20px" display="flex" flexDirection="column">
      <Box display="flex" overflow="hidden">
        <Box
          position="relative"
          onContextMenu={handleContextMenu}
          width="500px"
          height="286px"
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          <ReactPlayer
            ref={player1Ref}
            url="./video.mp4"
            playing={playing}
            controls
            width="100%"
            height="100%"
            onProgress={handleProgress}
          />
          <Box
            position="absolute"
            top={`${marginTop}px`}
            left={`${marginLeft}px`}
            width={cropWidth}
            height={cropHeight}
            sx={{
              border: "2px dotted red",
              borderRadius: "2px",
            }}
          />
        </Box>
        <Box ml="20px" width="500px" height="286px" overflow="hidden">
          <Box ml={`-${zoomML}px`} mt={`-${zoomMT}px`}>
            <ReactPlayer
              ref={player2Ref}
              url="./video.mp4"
              playing={playing}
              controls
              width={zoomWidth}
              height={zoomHeight}
            />
          </Box>
        </Box>
      </Box>
      <Box mt="30px">
        <Button variant="contained" color="success" onClick={handlePlayPause}>
          {playing ? "Pause" : "Play"}
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={handleClickSync}
          sx={{ ml: "12px" }}
        >
          Sync video 2
        </Button>
      </Box>
    </Box>
  );
};

export default VideoPlayer;
