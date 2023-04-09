import { useState, useRef } from "react";
import ReactPlayer from "react-player";
import { Box, Button } from "@mui/material";

const VideoPlayer = () => {
  const [cropWidth, setCropWidth] = useState(50);
  const [cropHeight, setCropHeight] = useState(28);
  const [marginTop, setMarginTop] = useState(0);
  const [marginLeft, setMarginLeft] = useState(0);
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

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    const delta = event.deltaY > 0 ? -10 : 10;

    setCropWidth(Math.max(10, cropWidth + delta));
    setCropHeight(Math.max(10, cropHeight + (delta * 286) / 500));
    setZoomWidth(250000 / cropWidth);
    setZoomHeight((286 * 286) / cropHeight);
    setZoomMT((marginTop / cropHeight) * 286);
    setZoomML((marginLeft / cropWidth) * 500);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    let deltaX = event.clientX - 20;
    let deltaY = event.clientY - 20;
    
    setMarginTop(deltaY);
    setMarginLeft(deltaX);
    setZoomMT((deltaY / cropHeight) * 286);
    setZoomML((deltaX / cropWidth) * 500);
    setZoomWidth(250000 / cropWidth);
    setZoomHeight((286 * 286) / cropHeight);
  };

  return (
    <Box mt="20px" ml="20px" display="flex" flexDirection="column">
      <Box display="flex" overflow="hidden">
        <Box
          position="relative"
          width="500px"
          height="286px"
          onMouseMove={handleMouseMove}
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
            onWheel={handleWheel}
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
      </Box>
    </Box>
  );
};

export default VideoPlayer;
