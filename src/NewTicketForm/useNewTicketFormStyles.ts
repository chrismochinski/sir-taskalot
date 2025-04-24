import { createStyles } from "@mantine/core";

type NewTicketFormStylesProps = {
  ticketTypeStyle: "Bug" | "Story";
};

export const useNewTicketFormStyles = createStyles(
  (_, { ticketTypeStyle }: NewTicketFormStylesProps) => ({
   
    flexHeaderWrapper: {
      zIndex: 2,
      WebkitAppRegion: "drag", // can drag app by header text area
      paddingBlock: "1.5rem 0.25rem",
    },

 

    newTicketFormWrapper: {
      overflow: "hidden",
      marginBlock: 0,
      marginInline: 0,
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      paddingBlock: "0 4rem",
    },

    formFieldsBox: {
      maxWidth: "450px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      width: "100%",
      padding: "1rem 1.25rem",
      gap: "1rem",
      marginTop: "0.75rem",
      backgroundColor: "#ffffffbb",
      backdropFilter: "blur(7px)",
      WebkitBackdropFilter: "blur(7px)",
      borderRadius: "12px",
      boxShadow: "2px 3px 17px #00000036",
      zIndex: 1,
      border: "2px solid #FFFFFF60",

      label: {
        fontSize: "1rem",
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
          fontSize: "16px",
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
        fontSize: "13px",
        lineHeight: "1.25em",
        paddingBottom: "5px",
        color: "#aaaaaa",
        fontWeight: 300,
        span: {
          lineHeight: "1.125em",
        },
      },
    },



  })
);
