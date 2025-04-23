import { createStyles } from "@mantine/core";

type NewTicketFormStylesProps = {
  ticketTypeStyle: "Bug" | "Story";
};

export const useNewTicketFormStyles = createStyles(
  (_, { ticketTypeStyle }: NewTicketFormStylesProps) => ({
    flexHeaderWrapper: {
      zIndex: 2,
      WebkitAppRegion: 'drag', // can drag app by header text area
      paddingBlock: '1.5rem 0.25rem',
    },
    
    // manually added to several sections of page edges 
    // to eliminate header bar (removed via main.cjs)
    dragRegion: {
      WebkitAppRegion: 'drag',
      position: 'absolute',
      '&#left': {
        left: 0,
        top: 0,
        bottom: 0,
        height: '100%',
        background: 'transparent',
        width: '95px',
      },
      '&#right': {
        right: 0,
        top: 0,
        bottom: 0,
        height: '100%',
        background: 'transparent',
        width: '95px',
      },
      '&#bottom': {
        bottom: 0,
        left: 0,
        right: 0,
        height: '60px',
        background: 'transparent',
      },
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
      textShadow: "1px 1px 5px #FFFFFF40, -1px -1px 5px #FFFFFF40, 1px -1px 5px #FFFFFF40, -1px 1px 5px #FFFFFF40",
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
      background: "#DEFCEE",
    },

    blobWrapper: {
      width: "clamp(300px, 82%, 700px)",
      height: "clamp(300px, 82%, 700px)",
      position: "absolute",
      inset: "-9% 0 0 -12%",
      fill: "#41E894",
      zIndex: 0,
      animation: "blob 11000ms ease-in-out infinite",
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
      backgroundColor: "#ffffffdf",
      backdropFilter: "blur(6px)",
      WebkitBackdropFilter: "blur(6px)",
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

      '& button, & input, & textarea': {
        WebkitAppRegion: 'no-drag',
      }
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
