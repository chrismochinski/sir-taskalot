import { useEffect, useState } from "react";
import { MantineProvider, Box, UnstyledButton } from "@mantine/core";
import {
  NewTicketForm,
  Onboarding,
  InfoModal,
  SettingsModal,
  useGlobalStyles,
  DragRegions,
  StampView,
  InfoIconButton,
  StoryPointsValue,
  JiraStatusIdType,
} from ".";
import { RiSettings4Fill, RiSettings4Line } from "react-icons/ri";

function App() {
  const [reporterName, setReporterName] = useState<string | null>(null); // reporter name state
  const [infoModalOpen, setInfoModalOpen] = useState(false); // modal state
  const [isCollapsed, setIsCollapsed] = useState(false); // collapse or "stamp" state
  const { classes: globalClasses, cx } = useGlobalStyles({ isCollapsed });

  // ADVANCED SETTINGS STUFF
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [slackChannel, setSlackChannel] = useState<"dragon" | "test" | "none">("dragon");
  const [storyPoints, setStoryPoints] = useState<StoryPointsValue>(null);
  const [jiraStatusId, setJiraStatusId] = useState<JiraStatusIdType>("10003");

  // check localStorage for reporter name
  useEffect(() => {
    const saved = localStorage.getItem("dragon-reporter");
    if (saved) {
      setReporterName(saved);
    }
  }, []);

  // save reporter name to localStorage
  const handleSaveName = (name: string) => {
    localStorage.setItem("dragon-reporter", name);
    setReporterName(name);
  };

  // reset reporter name
  const handleResetReporter = () => {
    localStorage.removeItem("dragon-reporter");
    setReporterName(null);
  };

  const handleCollapseToggle = () => {
    console.log("💥 Collapse button clicked!");
    if (window.electron?.ipcRenderer?.send) {
      window.electron.ipcRenderer.send("toggle-collapse", null);
      if (setIsCollapsed) {
        setIsCollapsed(!isCollapsed);
      }
    } else {
      console.warn("Electron context not ready.");
    }
  };

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Box className={globalClasses.appWrapper} my="0" pb="0" pt="5px">
        {!isCollapsed && <InfoIconButton onClick={() => setInfoModalOpen(true)} />}
        <DragRegions reporter={reporterName} isCollapsed={isCollapsed} />
        {isCollapsed ? (
          <StampView handleCollapseToggle={handleCollapseToggle} isCollapsed={isCollapsed} />
        ) : reporterName ? (
          <NewTicketForm
            reporter={reporterName}
            onResetReporter={handleResetReporter}
            handleCollapseToggle={handleCollapseToggle}
            slackChannel={slackChannel}
            storyPoints={storyPoints}
            jiraStatusId={jiraStatusId}
          />
        ) : (
          <Onboarding onSave={handleSaveName} handleCollapseToggle={handleCollapseToggle} />
        )}
        <Box
          id="blob-wrapper"
          className={cx(globalClasses.blobWrapper, !reporterName || isCollapsed ? "paused" : "")}
          m="0"
          p="0">
          <svg
            id="blob"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 310 350">
            <path d="M156.4,339.5c31.8-2.5,59.4-26.8,80.2-48.5c28.3-29.5,40.5-47,56.1-85.1c14-34.3,20.7-75.6,2.3-111  c-18.1-34.8-55.7-58-90.4-72.3c-11.7-4.8-24.1-8.8-36.8-11.5l-0.9-0.9l-0.6,0.6c-27.7-5.8-56.6-6-82.4,3c-38.8,13.6-64,48.8-66.8,90.3c-3,43.9,17.8,88.3,33.7,128.8c5.3,13.5,10.4,27.1,14.9,40.9C77.5,309.9,111,343,156.4,339.5z" />
          </svg>
        </Box>
        {!isCollapsed && (
          <UnstyledButton
            className={globalClasses.advancedSettingsIconButton}
            onClick={() => setSettingsModalOpen(true)}
            title="Advanced Settings"
            aria-label="Advanced Settings"
            aria-describedby="advanced-settings">
            <RiSettings4Fill size="24px" />
            <RiSettings4Line size="24px" />
          </UnstyledButton>
        )}
      </Box>
      <InfoModal opened={infoModalOpen} onClose={() => setInfoModalOpen(false)} />
      <SettingsModal
        opened={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        slackChannel={slackChannel}
        setSlackChannel={setSlackChannel}
        storyPoints={storyPoints}
        setStoryPoints={setStoryPoints}
        jiraStatusId={jiraStatusId}
        setJiraStatusId={setJiraStatusId}
      />
    </MantineProvider>
  );
}

// stuff

export default App;
