import { UnstyledButton, Image } from "@mantine/core";
import dragonButler from "../assets/dragon-butler.png";
import { useDragonButtonStyles } from "./useDragonButtonStyles";

export type DragonButtonProps = {
  handleCollapseToggle?: () => void;
  width?: number | string;
};

export function DragonButton(props: DragonButtonProps) {
  const { handleCollapseToggle, width = 80 } = props;
  const { classes } = useDragonButtonStyles();

  return (
    <UnstyledButton className={classes.dragonButton} onClick={handleCollapseToggle}>
      <Image
        src={dragonButler}
        alt="Sir Taskalot - who happens to be a cute dragon butler"
        width={width}
        height="auto"
      />
    </UnstyledButton>
  );
}
