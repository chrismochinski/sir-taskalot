import { createStyles } from "@mantine/core";

const STAMP_REGION = 25;

export const useDragRegionsStyles = createStyles(() => ({
  dragRegion: {
    position: "absolute",
    WebkitAppRegion: "drag",
    zIndex: 2,
  },

  // ONBOARDING DRAG REGIONS

  onboardLeft: {
    background: "pink",
    left: 0,
    top: 0,
    bottom: 0,
    width: "30px",
  },

  onboardRight: {
    background: "pink",
    right: 0,
    top: 0,
    bottom: "45px",
    width: "45px",
  },

  onboardTop: {
    background: "pink",
    top: 0,
    left: 0,
    right: 0,
    height: "175px",
  },

  onboardBottom: {
    background: "pink",
    bottom: 0,
    left: 0,
    right: "45px", // space for help and info buttons
    height: "170px",
  },

  // FORM VIEW DRAG REGIONS

  formLeft: {
    background: "yellow",
    left: 0,
    top: 0,
    bottom: 0,
    width: "49px",
  },

  formRight: {
    background: "yellow",
    right: 0,
    top: 0,
    bottom: "40px",
    width: "49px",
  },

  formTop: {
    background: "yellow",
    top: 0,
    left: 0,
    right: 0,
    height: "25px",
  },
  formBottom: {
    background: "yellow",
    bottom: 0,
    left: 0,
    right: "50px",
    height: "25px",
  },

  // STAMP VIEW DRAG REGIONS

  stampTop: {
    background: "orange",
    top: 0,
    left: 0,
    right: 0,
    height: `${STAMP_REGION}px`,
  },
  stampBottom: {
    background: "orange",
    bottom: 0,
    left: 0,
    right: 0,
    height: `${STAMP_REGION}px`,
  },
  stampLeft: {
    background: "orange",
    top: 0,
    bottom: 0,
    left: 0,
    width: `${STAMP_REGION}px`,
  },
  stampRight: {
    background: "orange",
    top: 0,
    bottom: 0,
    right: 0,
    width: `${STAMP_REGION}px`,
  },
}));
