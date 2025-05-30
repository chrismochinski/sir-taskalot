import { Box } from "@mantine/core";
import { DragonButton } from "..";
import { useStampViewStyles } from "./useStampViewStyles";

export type StampViewProps = {
  handleCollapseToggle?: () => void;
};

export function StampView(props: StampViewProps) {
  const { classes } = useStampViewStyles();
  const { handleCollapseToggle } = props;
  return (
    <Box className={classes.stampViewWrapper} w="100%" h="100%">
      <DragonButton handleCollapseToggle={handleCollapseToggle} width={70} />

    </Box>
  );
}
