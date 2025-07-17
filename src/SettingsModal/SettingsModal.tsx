import { useState } from "react";
import { Modal, Box, Flex, Title, Text, Radio, Group } from "@mantine/core";
import { useSettingsModalStyles } from ".";


type SettingsModalProps = {
  opened: boolean;
  onClose: () => void;
};

/**
 * @component SettingsModal
 * @description A modal for advanced settings configuration.
 * We will add more features later, but for now (July 2025) we will allow
 * users to
 * 1. set Jira status as "New" (default) or send it straight to "To Do"
 * 2. set the Slack channel they'll send the message to (#pe-team-dragon, #workflow-tests, or no slack message)
 * @returns JSX.Element
 */
export function SettingsModal({ opened, onClose }: SettingsModalProps) {
  const { classes } = useSettingsModalStyles();
  const [jiraStatus, setJiraStatus] = useState("New");
  // const [slackChannel, setSlackChannel] = useState("dragon");

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
            <Radio.Group
              className={classes.radioGroup}
              value={jiraStatus}
              onChange={setJiraStatus}
              name="jiraStatus"
              label="Jira Status"
              description='Defaults to "New"'
              size="sm"
              
              >
              <Group position="left" spacing="md" mt="8px" className={classes.innerRadioGroup}>
                <Radio color="dark" value="New" label="New" />
                <Radio color="dark" value="To Do" label="To Do" />
              </Group>
            </Radio.Group>
          </Box>
        </Flex>

        {/* EVERYTHING BELOW HERE I WILL GET TO LATER  */}
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
