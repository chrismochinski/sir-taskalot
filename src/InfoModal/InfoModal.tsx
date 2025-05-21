import { Modal, Box, Flex, Title, Text } from "@mantine/core";
import {
  useInfoModalStyles,
  ThreeHandsIcon,
  MagicWandIcon,
  QuestionMarkIcon,
  PoundTheStoneIcon,
} from ".";

type InfoModalProps = {
  opened: boolean;
  onClose: () => void;
};

export function InfoModal({ opened, onClose }: InfoModalProps) {
  const { classes } = useInfoModalStyles();

  return (
    <Modal
      overlayProps={{ opacity: 0.7, blur: 3 }}
      className={classes.infoModal}
      opened={opened}
      onClose={onClose}
      // revisit CLOSE BUTTON
      withCloseButton
      closeOnClickOutside
      closeButtonProps={{
        "aria-label": "Close modal",
      }}
      title="What in tarnation is going on here?"
      centered
      transitionProps={{ transition: "slide-up", duration: 300 }}
      radius="lg">
      <Box className={classes.modalInner} id="modal-inner">
        <Flex className={classes.modalFlexRow}>
          <ThreeHandsIcon />
          <Box className={classes.modalTextBox}>
            <Title order={3}>Hi Friends!</Title>
            <Text component="p">
              Thanks for using our little workflow app. We hope it simplifies things for you.
            </Text>
          </Box>
        </Flex>
        <Flex className={classes.modalFlexRow}>
          <PoundTheStoneIcon />
          <Box className={classes.modalTextBox}>
            <Title order={4}>Why are we using it?</Title>
            <Text component="p">Jira is chaotic. Slack is busy. This form takes care of both.</Text>
          </Box>
        </Flex>

        <Flex className={classes.modalFlexRow}>
          <MagicWandIcon />
          <Box className={classes.modalTextBox}>
            <Title order={4}>What happens?</Title>
            <Text component="p">
              Just fill out the form with whatever context you can provide. This will create a
              ticket in Jira and assign it to us. It will also alert and provide a link to the Jira
              request in Slack. Blam.
            </Text>
          </Box>
        </Flex>

        <Flex className={classes.modalFlexRow}>
          <QuestionMarkIcon />
          <Box className={classes.modalTextBox}>
            <Title order={4}>Questions? Comments? Ideas?</Title>
            <Text component="p">
              Bring 'em on! We love opportunities to make all of our workloads a tiny bit lighter.
              Reach out to Mo directly or tag #tech-marketing-site in Slack. We gotchu!
            </Text>
          </Box>
        </Flex>
      </Box>
    </Modal>
  );
}
