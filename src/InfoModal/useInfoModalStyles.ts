import { createStyles } from "@mantine/core";
import { colors } from "../Globals";

export const useInfoModalStyles = createStyles(() => ({
  infoModal: {
    "& .mantine-Paper-root": {
      maxWidth: "420px",
      height: "540px",
      "& .mantine-Modal-header": {
        paddingBottom: 0,
        h2: {
          display: "none",
        },
        button: {
          backgroundColor: '#fff',
          borderRadius: "50%",
          background: colors.red,
          svg: {
            stroke: '#FFF',
          },
          '&:hover': {

          },
        },
      },
    },
  },

  modalInner: {
    padding: "1rem 1.25rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
  },
}));
