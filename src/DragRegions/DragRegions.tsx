import { Box } from "@mantine/core";
import { useDragRegionsStyles } from ".";

export type DragRegionsProps = {
  reporter?: string | null;
  isCollapsed?: boolean;
};

type RegionKey =
  | "formBottom"
  | "formTop"
  | "formLeft"
  | "formRight"
  | "onboardLeft"
  | "onboardRight"
  | "onboardTop"
  | "onboardBottom"
  | "stampTop"
  | "stampBottom"
  | "stampLeft"
  | "stampRight";
  
  
  export function DragRegions(props: DragRegionsProps) {
    const { reporter, isCollapsed } = props;
    const { classes, cx } = useDragRegionsStyles();
    
    const getRegionKeys = (reporter: string | null, isCollapsed: boolean): RegionKey[] => {
      if (isCollapsed) return ["stampTop", "stampBottom", "stampLeft", "stampRight"];
      if (reporter) return ["formBottom", "formTop", "formLeft", "formRight"];
      return ["onboardLeft", "onboardRight", "onboardTop", "onboardBottom"];;
    };
    
    const regionKeys = getRegionKeys(reporter ?? null, !!isCollapsed);
  
  console.log('isCollapsed', isCollapsed);
  console.log('reporter', reporter);

  return (
    <>
      {regionKeys.map((key) => (
        <Box key={key} className={cx(classes.dragRegion, classes[key])} data-region={key} />
      ))}
    </>
  );
}
