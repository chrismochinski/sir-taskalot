import { createStyles } from "@mantine/core";
import { colors } from "../Globals";

type NewTicketFormStylesProps = {
  ticketTypeStyle: "Bug" | "Story";
};

export const useNewTicketFormStyles = createStyles(
  (_, { ticketTypeStyle }: NewTicketFormStylesProps) => ({
    flexHeaderWrapper: {
      zIndex: 1,
      paddingBlock: "0 0.5rem",
      maxWidth: "400px",
      position: "relative",
    },

    dragonButler: {
      WebkitAppRegion: "no-drag",
    },

    newTicketFormWrapper: {
      marginBlock: 0,
      marginInline: 0,
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      paddingBlock: 0,
    },

    formFieldsBox: {
      maxWidth: "400px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      width: "100%",
      padding: "1rem 1.25rem",
      gap: "0.5rem",
      marginTop: 0,
      backgroundColor: `${colors.white}da`,
      backdropFilter: "blur(7px)",
      WebkitBackdropFilter: "blur(7px)",
      borderRadius: "12px",
      boxShadow: "2px 3px 17px #00000036",
      zIndex: 1,
      border: `2px solid ${colors.white}60`,

      label: {
        fontSize: "14px",
        fontWeight: 400,
        fontFamily: '"Roboto", sans-serif',
        color: `${colors.black}`,
      },

      "& button, & input, & textarea": {
        WebkitAppRegion: "no-drag",
      },
    },

    ticketType: {
      backgroundColor: `${colors.white}`,
      // border: `0.0625rem solid ${colors.gray}`,
      marginBlock: "0",
      "& .mantine-SegmentedControl-indicator": {
        transition: "all 300ms ease",
        boxShadow: "0 0 0 0",
        backgroundColor:
          ticketTypeStyle === "Story" ? `${colors.lightBlue}` : `${colors.lightOrange}`,
      },
      "& .mantine-SegmentedControl-control": {
        span: {
          fontFamily: '"Archivo", sans-serif',
          fontSize: "14px",
        },
      },
    },

    priorityTypeFlex: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      justifyContent: "space-between",
    },

    rteBox: {
      borderRadius: "0 0 10px 10px",
    },

    richTextEditor: {
      borderRadius: "10px",
      "& .mantine-TypographyStylesProvider-root": {
        borderRadius: "0 0 10px 10px",
      },
      "& .mantine-RichTextEditor-toolbar": {
        padding: "0.5em 0.75em",
        "& .mantine-RichTextEditor-control": {
          minWidth: "1.4rem",
          height: "1.4rem",
        },
      },
      // rich text box - keep at 100px tall and scroll on overflow
      "& .mantine-RichTextEditor-content": {
        borderRadius: "0 0 10px 10px",
        minHeight: "90px",
        maxHeight: "90px",
        overflowY: "auto",
        "& .tiptap.ProseMirror": {
          padding: "calc(2em / 3)",
          // ------- USER ENTERED TEXT ------- //
          h2: {
            fontSize: "1.25rem",
            fontWeight: 600,
          },
          p: {
            fontSize: "13px",
          },
        },
      },
      "&:focus-within": {
        backgroundColor: "#ffffff99",
        border: `1.5px solid ${colors.borderBlue}`,
      },
    },

    rteToolbar: {
      borderRadius: "10px 10px 0 0",
    },

    typeSubLabel: {
      position: "absolute",
      display: "block",
      top: "100%",
      fontSize: "12px",
      fontFamily: '"Roboto", sans-serif',
      fontWeight: 500,
      color: ticketTypeStyle === "Story" ? `${colors.darkBlue}` : `${colors.darkOrange}`,
    },
  })
);
