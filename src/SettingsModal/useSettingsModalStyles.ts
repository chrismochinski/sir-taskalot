import { createStyles } from "@mantine/core";
import { colors } from "../Globals";

export const useSettingsModalStyles = createStyles(() => ({
  settingsModal: {
    zIndex: 20,
    WebkitAppRegion: "no-drag",
    "& .mantine-Paper-root": {
      maxWidth: "400px",

      "& .mantine-Modal-header": {
        h2: {
          display: "inline-block",
          fontFamily: '"BioRhyme", serif',
          fontSize: "1.25rem",
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
        height: "300px",
        width: "100%",
      },
    },
  },

  modalInner: {
    padding: "0 1rem 0.75rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    height: "100%",
    WebkitAppRegion: "no-drag",
    svg: {
      WebkitAppRegion: "no-drag",
    },

    h3: {
      fontSize: "22px",
      fontWeight: 700,
      fontFamily: '"BioRhyme", serif',
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
  },

  modalFlexRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },

  settingTitleAndSwitch: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
  },

  radioGroup: {
    width: "100%",
    

    "& .mantine-RadioGroup-label": {
      fontSize: "16px",
      fontWeight: 600,
      fontFamily: '"Archivo", sans-serif',
      color: `${colors.black}`,
      textWrap: "pretty",
      WebkitAppRegion: "no-drag",
      lineHeight: 'normal',
    },

    '& .mantine-RadioGroup-description': {
      fontFamily: '"Roboto", sans-serif',
      fontSize: "13px",
      lineHeight: 'normal',
      color: `${colors.darkGray}`,
      fontStyle: "italic",
    },
  },

  innerRadioGroup: {
    width: "100%",
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    label: {
      paddingLeft: '0.35rem',
    }
  },
}));
