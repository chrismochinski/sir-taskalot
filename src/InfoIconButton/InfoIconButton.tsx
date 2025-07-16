import { UnstyledButton } from "@mantine/core";
import { useInfoIconButtonStyles } from ".";
import { colors } from "..";

export type InfoIconButtonProps = {
  onClick?: () => void;
};

/**
 * @component InfoIconButton
 * @description A simple SVG icon component that displays an information icon.
 * Animates on hover (and maybe other interactions in the future) via shape
 * morph in JS/CSS. Cowabunga.
 * @returns An SVG icon representing information, styled with Mantine.
 */
export function InfoIconButton(props: InfoIconButtonProps) {
  const { onClick } = props;
  const { classes } = useInfoIconButtonStyles();

  return (
    <UnstyledButton
      onClick={onClick}
      title="Info Icon Button"
      aria-label="Info Icon Button"
      aria-describedby="info-icon-button"
      className={classes.infoIconButton}>
      <svg id="info-icon-svg" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="18.9558" cy="9.00075" r="2.07692" fill={colors.purple} id="i-dot" />
        <path
          id="i-circle"
          d="M4.41406 14.9893C4.41406 7.85759 10.1955 2.07617 17.3272 2.07617H18.3062H19.6908H20.5778C27.7096 2.07617 33.491 7.85759 33.491 14.9893V14.9893V15.9072V16.7201V16.7201C33.491 23.9098 27.6626 29.7382 20.4729 29.7382H19.6908H18.9985H18.3062H17.4321C10.2425 29.7382 4.41406 23.9098 4.41406 16.7201V16.7201V15.9072V14.9893V14.9893Z"
          stroke={colors.purple}
          strokeWidth="2.36313"
        />
        <path
          id="i-body"
          d="M18.9531 15.2305C18.9531 15.9674 18.9531 17.2133 18.9531 17.9502C18.9531 18.6872 18.9531 20.1787 18.9531 20.67C18.9531 20.9771 18.9531 22.3545 18.9531 22.8459"
          stroke={colors.purple}
          strokeWidth="4.15385"
          strokeLinecap="round"
        />
      </svg>
    </UnstyledButton>
  );
}
