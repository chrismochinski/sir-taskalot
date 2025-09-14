import { createStyles } from "@mantine/core";
import { colors } from "../Globals";

const flexSectionTitleStyles = {
  fontSize: "17px",
  fontWeight: 600,
  fontFamily: '"Archivo", sans-serif',
  color: `${colors.black}`,
  textWrap: "pretty",
  WebkitAppRegion: "no-drag",
  lineHeight: "normal",
};

const flexSectionDescriptionStyles = {
  fontFamily: '"Roboto", sans-serif',
  fontSize: "12px",
  fontWeight: 400,
  lineHeight: "normal",
  color: `${colors.darkGray}`,
  fontStyle: "italic",
};

export const useSettingsModalStyles = createStyles(() => ({


  modalInner: {
    padding: "0 0.75rem 1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "2rem",
    width: "100%",
    height: "100%",
    WebkitAppRegion: "no-drag",

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

  radioSelectGroup: {
    width: "100%",

    '& [class*="-label"]': {
      ...flexSectionTitleStyles,
    },

    '& [class*="-description"]': {
      ...flexSectionDescriptionStyles,
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
      paddingLeft: "0.35rem",
    },

    "& .mantine-Radio-root": {
      cursor: "pointer",
      borderRadius: "8px",
      padding: "3px 6px",
      "& input, & label": {
        cursor: "pointer",
        fontSize: "13px",
      },
      "&:hover": {
        backgroundColor: colors.lightGreen,
      },
    },
  },

  flexSectionTitle: {
    marginBottom: "10px",
    h5: {
      ...flexSectionTitleStyles,
    },
    h6: {
      ...flexSectionDescriptionStyles,
    },
  },

  storyPointsSegmentedControl: {
    "& .mantine-SegmentedControl-control": {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      height: "38px", // static because active span is wack
      borderStyle: "none",
      borderWidth: 0,
      borderRadius: "0.5rem",
      "&:not(:first-of-type)": {
        borderStyle: "none",
        borderWidth: 0,
      },
      label: {
        paddingInline: "1em",
      },
      "&:hover": {
        backgroundColor: `${colors.lightBlue}60`,
      },
    },
    "& span.mantine-SegmentedControl-indicator": {
      backgroundColor: colors.lightBlue,
      height: "38px",
    },
  },

  select: {},
}));
