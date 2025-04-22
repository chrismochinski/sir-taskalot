import { createStyles } from "@mantine/core";

type NewTicketFormStylesProps = {
  ticketTypeStyle: "Bug" | "Story";
};

export const useNewTicketFormStyles = createStyles(
  (_, { ticketTypeStyle }: NewTicketFormStylesProps) => ({
    flexHeaderWrapper: {
      zIndex: 2,
    },

    //h2
    headerText: {
      fontFamily: '"BioRhyme", sans-serif',
      fontWeight: 800,
      textWrap: "balance",
      textAlign: "left",
      color: "#000",
      fontSize: "clamp(1.75rem, 6vw, 2.25rem)",
      letterSpacing: "0.02em",
    },

    // p
    bodyText: {
      fontStyle: "normal",
      textAlign: "left",
      fontFamily: '"Roboto", sans-serif',
      fontSize: "clamp(13px, 2.4vw, 15px)",
      lineHeight: "1.25em",
      fontWeight: 400,
      textWrap: "pretty",
      marginBlock: "0.175em",
      marginInline: "auto",
    },

    dragonTicketPageWrapper: {
      backgroundColor: "#FFF",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },

    blobWrapper: {
      width: "clamp(300px, 86%, 700px)",
      height: "clamp(300px, 86%, 700px)",
      position: "absolute",
      inset: 0,
      fill: "#41E894",
      zIndex: 0,
      animation: "blob 14000ms ease-in-out infinite",
      transformOrigin: "50% 50%",
      "@keyframes blob": {
        "0%": {
          transform: "scale(1) translate(10px, -30px)",
        },
        "38%": {
          transform: "scale(0.8, 1) translate(80vw, 30vh) rotate(160deg)",
        },
        "40%": {
          transform: "scale(0.8, 1) translate(80vw, 30vh) rotate(160deg)",
        },
        "78%": {
          transform: "scale(1.3) translate(0vw, 50vh) rotate(-20deg)",
        },
        "80%": {
          transform: "scale(1.3) translate(0vw, 50vh) rotate(-20deg)",
        },
        "100%": {
          transform: "scale(1) translate(10px, -30px)",
        },
      },
    },

    dragonTicketSuccessWrapper: {
      overflow: "hidden",
      paddingInline: "max(3vw, (100vw - 1280px)/2)",
      marginBlock: 0,
      marginInline: 0,
      width: "100%",
      background: "#DEFCEE",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      paddingBlock: "1rem 4rem",
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
      backgroundColor: "#ffffffcc",
      backdropFilter: "blur(5px)",
      borderRadius: "12px",
      boxShadow: "2px 3px 15px #00000030",
      zIndex: 1,
      border: "2px solid #FFFFFF60",

      label: {
        fontSize: "1rem",
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

    dragonFormInput: {
      "& input, & textarea": {
        background: "#ffffffaa",
      },
    },
  })
);
