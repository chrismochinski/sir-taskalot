import { Modal, Box, Flex, Image, Title, Text } from "@mantine/core";
import {
  useInfoModalStyles,
  ThreeHandsIcon,
  MagicWandIcon,
  QuestionMarkIcon,
  PoundTheStoneIcon,
} from ".";

import dragonBotImage from "../assets/DragonBotTight.svg";
import { SquiggleMedium } from "../SvgShapes";

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
      title="APP INFO"
      centered
      transitionProps={{ transition: "slide-down", duration: 300 }}
      radius="lg">
      <Box className={classes.modalInner} id="modal-inner">
        <SquiggleMedium
          color="#41E894"
          width="200px"
          styles={{ position: "absolute", top: "calc(0.3em + 1rem", left: "37%", zIndex: 1000 }}
        />

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
            <Text component="p">
              Jira can be overwhelming. Slack can be busy. This form takes care of both.
            </Text>
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
          <Image
            className={classes.modalDragonBotImage}
            src={dragonBotImage}
            alt="DragonBot, our dragon butler helper friend"
          />
          <Box className={classes.modalTextBox}>
            <Title order={4}>Who's this guy?</Title>
            <Text component="p">
              That's DragonBot, our dragon butler friend. Wherever you see him (other than here),
              click him to squish/expand this app. Close this popup and give it a try!
            </Text>
          </Box>
        </Flex>

        <Flex className={classes.modalFlexRow}>
          <QuestionMarkIcon />
          <Box className={classes.modalTextBox}>
            <Title order={4}>Questions? Comments? Ideas?</Title>
            <Text component="p">
              Two of the things to which we are most dedicated are crafting a satisfying user
              experience and always getting better at what we do. We'd love the opportunity to nail
              this app. Reach out to Mo directly or tag #tech-marketing-site in Slack. We gotchu!
            </Text>
          </Box>
        </Flex>
      </Box>
    </Modal>
  );
}
