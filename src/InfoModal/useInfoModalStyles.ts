import { createStyles } from "@mantine/core";
import { colors } from "../Globals";

export const useInfoModalStyles = createStyles(() => ({
  infoModal: {
    zIndex: 20,
    WebkitAppRegion: "no-drag",
    "& .mantine-Paper-root": {
      maxWidth: "400px",
      height: "530px",
      "& .mantine-Modal-header": {
        h2: {
          display: "inline-block",
          fontFamily: '"BioRhyme", serif',
          fontSize: "1.375rem",
          fontWeight: 700,
          textWrap: "balance",
          letterSpacing: "-0.015em",
        },
        button: {
          WebkitAppRegion: "no-drag",
          cursor: "pointer",
          backgroundColor: "#fff",
          borderRadius: "50%",
          background: colors.white,
          height: "calc(1rem + 4px)",
          minHeight: "calc(1rem + 4px)",
          width: "calc(1rem + 4px)",
          minWidth: "calc(1rem + 4px)",
          padding: "2px",
          stroke: colors.purple,
          "&:hover": {
            background: colors.purple,
            svg: {
              stroke: "#FFF",
            },
          },
        },
      },
      "& .mantine-Modal-body": {
        height: "480px",
        width: "100%",
      },
    },
  },

  modalInner: {
    padding: "0 0.75rem 0.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "flex-start",
    width: "100%",
    height: "100%",
    WebkitAppRegion: "no-drag",
    svg: {
      WebkitAppRegion: "no-drag",
    },

    h3: {
      fontSize: "18px",
      fontWeight: 800,
      fontFamily: '"Archivo", sans-serif',
      color: `${colors.black}`,
      marginBlock: 0,
      lineHeight: "1.175em",
      textWrap: "balance",
      WebkitAppRegion: "no-drag",
    },
    h4: {
      fontSize: "16px",
      fontWeight: 700,
      fontFamily: '"Archivo", sans-serif',
      color: `${colors.black}`,
      marginBlock: 0,
      lineHeight: "1.175em",
      textWrap: "balance",
      WebkitAppRegion: "no-drag",
    },
    p: {
      fontSize: "13px",
      fontWeight: 400,
      fontFamily: '"Roboto", sans-serif',
      color: `${colors.black}`,
      marginBlock: 0,
      lineHeight: "1.15em",
      textWrap: "pretty",
      WebkitAppRegion: "no-drag",
    },
    button: {
      WebkitAppRegion: "no-drag",
    },
  },

  modalTopFlexRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    gap: "0.25rem",
    svg: {
      flexBasis: "22%",
      maxWidth: "22%",
    },
  },

  modalFlexRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    gap: "0.5rem",
    svg: {
      flexBasis: "14%",
      maxWidth: "14%",
    },
  },

  modalDragonBotImage: {
    flexBasis: "14%",
    maxWidth: "14%",
  },

  modalTextBox: {
    flex: 1,
  },
}));
