import { Modal, Box, Flex, Title, Text } from "@mantine/core";
import { useSettingsModalStyles } from ".";

type SettingsModalProps = {
  opened: boolean;
  onClose: () => void;
};

export function SettingsModal({ opened, onClose }: SettingsModalProps) {
  const { classes } = useSettingsModalStyles();

  return (
    <Modal
      overlayProps={{ opacity: 0.7, blur: 3 }}
      className={classes.settingsModal}
      opened={opened}
      onClose={onClose}
      title="Advanced Settings"
      centered
      transitionProps={{ transition: "slide-up", duration: 300 }}
      radius="lg">
      <Box className={classes.modalInner} id="modal-inner">
       
        <Flex className={classes.modalFlexRow}>
          <Box className={classes.settingTitleAndSwitch}>
            <Title order={4}>Jira Status</Title>
            <Text component="p">Defaults to "New"</Text>
          </Box>
        </Flex>
     
        <Flex className={classes.modalFlexRow}>
          <Box className={classes.settingTitleAndSwitch}>
            <Title order={4}>Set me as owner</Title>
            <Text component="p">Defaults to no, requires Jira account API info</Text>
          </Box>
        </Flex>

        <Flex className={classes.modalFlexRow}>
          <Box className={classes.settingTitleAndSwitch}>
            <Title order={4}>Slack Channel</Title>
            <Text component="p">Defaults to #pe-team-dragon</Text>
          </Box>
        </Flex>

        <Flex className={classes.modalFlexRow}>
          <Box className={classes.settingTitleAndSwitch}>
            <Title order={4}>Questions? Comments? Ideas?</Title>
            <Text component="p">ANOTHER SETTING HUZZAH PANCAKE</Text>
          </Box>
        </Flex>
      </Box>
    </Modal>
  );
}
