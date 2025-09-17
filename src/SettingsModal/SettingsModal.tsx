import { useEffect, useCallback } from "react";
// import { useGlobalStyles } from "..";
import {
  Modal,
  Box,
  Flex,
  Title,
  Image,
  Radio,
  Group,
  SegmentedControl,
  Select,
} from "@mantine/core";
import { useSettingsModalStyles } from ".";
import beardBurgerIcon from "../assets/beard-burger-v2.svg";
import { useGlobalStyles } from "../Globals";

export type StoryPointsValue = "1" | "2" | "3" | "5" | "8" | "13" | "unset" | null;

export type JiraStatusIdType = "10003" | "10006" | "3" | "10045" | "10005" | "10025";

export type EpicOption = {
  value: string;
  label: string;
};

export type JiraEpic = {
  id: string;
  key: string;
  fields: {
    summary: string;
    // ! MORE??
  };
};

// export const jiraStatusToTransitionMap: Record<JiraStatusIdType, string> = {
//   "10003": "11",     // default New
//   "10006": "3",      // To-Do
//   "3": "21",         // Doing
//   "10045": "27",     // Ready For Strategic Planning
//   "10005": "2",      // Ready For Estimation
//   "10025": "8",      // Needs Additional Info
// };

type SettingsModalProps = {
  opened: boolean;
  onClose: () => void;
  slackChannel: "dragon" | "test" | "none";
  setSlackChannel: (value: "dragon" | "test" | "none") => void;
  storyPoints: StoryPointsValue;
  setStoryPoints: (value: StoryPointsValue) => void;
  jiraStatusId: JiraStatusIdType;
  setJiraStatusId: (value: JiraStatusIdType) => void;
  epics: EpicOption[];
  setEpics: (value: EpicOption[]) => void;
  selectedEpic: string | null;
  setSelectedEpic: (value: string | null) => void;
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
  const {
    opened,
    onClose,
    slackChannel,
    setSlackChannel,
    storyPoints,
    setStoryPoints,
    jiraStatusId,
    setJiraStatusId,
    epics,
    setEpics,
    selectedEpic,
    setSelectedEpic,
  } = props;
  const { classes } = useSettingsModalStyles();
  const { classes: globalClasses } = useGlobalStyles({isCollapsed: false});

  const fetchEpics = useCallback(async () => {
    try {
      const result: JiraEpic[] = await window.electron.ipcRenderer.invoke("get-epics", undefined);

      const mapped = result.map((epic) => ({
        value: epic.key,
        label: `${epic.key}: ${epic.fields.summary}`,
      }));

      setEpics(mapped);
    } catch (err) {
      console.error("❌ [SettingsModal] Error fetching epics:", err);
    }
  }, [setEpics]);

  useEffect(() => {
    if (opened) {
      fetchEpics();
    }
  }, [opened, fetchEpics]);

  return (
    <Modal
      overlayProps={{ opacity: 0.7, blur: 3 }}
      className={globalClasses.modal}
      opened={opened}
      onClose={onClose}
      title="Advanced Settings"
      centered
      transitionProps={{ transition: "slide-up", duration: 300 }}
      radius="lg">
      <Box className={classes.modalInner} id="modal-inner">
        {/* <FancyScribble
          color={`${colors.green}70`}
          width="115px"
          styles={{ position: "absolute", top: "1rem", left: "59%", zIndex: 1000 }}
        /> */}
        <Flex className={classes.modalFlexRow}>
          <Box className={classes.settingTitleAndSwitch}>
            <Radio.Group
              className={classes.radioSelectGroup}
              value={jiraStatusId}
              onChange={setJiraStatusId}
              name="jiraStatus"
              label="Jira Status"
              description='Defaults to "New"'
              size="xs">
              <Group position="left" spacing="sm" mt="8px" className={classes.innerRadioGroup}>
                <Radio value="10003" label="New" />
                <Radio value="10006" label="To Do" />
              </Group>
            </Radio.Group>
          </Box>
        </Flex>

        <Flex className={classes.modalFlexRow}>
          <Box className={classes.settingTitleAndSwitch}>
            <Radio.Group
              className={classes.radioSelectGroup}
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
            <Box className={classes.flexSectionTitle}>
              <Title order={5}>Story Points</Title>
              <Title order={6}>Defaults to no settings (not 0, just no setting)</Title>
            </Box>
            <SegmentedControl
              className={classes.storyPointsSegmentedControl}
              fullWidth
              radius="md"
              size="sm"
              value={storyPoints ?? "unset"} // default to "unset" if null
              onChange={(value) => setStoryPoints(value as StoryPointsValue)}
              name="storyPoints"
              data={[
                { label: "None", value: "unset" }, // default, sends nothing
                { label: "1", value: "1" },
                { label: "2", value: "2" },
                { label: "3", value: "3" },
                { label: "5", value: "5" },
                { label: "8", value: "8" },
                {
                  label: <Image src={beardBurgerIcon} alt="Beard Burger" width="22px" />,
                  value: "13",
                },
              ]}
            />
          </Box>
        </Flex>

        <Flex className={classes.modalFlexRow}>
          <Box className={classes.settingTitleAndSwitch}>
            <Select
              className={classes.radioSelectGroup}
              data={epics}
              // maw="300px"
              radius="xl"
              label="Parent Epic"
              description="Optional: Associate new tickets with an Epic"
              placeholder="Add Parent Epic..."
              value={selectedEpic}
              onChange={setSelectedEpic}
              searchable
              clearable
              nothingFound="No active epics"
              size="xs"
              withinPortal
            />
          </Box>
        </Flex>
      </Box>
    </Modal>
  );
}
