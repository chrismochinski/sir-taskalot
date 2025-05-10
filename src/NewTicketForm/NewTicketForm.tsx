import { useEffect, useState } from "react";
import { FaBug, FaBook } from "react-icons/fa";
import { useGlobalStyles } from "../Globals";

// rich text editor imports
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";

// rich text icons
import {
  RiHeading,
  RiBold,
  RiItalic,
  RiFormatClear,
  RiListUnordered,
  RiListOrdered2,
} from "react-icons/ri";
import { BiLink, BiUnlink } from "react-icons/bi";

import {
  Box,
  Title,
  Text,
  TextInput,
  Select,
  Button,
  SegmentedControl,
  Flex,
  Image,
} from "@mantine/core";
import { useNewTicketFormStyles, submitTicket } from ".";
import dragonButler from "../assets/dragon-butler.png";

interface NewTicketFormProps {
  reporter?: string;
  onResetReporter?: () => void;
}

const iconSize = 13;
const headingIcon = () => <RiHeading size={iconSize + 2} />;
const boldIcon = () => <RiBold size={iconSize} />;
const italicIcon = () => <RiItalic size={iconSize} />;
const linkIcon = () => <BiLink size={iconSize + 3} />;
const unlinkIcon = () => <BiUnlink size={iconSize + 2} />;
const listIcon = () => <RiListUnordered size={iconSize + 1} />;
const orderedListIcon = () => <RiListOrdered2 size={iconSize + 2} />;
const clearIcon = () => <RiFormatClear size={iconSize + 2} />;

/**
 * @component {NewTicketForm}
 * @description Phase 1 concept for Marketing -&gt; Dragon Jira requests, associated with Mo&#39;s Q2 2025 optimizations rock
 * @author Mo <mo@characterstrong.com>
 * @returns NewTicketForm - the NewTicketForm component
 */
export function NewTicketForm(props: NewTicketFormProps) {
  const { reporter, onResetReporter } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionJson, setDescriptionJson] = useState({});
  const [priority, setPriority] = useState<"Lowest" | "Low" | "Medium" | "High" | "Highest">(
    "Medium"
  );
  const [ticketType, setTicketType] = useState<"Bug" | "Story">("Story");
  const [slackThread, setSlackThread] = useState("");

  // IMPORTANT RICH TEXT EDITOR STUFF

  const rteEditor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2] }, // Only allow H2
      }),
      Placeholder.configure({ placeholder: "We love context and clarity!" }),
      Link,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: description,
    onUpdate: ({ editor }) => {
      setDescription(editor.getHTML()); // SLACK
      setDescriptionJson(editor.getJSON()); // JIRA
    },
  });
  // IMPORTANT RICH TEXT EDITOR STUFF

  const { classes, cx } = useNewTicketFormStyles({ ticketTypeStyle: ticketType });
  const { classes: globalClasses } = useGlobalStyles();

  // Save reporter name to localStorage on change
  useEffect(() => {
    if (reporter) localStorage.setItem("dragon-reporter", reporter);
  }, [reporter]);

  const handleSubmit = async () => {
    const success = await submitTicket({
      title,
      description, // SLACK
      descriptionJson, // JIRA
      priority,
      ticketType,
      slackThread,
      reporter,
    });

    if (success) {
      alert("Ticket submitted to Slack 🚀");
      setTitle("");
      setDescription(""); // SLACK
      setDescriptionJson({}); // JIRA
      setSlackThread("");
      setPriority("Medium");
      setTicketType("Story");
    } else {
      alert("Slack post failed.");
    }
  };

  return (
    <Box className={cx(classes.newTicketFormWrapper)} pt="0" my="0">
      <Flex
        className={cx(classes.flexHeaderWrapper)}
        justify="center"
        align="center"
        maw="450px"
        gap="min(0.25rem, 0.3vw)">
        <Image
          src={dragonButler}
          alt="Sir Taskalot - who happens to be a dragon"
          width="80px"
          m={0}
          p={0}
        />
        <Box>
          <Title order={1}>
            SIR TASKALOT
            <Text className={globalClasses.trademark} component="span">
              &trade;
            </Text>
          </Title>

          <Text component="p">
            Send us a request! We will review it, reach out with any questions, and get crackin'.
            Thanks in advance!
          </Text>
        </Box>
      </Flex>

      <Box className={classes.formFieldsBox}>
        <TextInput
          w="100%"
          radius="xl"
          label="Title"
          required
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          placeholder="Just the meat & taters"
        />

        {/* IMPORTANT CHANGE ICONS  */}
        <Box w="100%" className={classes.rteBox}>
          <Text component="label">Description</Text>
          <RichTextEditor editor={rteEditor} className={classes.richTextEditor}>
            <RichTextEditor.Toolbar sticky stickyOffset={0} className={classes.rteToolbar}>
              <RichTextEditor.ControlsGroup>
                <RichTextEditor.H2 icon={headingIcon} />

                <RichTextEditor.Bold icon={boldIcon} />
                <RichTextEditor.Italic icon={italicIcon} />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Link icon={linkIcon} />
                <RichTextEditor.Unlink icon={unlinkIcon} />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.BulletList icon={listIcon} />
                <RichTextEditor.OrderedList icon={orderedListIcon} />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.ClearFormatting icon={clearIcon} />
              </RichTextEditor.ControlsGroup>
            </RichTextEditor.Toolbar>

            <RichTextEditor.Content />
          </RichTextEditor>
        </Box>

        <Select
          radius="xl"
          w="50%"
          label="Priority"
          data={["Lowest", "Low", "Medium", "High", "Highest"]}
          value={priority}
          onChange={(value) =>
            setPriority(value as "Lowest" | "Low" | "Medium" | "High" | "Highest")
          }
          placeholder="Select priority"
        />
        <Box className={classes.flex}>
          <Text component="label">Ticket Type</Text>
          <Text component="span">
            <Text component="span" fw={500} color="#1D96D2">
              New
            </Text>{" "}
            = new or updated page, content, or feature
            <br />
            <Text component="span" fw={500} color="#F0AD1E">
              Bug
            </Text>{" "}
            = issue with existing content
          </Text>
          <SegmentedControl
            size="xs"
            className={classes.ticketType}
            radius="12px"
            data={[
              {
                value: "Story",
                label: (
                  <Flex w="90px" justify="center" align="center" gap="0.5rem">
                    <FaBook size={16} />
                    <Text component="span">New</Text>
                  </Flex>
                ),
              },
              {
                value: "Bug",
                label: (
                  <Flex w="90px" justify="center" align="center" gap="0.5rem">
                    <FaBug size={16} />
                    <Text component="span">Bug</Text>
                  </Flex>
                ),
              },
            ]}
            value={ticketType}
            onChange={(value) => setTicketType(value as "Bug" | "Story")}
          />
        </Box>
        <TextInput
          w="100%"
          radius="xl"
          label="Slack Thread"
          placeholder="If applicable"
          value={slackThread}
          onChange={(e) => setSlackThread(e.currentTarget.value)}
        />
        <Button
          onClick={handleSubmit}
          mt="0.5rem"
          mb="1rem"
          mx="auto"
          className={globalClasses.button}>
          Submit Ticket
        </Button>
        {reporter && onResetReporter && (
          <Text component="h6">
            Not {reporter}?{" "}
            <Text component="a" onClick={onResetReporter}>
              Click here to update your name!
            </Text>
          </Text>
        )}
      </Box>
      <Box className={globalClasses.dragRegion} id="form-bottom" />
      <Box className={globalClasses.dragRegion} id="form-top" />
    </Box>
  );
}
