import { createStyles } from "@mantine/core";

export const bounce = "cubic-bezier(0.12, 1.22, 0.63, 1.8)";

export const useGlobalStyles = createStyles(() => ({
  appWrapper: {
    position: "relative",
    backgroundColor: "#FFF",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    background: "#DEFCEE",
    paddingInline: "max(3vw, (100vw - 1280px)/2)",
    height: "850px",
    width: "600px",
    h1: {
      fontFamily: '"BioRhyme", serif',
      fontWeight: 800,
      textWrap: "balance",
      textAlign: "left",
      color: "#000",
      fontSize: "clamp(1.75rem, 6vw, 2.25rem)",
      letterSpacing: "0.02em",
      textShadow:
        "1px 1px 5px #FFFFFF40, -1px -1px 5px #FFFFFF40, 1px -1px 5px #FFFFFF40, -1px 1px 5px #FFFFFF40",
    },

    // onboarding title
    h2: {
      fontFamily: '"BioRhyme", serif',
      fontSize: "1.6rem",
      fontWeight: 800,
      textWrap: "balance",
      letterSpacing: "-0.35px",
    },

    // just one question
    h3: {
      fontFamily: '"Roboto", sans-serif',
      fontWeight: 300,
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
      lineHeight: "1.25em",
      fontSize: "1.4rem",
      marginBlock: 0,
    },

    h6: {
      fontFamily: '"Roboto", sans-serif',
      fontWeight: 400,
      textWrap: "pretty",
      marginInline: "auto",
      textAlign: "center",
      lineHeight: "1.125em",
      color: "#1D96D2",
      fontSize: "13px",
      marginBlock: 0,
      a: {
        fontSize: "inherit",
        fontFamily: "inherit",
        fontWeight: 600,
        textDecoration: "none",
        cursor: "pointer",
        "&:hover": {
          textDecoration: "underline",
          textDecorationColor: "#1D96D270",
          textUnderlineOffset: "0.17em",
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
    backgroundColor: "#ff4658",
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
      backgroundColor: "#ff4658",
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
    animation: "blob 32000ms ease-in-out infinite",
    transformOrigin: "50% 50%",
    svg: {
      width: "clamp(360px, 80%, 720px)",
      inset: "-8% 0 0 -10%",
      height: "clamp(300px, 82%, 700px)",
      fill: "#41E894",
      "@keyframes blob": {
        "0%": { transform: "scale(1) translate(-16vw, -30vh) rotate(0deg)" },
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
        "100%": { transform: "scale(1) translate(-16vw, -30vh) rotate(0deg)" },
      },
    },
  },

  // manually added to several sections of page edges
  // to eliminate header bar (removed via main.cjs)
  dragRegion: {
    WebkitAppRegion: "drag",
    position: "absolute",
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
      height: "100%",
      background: "transparent",
      width: "95px",
    },
    "&#bottom": {
      bottom: 0,
      left: 0,
      right: 0,
      height: "60px",
      background: "transparent",
    },
  },
}));
