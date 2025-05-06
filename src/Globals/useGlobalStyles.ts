import { createStyles } from "@mantine/core";

export const bounce = "cubic-bezier(0.12, 1.22, 0.63, 1.8)";
export const textVisibilityShadow =
  "0.03em 0.03em 0.1em #FFFFFF42, -0.03em -0.03em 0.1em #FFFFFF42, 0.03em -0.03em 0.1em #FFFFFF42, -0.03em 0.03em 0.1em #FFFFFF42";

// create color scheme object called "colors" to export and import into other files
export const colors = {
  purple: "#5E3393",
  navy: "#0D3258",
  red: "#FF4658",
  green: "#41E894",
  lightGreen: "#DEFCEE",
  lightBlue: "#C1EAFF",
  lightOrange: "#FCE6D8",
  white: "#ffffff",
  black: "#000000",
};

export const useGlobalStyles = createStyles(() => ({
  appWrapper: {
    position: "relative",
    backgroundColor: "#FFF",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    background: colors.lightGreen,
    // paddingInline: "max(3vw, (100vw - 1280px)/2)", // revisit // deletelater
    height: "850px",
    width: "600px",
    "& h1, & h2, & h3, & h4, & h5, & h6, & a ": {
      WebkitAppRegion: "no-drag",
      zIndex: 10,
    },
    h1: {
      fontFamily: '"BioRhyme", serif',
      fontWeight: 800,
      textWrap: "balance",
      textAlign: "left",
      color: "#000",
      fontSize: "clamp(1.75rem, 6vw, 2.25rem)",
      letterSpacing: "0.02em",
      textShadow: textVisibilityShadow,
    },

    // onboarding title
    h2: {
      fontFamily: '"BioRhyme", serif',
      fontSize: "1.75rem",
      fontWeight: 800,
      textWrap: "balance",
      letterSpacing: "-0.35px",
      textShadow: textVisibilityShadow,
    },

    // just one question
    h3: {
      fontFamily: '"Roboto", sans-serif',
      fontWeight: 400,
      textWrap: "pretty",
      lineHeight: "1.4em",
      fontSize: "17px",
      marginBottom: 0,
      marginTop: "0.25em",
      letterSpacing: "0.02em",
    },

    // who are you?
    h4: {
      fontFamily: '"Roboto", sans-serif',
      fontWeight: 700,
      textWrap: "pretty",
      lineHeight: "1em",
      fontSize: "1.5rem",
      marginBlock: 0,
      textShadow: textVisibilityShadow,
    },

    h5: {
      fontFamily: '"Roboto", sans-serif',
      fontWeight: 400,
      textWrap: "pretty",
      marginInline: "auto",
      fontSize: "13px",
      color: colors.purple,
      opacity: 0.6,
      letterSpacing: "-0.0125em",
    },

    h6: {
      fontFamily: '"Roboto", sans-serif',
      fontWeight: 400,
      textWrap: "pretty",
      marginInline: "auto",
      textAlign: "center",
      lineHeight: "1.125em",
      color: colors.purple,
      fontSize: "13px",
      marginBlock: 0,
      paddingBlock: "0.02em 0.15em",
      a: {
        fontSize: "inherit",
        fontFamily: "inherit",
        fontWeight: 600,
        textDecoration: "none",
        cursor: "pointer",
        textShadow: "none",
        position: "relative",
        "&:hover": {
          textDecoration: "underline",
          textDecorationColor: "#5E3393",
          textUnderlineOffset: "0.185em",
          textDecorationThickness: "0.12em",
        },
      },
    },

    // basic small text, not much
    p: {
      fontStyle: "normal",
      textAlign: "left",
      fontFamily: '"Roboto", sans-serif',
      fontSize: "clamp(13px, 2.4vw, 15px)",
      lineHeight: "1.25em",
      fontWeight: 400,
      textWrap: "pretty",
      marginBlock: "0.175em",
      marginInline: "auto",
      textShadow: textVisibilityShadow,
    },
    input: {
      zIndex: 10,
      borderWidth: "1.5px",
      background: "#ffffff99",
      "&:focus": {
        borderColor: "#1D96D2",
      },
    },
    textArea: {
      borderWidth: "1.5px",
      background: "#ffffff99",
      "&:focus": {
        borderColor: "#1D96D2",
      },
    },
  },

  button: {
    backgroundColor: colors.red,
    fontFamily: '"Archivo", sans-serif',
    fontWeight: 700,
    color: "#ffffff",
    padding: "0.65em 1.4em",
    borderRadius: "64px",
    border: "none",
    cursor: "pointer",
    lineHeight: "1.25em",
    fontSize: "15px",
    transition: "transform 350ms ease-in-out, box-shadow 350ms ease-in-out",
    transformOrigin: "50%",
    "&:hover": {
      transition: "transform 180ms ease-in-out, box-shadow 180ms ease-in-out",
      backgroundColor: colors.red,
      transform: "scale(1.03)",
      boxShadow: "2px 4px 12px rgb(0 0 0 / 35%)",
    },
  },

  blobWrapper: {
    width: "600px",
    height: "850px",
    position: "absolute",
    inset: 0,
    zIndex: 0,
    transform: "scale(1.1, 0.7) translate(-25vw, -55vh) rotate(2deg)",
    transformOrigin: "50% 50%",
    animation: "blob 34000ms ease-in-out infinite",
    animationPlayState: "running",
    "&.paused": {
      animationPlayState: "paused",
    },

    svg: {
      width: "clamp(360px, 80%, 720px)",
      inset: "-8% 0 0 -10%",
      height: "clamp(300px, 82%, 700px)",
      fill: "#41E894",
      "@keyframes blob": {
        "0%": { transform: "scale(1.1, 0.7) translate(-25vw, -55vh) rotate(2deg)" },
        "12%": { transform: "scale(1.2, 0.9) translate(19vw, -18vh) rotate(45deg)" },
        "13%": { transform: "scale(1.2, 0.9) translate(19vw, -18vh) rotate(45deg)" },
        "24%": { transform: "scale(0.9, 1.2) translate(4vw, 32vh) rotate(110deg)" },
        "25%": { transform: "scale(0.9, 1.2) translate(4vw, 32vh) rotate(110deg)" },
        "36%": { transform: "scale(1.2, 1.0) translate(-15vw, 20vh) rotate(-30deg)" },
        "37%": { transform: "scale(1.2, 1.0) translate(-15vw, 20vh) rotate(-30deg)" },
        "48%": { transform: "scale(0.9, 1.4) translate(31vw, -9vh) rotate(-73deg)" },
        "49%": { transform: "scale(0.9, 1.4) translate(31vw, -9vh) rotate(-73deg)" },
        "60%": { transform: "scale(1.3, 1.0) translate(-23vw, -20vh) rotate(80deg)" },
        "61%": { transform: "scale(1.3, 1.0) translate(-23vw, -20vh) rotate(80deg)" },
        "72%": { transform: "scale(0.8, 1.3) translate(8vw, 9vh) rotate(160deg)" },
        "73%": { transform: "scale(0.8, 1.3) translate(8vw, 9vh) rotate(160deg)" },
        "84%": { transform: "scale(1.1, 1.2) translate(23vw, -4vh) rotate(-60deg)" },
        "85%": { transform: "scale(1.1, 1.2) translate(23vw, -4vh) rotate(-60deg)" },
        "100%": { transform: "scale(1.1, 0.7) translate(-25vw, -55vh) rotate(2deg)" },
      },
    },
  },

  infoButton: {
    position: "absolute",
    bottom: "0.4rem",
    right: "0.7rem",
    cursor: "pointer",
    zIndex: 10,
    "& svg": {
      fill: colors.purple,
      stroke: colors.purple,
      "&:first-of-type": {
        opacity: 0,
        position: "absolute",
        borderRadius: "50%",
      },
      "&:last-of-type": {
        opacity: 0.7,
      },
    },

    "&:hover > svg:first-of-type": {
      opacity: 0.9,
    },
    "&:hover > svg:last-of-type": {
      opacity: 0,
    },
  },

  // manually added to several sections of page edges
  // to eliminate header bar (removed via main.cjs)
  dragRegion: {
    WebkitAppRegion: "drag",
    position: "absolute",
    zIndex: -10,
    "&#left": {
      left: 0,
      top: 0,
      bottom: 0,
      height: "100%",
      background: "transparent",
      width: "95px",
    },
    "&#right": {
      right: 0,
      top: 0,
      bottom: 0,
      height: "94%",
      background: "transparent",
      width: "95px",
    },
    "&#form-bottom": {
      bottom: 0,
      left: 0,
      right: "80px", // space for help and info buttons
      height: "70px",
      background: "transparent",
    },
    "&#form-top": {
      top: 0,
      left: 0,
      right: 0, // space for help and info buttons
      height: "40px",
      background: "transparent",
    },
    "&#onboard-top": {
      top: 0,
      left: 0,
      right: 0,
      height: "50vh",
      background: "transparent",
    },
    "&#onboard-bottom": {
      bottom: 0,
      left: 0,
      right: "80px", // space for help and info buttons
      height: "30vh",
      background: "transparent",
    },
  },

}));
