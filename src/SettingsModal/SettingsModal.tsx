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
  const [jiraStatus, setJiraStatus] = useState("new");
  const [slackChannel, setSlackChannel] = useState("dragon");

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
              size="xs"
              
              >
              <Group position="left" spacing="sm" mt="8px" className={classes.innerRadioGroup}>
                <Radio value="new" label="New" />
                <Radio value="to-do" label="To Do" />
              </Group>
            </Radio.Group>
          </Box>
        </Flex>
        
        <Flex className={classes.modalFlexRow}>
          <Box className={classes.settingTitleAndSwitch}>
            <Radio.Group
              className={classes.radioGroup}
              value={slackChannel}
              onChange={setSlackChannel}
              name="slackChannel"
              label="Slack Channel"
              description='Defaults to "#pe-team-dragon"'
              size="xs"
              
              >
              <Group position="left" spacing="sm" mt="8px" className={classes.innerRadioGroup}>
                <Radio value="dragon" label="Dragon" />
                <Radio value="test" label="Test" />
                <Radio value="none" label="No Slack Message" />
              </Group>
            </Radio.Group>
          </Box>
        </Flex>

       
      </Box>
    </Modal>
  );
}
