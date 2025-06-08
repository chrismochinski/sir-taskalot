import { createStyles } from "@mantine/core";

export const useDragRegionsStyles = createStyles(() => ({
  dragRegion: {
    position: "absolute",
    WebkitAppRegion: "drag",
    zIndex: 2,
    background: "transparent",
  },

  // ONBOARDING DRAG REGIONS

  onboardLeft: {
    left: 0,
    top: 0,
    bottom: 0,
    width: "30px",
  },

  onboardRight: {
    right: 0,
    top: 0,
    bottom: "45px",
    width: "45px",
  },

  onboardTop: {
    top: 0,
    left: 0,
    right: "80px", // modal close x
    height: "170px",
  },

  onboardBottom: {
    bottom: 0,
    left: 0,
    right: "45px", // space for help and info buttons
    height: "170px",
  },

  // FORM VIEW DRAG REGIONS

  formLeft: {
    left: 0,
    top: 0,
    bottom: 0,
    width: "29px",
  },

  formRight: {
    right: 0,
    top: 0,
    bottom: "40px",
    width: "29px",
  },

  formTop: {
    top: 0,
    left: 0,
    right: 0,
    height: "25px",
  },
  formBottom: {
    bottom: 0,
    left: 0,
    right: "50px",
    height: "25px",
  },

  // STAMP VIEW DRAG REGIONS

  stampTop: {
    top: 0,
    left: 0,
    right: 0,
    height: "30px",
  },
  stampBottom: {
    bottom: 0,
    left: 0,
    right: 0,
    height: "10px",
  },
  stampLeft: {
    top: 0,
    bottom: 0,
    left: 0,
    width: "14px",
  },
  stampRight: {
    top: 0,
    bottom: 0,
    right: 0,
    width: "14px",
  },
}));
