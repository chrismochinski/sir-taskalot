import { createStyles } from "@mantine/core";

type NewTicketFormStylesProps = {
  ticketTypeStyle: "Bug" | "Story";
};

export const useNewTicketFormStyles = createStyles(
  (_, { ticketTypeStyle }: NewTicketFormStylesProps) => ({
    flexHeaderWrapper: {
      zIndex: 2,
      WebkitAppRegion: "drag", // can drag app by header text area
      paddingBlock: "1.745rem 0.25rem",
    },

    newTicketFormWrapper: {
      marginBlock: 0,
      marginInline: 0,
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      paddingBlock: "0 2rem",
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
      marginTop: "0.75rem",
      backgroundColor: "#ffffffda",
      backdropFilter: "blur(7px)",
      WebkitBackdropFilter: "blur(7px)",
      borderRadius: "12px",
      boxShadow: "2px 3px 17px #00000036",
      zIndex: 1,
      border: "2px solid #FFFFFF60",

      label: {
        fontSize: "15px",
        fontWeight: 400,
        fontFamily: '"Roboto", sans-serif',
        color: "#000",
      },

      "& button, & input, & textarea": {
        WebkitAppRegion: "no-drag",
      },
    },

    ticketType: {
      marginBlock: "0",
      "& .mantine-SegmentedControl-indicator": {
        transition: "all 300ms ease",
        backgroundColor: ticketTypeStyle === "Story" ? "#C1EAFF" : "#FCE6D8",
      },
      "& .mantine-SegmentedControl-control": {
        span: {
          fontFamily: '"Archivo", sans-serif',
          fontSize: "14px",
        },
      },
    },

    flex: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      "& > label": {
        lineHeight: "1.125em",
      },
      "& > span": {
        fontSize: "12px",
        lineHeight: "1.25em",
        paddingBottom: "5px",
        color: "#aaaaaa",
        fontWeight: 300,
        span: {
          lineHeight: "1.125em",
        },
      },
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
        padding: '0.5em 0.75em',
        '& .mantine-RichTextEditor-control': {
        minWidth: '1.4rem',
        height: '1.4rem',
        
        },
      },
      // rich text box - keep at 100px tall and scroll on overflow
      "& .mantine-RichTextEditor-content": {
        borderRadius: "0 0 10px 10px",
        minHeight: "90px",
        maxHeight: "90px",
        overflowY: "auto",
        "& .tiptap.ProseMirror": {
          padding: "1em",

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
    },

    rteToolbar: {
      borderRadius: "10px 10px 0 0",
    },
  })
);
