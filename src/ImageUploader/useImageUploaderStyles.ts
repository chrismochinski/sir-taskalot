import { createStyles } from "@mantine/core";
import { colors } from "..";

type ImageUploaderStylesProps = {
  imageCount: number;
};

export const useImageUploaderStyles = createStyles(
  (_, { imageCount }: ImageUploaderStylesProps) => ({
    imageUploaderWrapper: {
      position: "relative",
      width: "100%",
      flex: "1 1 auto",
      display: "flex",
      flexDirection: "row",
      alignItems: "stretch",
      justifyContent: "space-between",
      height: imageCount < 5 || imageCount > 6 ? "3rem" : "2.5rem",
      columnGap: imageCount < 4 ? "0.5rem" : "0.25rem",
      marginBlock: imageCount < 5 || imageCount > 6 ? 0 : "0.25rem",
    },

    imageUploader: {
      cursor: "pointer",
      background: `${colors.white}99`,
      width: "100%",
      flex: "1 1 auto",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      border: `2px dashed ${colors.gray}`,
      borderRadius: "8px",
      paddingBlock: "0.5rem",
      textAlign: "center",
      height: "100%",
      padding: 0,
      marginRight: imageCount < 4 ? "0" : "0.25rem",
      label: {
        fontSize: "13px",
        color: colors.black,
        opacity: 0.5,
        fontFamily: '"Roboto", sans-serif',
        pointerEvents: "none",
        fontWeight: 500,
      },
      "&:hover, &.dragging": {
        background: `${colors.lightBlue}50`,
        borderColor: colors.borderBlue,
        label: {
          opacity: 1,
          color: colors.borderBlue,
        },
      },
    },

    eachPreviewBox: {
      position: "relative",
      maxHeight: imageCount < 5 ? "3rem" : imageCount > 6 ? "2rem" : "2.5rem",
      flex: "0 0 auto",
      maxWidth: imageCount < 5 ? "3rem" : imageCount > 6 ? "2rem" : "2.5rem",
    },

    imageHoverPreviewWrapper: {
      position: "relative",
      width: "100%",
      height: "100%",
    },

    imagePreview: {
      cursor: "pointer",
      maxHeight: "2.25rem",
      minHeight: "100%",
      overflow: "hidden",
      borderRadius: "6px",
      border: `1.5px solid ${colors.gray}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      opacity: 1,
      zIndex: 2,
      "&:after": {
        zIndex: 1,
        content: '""',
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        borderRadius: "6px",
        background: "transparent",
      },
      "&.deleteHovered": {
        opacity: 0.8,
        outline: `1px solid ${colors.red}`,
        borderColor: colors.red,
        "&:after": {
          background: colors.red,
          opacity: 0.08,
        },
      },
    },

    removeImageButton: {
      zIndex: 3,
      position: "absolute",
      bottom: "-10px",
      right: "-5px",
    },

    removeImageIcon: {
      background: colors.white,
      borderRadius: "50%",
    },

    popover: {},

    fullImageModal: {
      zIndex: 1000,
      "& .mantine-Paper-root": {
        maxWidth: "400px",
        "& .mantine-Modal-header, & .mantine-Modal-title": {
          padding: 0,
        },

        "& .mantine-Modal-header": {
          paddingBottom: 0,
          height: "1rem",
          h2: {
            display: "none",
          },
          button: {
            WebkitAppRegion: "no-drag",
            borderRadius: "50%",
            background: colors.white,
            height: "calc(1.125rem + 5px)",
            minHeight: "calc(1.125rem + 5px)",
            width: "calc(1.125rem + 5px)",
            minWidth: "calc(1.125rem + 5px)",
            padding: "2px",
            transform: "translate(-9px, 12px)",
            stroke: colors.purple,
            "&:hover": {
              background: colors.purple,
              border: "2px solid #FFF",
              svg: {
                stroke: "#FFF",
              },
            },
          },
        },
      },
    },
  })
);
