import { useState } from "react";
import { Modal, Box, Flex, Title, Image, Radio, Group, SegmentedControl } from "@mantine/core";
import { useSettingsModalStyles } from ".";
import { FancyScribble, colors } from "..";
import beardBurgerIcon from "../assets/beard-burger-v2.svg";

type SettingsModalProps = {
  opened: boolean;
  onClose: () => void;
  slackChannel: "dragon" | "test" | "none";
  setSlackChannel: (value: "dragon" | "test" | "none") => void;
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
export function SettingsModal(props: SettingsModalProps) {
  const { opened, onClose, slackChannel, setSlackChannel } = props;
  const { classes } = useSettingsModalStyles();
  const [jiraStatus, setJiraStatus] = useState("new");
  const [storyPoints, setStoryPoints] = useState<string>("unset"); // Default to none / "unset"

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
        <FancyScribble
          color={`${colors.green}70`}
          width="115px"
          styles={{ position: "absolute", top: "1rem", left: "59%", zIndex: 1000 }}
        />
        <Flex className={classes.modalFlexRow}>
          <Box className={classes.settingTitleAndSwitch}>
            <Radio.Group
              className={classes.radioGroup}
              value={jiraStatus}
              onChange={setJiraStatus}
              name="jiraStatus"
              label="Jira Status"
              description='Defaults to "New"'
              size="xs">
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
              size="xs">
              <Group position="left" spacing="sm" mt="8px" className={classes.innerRadioGroup}>
                <Radio value="dragon" label="Dragon" />
                <Radio value="test" label="Test" />
                <Radio value="none" label="No Slack Message" />
              </Group>
            </Radio.Group>
          </Box>
        </Flex>

        <Flex className={classes.modalFlexRow}>
          <Box className={classes.settingTitleAndSwitch}>
            <Box className={classes.segmentedControlTitle}>
              <Title order={5}>Story Points</Title>
              <Title order={6}>Defaults to no settings (not 0, just no setting)</Title>
            </Box>
            <SegmentedControl
              className={classes.storyPointsSegmentedControl}
              fullWidth
              radius="md"
              size="sm"
              value={storyPoints}
              onChange={setStoryPoints}
              name="storyPoints"
              data={[
                { label: "None", value: "unset" }, // default
                { label: "1", value: "1" },
                { label: "2", value: "2" },
                { label: "3", value: "3" },
                { label: "5", value: "5" },
                { label: "8", value: "8" },
                {
                  label: <Image src={beardBurgerIcon} alt="Beard Burger" width="22px" />,
                  value: "burger",
                },
              ]}
            />
          </Box>
        </Flex>
      </Box>
    </Modal>
  );
}
