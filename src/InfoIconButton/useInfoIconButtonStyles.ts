import { createStyles } from "@mantine/core";
import { colors } from "..";

export const useInfoIconButtonStyles = createStyles(() => ({
  infoIconButton: {
    position: "absolute",
    right: "0.5rem",
    top: "0.45rem",
    cursor: "pointer",
    zIndex: 10,
    width: "22px",
    height: "22px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
    svg: {
      position: "absolute",
      borderRadius: "50%",
      opacity: 0.4,
      transformOrigin: "50% 50%",
      transformBox: "fill-box",
      transition: "transform 110ms ease-out, opacity 110ms ease-out",
      "& path, & circle": {
        transformOrigin: "50% 50%",
        transformBox: "fill-box",
      },
      "& circle#i-dot": {
        transition: "cx 110ms ease, cy 110ms ease, transform 110ms ease, fill 110ms ease",
      },
      "& path#i-body, & path#i-circle": {
        transition: "d 110ms ease, transform 110ms ease",
      },
    },
    "&:before": {
      position: "absolute",
      top: "48%",
      transform: "translateY(-50%) translateX(-15px)",
      fontFamily: '"Roboto", sans-serif',
      fontWeight: 500,
      letterSpacing: "0.02em",
      fontSize: "12px",
      width: "max-content",
      color: colors.darkGray,
      transition: "transform 110ms ease-out, opacity 110ms ease-out",
      opacity: 0,
      pointerEvents: "none",
      content: "'App Info'",
      right: "25px",
    },
    "&:hover": {
      "&:before": {
        transition: "transform 110ms ease-out, opacity 110ms ease-out",
        transform: "translateY(-50%) translateX(0px)",
        opacity: 0.8,
      },
      svg: {
        opacity: 1,
        "& circle#i-circle": {
          
          fill: `${colors.purple}27`,
        },
        "& circle#i-dot": {
          transform: 'translateY(-1px) translateX(1px) scale(0.85)',
        },
        "& path#i-body": {
          transform: "translateY(1px) translateX(1px) scale(0.85)",
        },
      },
    },
  },
}));
