import { createStyles } from "@mantine/core";
import { DIM } from ".";

interface GlobalStylesProps {
  isCollapsed?: boolean;
}

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
  lightBlue: "#C1EAFF", // light humility
  borderBlue: "#1D96D2", // dark humility
  lightOrange: "#FCE6D8",
  darkBlue: "#187DAF",
  darkOrange: "#FF6105",
  white: "#ffffff",
  black: "#000000",
  gray: "#D4D6D8", // border gray
  lightGray: "#F7F7F7",
};

export const useGlobalStyles = createStyles((_, { isCollapsed }: GlobalStylesProps) => ({
  appWrapper: {
    position: "relative",
    backgroundColor: "#FFF",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    background: colors.lightGreen,

    height: isCollapsed ? DIM.stamp : DIM.height,
    width: isCollapsed ? DIM.stampWidth : DIM.width,
    "& h1, & h2, & h3, & h4, & h5, & h6, & a ": {
      WebkitAppRegion: "no-drag",
      zIndex: 10,
    },
    h1: {
      display: "inline-block",
      fontFamily: '"BioRhyme", serif',
      fontWeight: 800,
      textWrap: "balance",
      textAlign: "left",
      color: "#000",
      fontSize: "clamp(1.65rem, 5.8vw, 2rem)",
      letterSpacing: "0.02em",
      textShadow: textVisibilityShadow,
      lineHeight: "1em",
    },

    // onboarding title
    h2: {
      display: "inline-block",
      fontFamily: '"BioRhyme", serif',
      fontSize: "1.6rem",
      fontWeight: 800,
      textWrap: "balance",
      letterSpacing: '-0.015em',

      textShadow: textVisibilityShadow,
    },

    // just one question
    h3: {
      fontFamily: '"Roboto", sans-serif',
      fontWeight: 400,
      textWrap: "pretty",
      lineHeight: "1.4em",
      fontSize: "16px",
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
      fontSize: "1.25rem",
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
          textUnderlineOffset: "0.175em",
          textDecorationThickness: "0.1em",
        },
      },
    },

    // basic small text, not much
    p: {
      fontStyle: "normal",
      textAlign: "left",
      fontFamily: '"Roboto", sans-serif',
      fontSize: "13px",
      lineHeight: "1.25em",
      fontWeight: 400,
      textWrap: "pretty",
      marginBlock: 0,
      marginInline: "auto",
      textShadow: textVisibilityShadow,
      // if it has any data-placeholder string attribute, make purple
      "&[data-placeholder]": {
        color: colors.black,
        fontFamily: '"Roboto", sans-serif', 
      },
    },
    input: {
      borderWidth: "1.5px",
      borderColor: colors.gray,
      background: "#ffffff99",
      paddingInline: "calc(2rem / 3)",
      "&:focus": {
        borderColor: "#1D96D2",
      },
      '&::placeholder': {
        color: colors.black,
        opacity: 0.4,
        fontFamily: '"Roboto", sans-serif', 
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

  trademark: {
    fontSize: "0.5em",
    verticalAlign: "super",
    fontFamily: '"Roboto", sans-serif',
    fontWeight: 500,
    lineHeight: "inherit",
    paddingLeft: "0.15em",
  },

  button: {
    backgroundColor: colors.red,
    fontFamily: '"Archivo", sans-serif',
    fontWeight: 700,
    color: "#ffffff",
    padding: "0em 1.5em",
    borderRadius: "64px",
    border: "none",
    cursor: "pointer",
    lineHeight: "1.25em",
    fontSize: "14px",
    height: "2.125rem",
    transition: "transform 250ms ease-in-out, box-shadow 250ms ease-in-out",
    transformOrigin: "50%",
    "&:hover": {
      transition: "transform 150ms ease-in-out, box-shadow 150ms ease-in-out",
      backgroundColor: colors.red,
      transform: "scale(1.03)",
      boxShadow: "1px 2px 8px rgb(0 0 0 / 30%)",
    },
  },

  blobWrapper: {
    width: DIM.width,
    height: DIM.height,
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
      height: "clamp(300px, 82%, 650px)",
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
    bottom: "0.25rem",
    right: "0.5rem",
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
    "&:before": {
      position: "absolute",
      content: "'Quick App Info'",
      top: "50%",
      transform: "translateY(-50%) translateX(-25px)",
      right: "116%",
      fontFamily: '"Roboto", sans-serif',
      fontWeight: 500,
      letterSpacing: "0.02em",
      fontSize: "12px",
      width: "max-content",
      color: colors.purple,
      transition: "transform 170ms ease-out, opacity 170ms ease-out",
      opacity: 0,
      pointerEvents: "none",
    },
    "&:hover": {
      "&:before": {
        transform: "translateY(-50%) translateX(0px)",
        opacity: 1,
      },
    },

    "&:hover > svg:first-of-type": {
      opacity: 0.9,
    },
    "&:hover > svg:last-of-type": {
      opacity: 0,
    },
  },
}));
