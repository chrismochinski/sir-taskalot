import { useRef } from "react";
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

  const dotRef = useRef<SVGCircleElement>(null);
  const bodyRef = useRef<SVGPathElement>(null);

  const handleMouseEnter = () => {
    dotRef.current?.setAttribute("cx", "17.9387");
    dotRef.current?.setAttribute("cy", "24.3371");

    bodyRef.current?.setAttribute(
      "d",
      "M17.9429 18.4512C17.9429 17.7142 17.9428 16.0281 18.6356 15.3358C19.6752 14.298 23.8279 13.2589 22.4428 9.79733C21.0576 6.33579 15.1722 6.33579 13.4432 9.79733"
    );
  };

  const handleMouseLeave = () => {
    dotRef.current?.setAttribute("cx", "18.9558");
    dotRef.current?.setAttribute("cy", "9.00075");

    bodyRef.current?.setAttribute(
      "d",
      "M18.9531 15.2305C18.9531 15.9674 18.9531 17.2133 18.9531 17.9502C18.9531 18.6872 18.9531 20.1787 18.9531 20.67C18.9531 20.9771 18.9531 22.3545 18.9531 22.8459"
    );
  };

  return (
    <UnstyledButton
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      title="Info Icon Button"
      aria-label="Info Icon Button"
      aria-describedby="info-icon-button"
      className={classes.infoIconButton}>
      <svg id="info-icon-svg" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle
          ref={dotRef}
          cx="18.9558"
          cy="9.00075"
          r="2.07692"
          fill={colors.purple}
          id="i-dot"
        />

        <circle
          id="i-circle"
          stroke={colors.purple}
          cx="19"
          cy="16"
          r="14"
          strokeWidth="2.5"
        />
        <path
          ref={bodyRef}
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
