import { Box } from "@mantine/core";
import { useDragRegionsStyles } from ".";

export type DragRegionsProps = {
  reporter?: string | null;
}

export function DragRegions(props: DragRegionsProps) {
  const { reporter } = props;
  const { classes } = useDragRegionsStyles({ reporter });
  return (
    <>
      <Box className={classes.dragRegion} id="form-bottom" />
      <Box className={classes.dragRegion} id="form-top" />
      <Box className={classes.dragRegion} id="left" />
      <Box className={classes.dragRegion} id="right" />
      <Box className={classes.dragRegion} id="onboard-top" />
      <Box className={classes.dragRegion} id="onboard-bottom" />
    </>
  );
}
