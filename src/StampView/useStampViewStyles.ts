import { createStyles } from "@mantine/core";

export const useStampViewStyles = createStyles(() => ({
  stampViewWrapper: {
    width: '100%',
    height: '100%',
    position: "absolute",
    inset: 0,
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));
