import { createStyles } from "@mantine/core";
import { colors } from "../Globals/";

export const useOnboardingStyles = createStyles(() => ({
  onboardingWrapper: {
    height: "750px",
    width: "500px",
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    zIndex: 2,
    input: {
      backgroundColor: "#ffffffde",
      backdropFilter: "blur(8px)",
    },
  },

  highlightSpan: {
    fontFamily: "inherit",
    fontSize: "inherit",
    fontWeight: 500,
    color: "white",
    background: colors.purple,
    padding: "0.015em 0.18em 0.1em",
    marginInline: "-0.075em",
    textShadow: "none",
  },

  goButton: {
    transition: "all 275ms ease-in-out",
    opacity: 1,
    zIndex: 0,
    height: "2.25em",
    paddingBlock: "0",
    filter: "blur(0)",
    transformOrigin: "50% 0%",
    transform: "scaleY(1) scaleX(1) translateY(0)",
    "&:disabled": {
      filter: "blur(7px)",
      opacity: 0,
      transform: "scaleY(0.4) scaleX(1.75) translateY(-25px)",
      cursor: "not-allowed",
    },
  },
}));
