import { createStyles } from "@mantine/core";

export const useOnboardingStyles = createStyles(() => ({
  onboardingWrapper: {
    height: "850px",
    width: "600px",
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    zIndex: 2,
    input: {
        backgroundColor: "#ffffffcc",
        backdropFilter: "blur(8px)",
    },
  },

  highlightSpan: {
    fontFamily: "inherit",
    fontSize: "inherit",
    fontWeight: 520,
    color: "white",
    background: "#1D96D2",
    padding: "0.015em 0.18em 0.1em",
    marginInline: '-0.075em',
    
  },

  goButton: {
    transition: "all 400ms ease-in-out",
    opacity: 1,
    zIndex: 0,
    height: '2.25em',
    paddingBlock: '0',
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
