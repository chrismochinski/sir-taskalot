import { createStyles } from "@mantine/core";
import { DragRegionsProps } from ".";

export const useDragRegionsStyles = createStyles((_, { reporter }: DragRegionsProps) => ({
  dragRegion: {
    WebkitAppRegion: "drag",
    position: "absolute",
    zIndex: 0,
    "&#left": {
      left: 0,
      top: 0,
      bottom: 0,
      height: "100%",
      background: "pink",
      width: reporter ? "50px" : "100px",
    },
    "&#right": {
      right: 0,
      top: "40px",
      bottom: "40px",
      background: "pink",
      width: reporter ? "50px" : "100px",
    },
    "&#form-bottom": {
      bottom: 0,
      left: 0,
      right: "50px", // space for help and info buttons
      height: "45px",
      background: "pink",
      display: reporter ? "block" : "none",
    },
    "&#form-top": {
      top: 0,
      left: 0,
      width: "400px", // space for help and info buttons
      height: "40px",
      background: "pink",
      display: reporter ? "block" : "none",
    },
    "&#onboard-top": {
      top: "0px",
      left: 0,
      right: "84px",
      height: "48vh",
      background: "pink",
      display: reporter ? "none" : "block",
    },
    "&#onboard-bottom": {
      bottom: 0,
      left: 0,
      right: "50px", // space for help and info buttons
      height: "28vh",
      background: "pink",
      display: reporter ? "none" : "block",
    },
  },
}));
