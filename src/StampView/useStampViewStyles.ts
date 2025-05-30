import { createStyles } from "@mantine/core";

export const useStampViewStyles = createStyles(() => ({
  stampViewWrapper: {
    width: "120px",
    height: "120px",
    position: "absolute",
    inset: 0,
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));
