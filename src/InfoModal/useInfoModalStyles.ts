import { createStyles } from "@mantine/core";
import { colors } from "../Globals";

export const useInfoModalStyles = createStyles(() => ({
  infoModal: {
    zIndex: 20,
    "& .mantine-Paper-root": {
      maxWidth: "380px",
      height: "500px",
      "& .mantine-Modal-header": {
        paddingBottom: 0,
        h2: {
          display: "none",
        },
        button: {
          cursor: "pointer",
          backgroundColor: "#fff",
          borderRadius: "50%",
          background: colors.white,
          height: '1rem',
          minHeight: '1rem',
          width: "1rem",
          minWidth: "1rem",
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
        height: "440px",
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

    h3: {
      fontSize: "24px",
      fontWeight: 700,
      fontFamily: '"BioRhyme", serif',
      color: `${colors.black}`,
      marginBlock: 0,
      lineHeight: "1.175em",
      textWrap: "balance",
    },
    h4: {
      fontSize: "16px",
      fontWeight: 700,
      fontFamily: '"Archivo", sans-serif',
      color: `${colors.black}`,
      marginBlock: 0,
      lineHeight: "1.175em",
      textWrap: "balance",
    },
    p: {
      fontSize: "14px",
      fontWeight: 400,
      fontFamily: '"Roboto", sans-serif',
      color: `${colors.black}`,
      marginBlock: 0,
      lineHeight: "1.15em",
      textWrap: "pretty",
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
      flexBasis: "15%",
      maxWidth: "15%",
    },
  },

  modalTextBox: {
    flex: 1,
  },
}));
