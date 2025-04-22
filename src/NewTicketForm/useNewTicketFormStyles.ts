import { createStyles } from "@mantine/core";
// import { CSSObject } from "@emotion/react";

type NewTicketFormStylesProps = {
  ticketTypeStyle: "Bug" | "Story";
};

export const useNewTicketFormStyles = createStyles(
  (_, { ticketTypeStyle }: NewTicketFormStylesProps) => ({
    //h2
    headerText: {
      fontFamily: '"Archivo", sans-serif',
      fontWeight: 700,
      textWrap: "balance",
      textAlign: "center",
      color: "#000",
      marginBlock: "0 0.15rem",
      fontSize: "clamp(2.5rem, 10vw, 3rem)",
    },

    // p
    bodyText: {
      fontStyle: "normal",
      fontFamily: '"Roboto", sans-serif',
      fontSize: "clamp(15px, 2.5vw, 1rem)",
      lineHeight: "1.35em",
      fontWeight: 400,
      textWrap: "balance",
      marginBlock: "0.25em",
      marginInline: "auto",
    },

    dragonTicketPageWrapper: {
      backgroundColor: "#FFF",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },

    dragonTicketSuccessWrapper: {
      paddingInline: "max(6vw, (100vw - 1280px)/2)",
      marginBlock: "0min(2.5rem, calc(2vw + 2vh))",
      marginInline: 0,
      width: "100%",
      background: "#DEFCEE",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",

      paddingBottom: "clamp(3rem, calc(5vw + 5vh), 9rem)",
      paddingTop: "clamp(0.75rem, calc(2vw + 2vh), 1.75rem)",
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
      marginBlock: "clamp(0.75rem, 2vw, 1.5rem)",
      backgroundColor: "#fff",
      borderRadius: "16px",
      boxShadow: "1px 3px 15px #00000020",
      backdropFilter: "blur(5px)",
      WebkitBackdropFilter: "blur(5px)",
      border: "2px solid #ffffff",
      label: {
        fontSize: "1.1rem",
        fontWeight: 400,
        fontFamily: '"Roboto", sans-serif',
        color: "#000",
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

    button: {
      backgroundColor: "#ff4658",
      fontFamily: '"Archivo", sans-serif',
      fontWeight: 700,
      color: "#ffffff",
      padding: "0.65em 1.4em",
      borderRadius: "64px",
      border: "none",
      cursor: "pointer",
      fontSize: "15px",
      transition: "transform 250ms ease-in-out, box-shadow 250ms ease-in-out",
      transformOrigin: "50%",
      "&:hover": {
        transition: "transform 150ms ease-in-out, box-shadow 150ms ease-in-out",
        backgroundColor: "#ff4658",
        transform: "scale(1.03)",
        boxShadow: "2px 4px 12px rgb(0 0 0 / 35%)",
      },
    },

    dragonFormInput: {},
  })
);
