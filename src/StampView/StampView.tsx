import { Box } from "@mantine/core";
import { DragonButton } from "..";
import { useStampViewStyles } from "./useStampViewStyles";

export type StampViewProps = {
  handleCollapseToggle?: () => void;
  isCollapsed?: boolean;
};

export function StampView(props: StampViewProps) {
  const { classes } = useStampViewStyles();
  const { handleCollapseToggle, isCollapsed } = props;

  return (
    <Box className={classes.stampViewWrapper} w="100%" h="100%" mb="-10px">
      <DragonButton
        handleCollapseToggle={handleCollapseToggle}
        width={50}
        isCollapsed={isCollapsed}
      />
    </Box>
  );
}
