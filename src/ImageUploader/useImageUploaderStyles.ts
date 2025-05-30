import { createStyles } from "@mantine/core";
import { colors } from "..";

type ImageUploaderStylesProps = {
  preview: string | null;
};

export const useImageUploaderStyles = createStyles((_, { preview }: ImageUploaderStylesProps) => ({
  imageUploaderWrapper: {
    position: "relative",
    width: "100%",
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
    height: "3rem",
    columnGap: "0.5rem",
  },

  imageUploader: {
    cursor: "pointer",
    background: `${colors.white}99`,
    width: "70%",
    flexBasis: "70%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    border: `2px dashed ${!preview ? colors.gray : colors.red}80`,
    borderRadius: "8px",
    paddingBlock: "0.5rem",
    textAlign: "center",
    height: "100%",
    padding: 0,
    label: {
      fontSize: "12px",
      color: colors.black,
      opacity: 0.4,
      fontFamily: '"Roboto", sans-serif',
      pointerEvents: "none",
      fontWeight: 400,
    },
    "&:hover, &.dragging": {
      background: !preview ? `${colors.lightBlue}33` : `${colors.red}28`,
      borderColor: !preview ? colors.lightBlue : `${colors.red}80`,
      borderWidth: "2px",
      borderStyle: "dashed",
      label: {
        opacity: 0.6,
        fontWeight: 500,
      },
    },
  },

  imagePreview: {
    width: "100%",
    minHeight: "100%",
    flexBasis: "25%",
    maxHeight: "2rem",
    maxWidth: "25%",
    overflow: "hidden",
    borderRadius: "6px",
    border: `1.5px solid ${colors.gray}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  removeButton: {
    background: `${colors.red}15`,
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    span: {
      fontSize: "12px",
      color: colors.black,
      opacity: 0.4,
      fontFamily: '"Archivo", sans-serif',
      pointerEvents: "none",
    },
  },
}));
