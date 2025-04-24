import { Modal, Title, Text, Box } from "@mantine/core";
import { useInfoModalStyles } from ".";

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
      title="What in tarnation is going on here?"
      centered
      transitionProps={{ transition: "rotate-right", duration: 300 }}
      radius="lg">
      <Box className={classes.modalInner}>
        <Title order={4}>👋 Welcome!</Title>
        <Text>
          This desktop app helps our Marketing team submit tickets to the Dragon dev team.
        </Text>

        <Title order={4}>💡 Why it Exists</Title>
        <Text>To remove barriers and make work requests magical and fast.</Text>

        <Title order={4}>🐉 What Happens</Title>
        <Text>
          You fill out a short form. Your request goes to Slack for visibility and Jira for
          tracking.
        </Text>

        <Title order={4}>📫 Questions?</Title>
        <Text>
          Reach out to <strong>Mo</strong> (<code>mo@characterstrong.com</code>), or ping
          #dev-dragon.
        </Text>
      </Box>
    </Modal>
  );
}
