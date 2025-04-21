import { createStyles } from "@mantine/core";
// import { CSSObject } from "@emotion/react";

type NewTicketFormStylesProps = {
  ticketTypeStyle: "Bug" | "Story";
};

const rowStyles = {
  paddingInline: "max(6vw, (100vw - 1280px)/2)",
  marginBlock: "min(2.5rem, calc(2vw + 2vh))",
  marginInline: 0,
  width: "100%",
  // [mq.max.xs]: {
  //   paddingInline: '3vw',
  // },
};

export const useNewTicketFormStyles = createStyles(
  (_, { ticketTypeStyle }: NewTicketFormStylesProps) => ({
    
    //h2
    headerText: {
      fontFamily: '"Archivo", sans-serif',
      fontSize: "1.5rem",
      fontWeight: 600,
      textWrap: "balance",
      textAlign: "center",
      color: "#000",
      marginBlock: "0",
    },

    // p
    bodyText: {
      fontStyle: "normal",
      fontFamily: '"Roboto", sans-serif',
      fontSize: "clamp(15px, 2.5vw, 1rem)",
      lineHeight: "1.35em",
      fontWeight: 400,
      textWrap: "balance",
      marginBlock: "0.5em",
      marginInline: "auto",
    },

    dragonTicketPageWrapper: {
      paddingTop: "140px",

      backgroundColor: "#FFF",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },

    dragonTicketSuccessWrapper: {
      ...rowStyles,

      background: "#DEFCEE",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      paddingBottom: "clamp(3rem, calc(5vw + 5vh), 9rem)",
      h2: {
    
        fontSize: "clamp(1.75rem, 6vw, 2rem)",
        fontWeight: 700,
        marginBlock: "1.75em 0.25em",
      },

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
      fontWeight: 600,
      color: "#ffffff",
      padding: "0.65em 1.6em",
      borderRadius: "64px",
      border: "none",
      cursor: "pointer",
      transition:
        "transform 150ms ease-in-out, box-shadow 150ms ease-in-out, font-weight 150ms ease-in-out",
      transformOrigin: "50%",
      "&:hover": {
        backgroundColor: "#ff4658",
        transform: "scale(1.03)",
        fontWeight: 700,
        boxShadow: "2px 4px 12px rgb(0 0 0 / 35%)",
      },
    },

    dragonFormInput: {},
  })
);
