import { createStyles } from "@mantine/core";

export const useDragonButtonStyles = createStyles(() => ({
  dragonButton: {
    cursor: "pointer",
    flex: 0,
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 0,
    svg: {
      "&#dragon-bot": {
        transformOrigin: "50% 50%",
        transform: "scale(1)",
        transition: "transform 100ms ease-out",
        // revisit hover stuff?? tweaks?
      },

      "&#arrows": {
        transition: "transform 100ms ease-out",
        transformOrigin: "50% 50%",
        transform: "translate(-50%, -50%) scale(0.9)",
        position: "absolute",
        left: "50%",
        top: "50%",
        margin: "auto",
        path: {
          transition: "fill 100ms ease-out",
          fill: "#00000000",
          stroke: "black",
        },
      },
    },

    "&:hover": {
      svg: {
        "&#dragon-bot": {
          transform: " scale(1.05)",
          "& #mouths": {
            "& #smile": {
              opacity: 0,
            },
            "& #open-smile": {
              opacity: 1,
            },
          },
        },
        "&#arrows": {
          transform: "translate(-50%, -50%) scale(1)",
          path: {
            opacity: 1,
            fill: "#000000",
          },
        },
      },
    },
  },
}));
