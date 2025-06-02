import { forwardRef } from "react";
import { useEffect, useState } from "react";
import { useGlobalStyles, DragonButton, ImageUploader } from "..";

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
import { MdLibraryAdd, MdBugReport } from "react-icons/md";

// jira priority icons + asset(s)
import LowestIcon from "../assets/jira/Lowest.png";
import LowIcon from "../assets/jira/Low.png";
import MediumIcon from "../assets/jira/Medium.png";
import HighIcon from "../assets/jira/High.png";
import HighestIcon from "../assets/jira/Highest.png";

// mantine imports and stuff
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
  SelectItemProps,
} from "@mantine/core";
import { useNewTicketFormStyles, submitTicket } from ".";

export interface NewTicketFormProps {
  reporter?: string;
  onResetReporter?: () => void;
  isCollapsed?: boolean;
  handleCollapseToggle?: () => void;
}

interface PriorityOptionProps extends SelectItemProps {
  icon: string;
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
  const { reporter, onResetReporter, handleCollapseToggle, isCollapsed } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionJson, setDescriptionJson] = useState({});
  const [priority, setPriority] = useState<"Lowest" | "Low" | "Medium" | "High" | "Highest">(
    "Medium"
  );
  const [ticketType, setTicketType] = useState<"Bug" | "Story">("Story");
  const [slackThread, setSlackThread] = useState("");

const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // rich text editor setup
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
  // end rich text editor setup

  const { classes, cx } = useNewTicketFormStyles({ ticketTypeStyle: ticketType });
  const { classes: globalClasses } = useGlobalStyles({ isCollapsed });

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
      previews: imagePreviews,
    });

    if (success) {
      alert("Ticket submitted 🚀");
      setTitle("");
      setDescription(""); // SLACK
      setDescriptionJson({}); // JIRA

      if (rteEditor) {
        rteEditor.commands.clearContent();
      }

      setSlackThread("");
      setPriority("Medium");
      setTicketType("Story");
    } else {
      alert("Slack post failed.");
    }
  };

  // Map each priority level to its icon
  const priorityOptions = [
    { value: "Highest", label: "Highest", icon: HighestIcon },
    { value: "High", label: "High", icon: HighIcon },
    { value: "Medium", label: "Medium", icon: MediumIcon },
    { value: "Low", label: "Low", icon: LowIcon },
    { value: "Lowest", label: "Lowest", icon: LowestIcon },
  ];

  // Custom item component with forwardRef
  const SelectItem = forwardRef<HTMLDivElement, PriorityOptionProps>(
    ({ label, icon, ...rest }: PriorityOptionProps, ref) => (
      <Flex ref={ref} {...rest} gap="0.5rem" align="center">
        <Image src={icon} width={12} height={12} alt={`${label} icon`} />
        <Text>{label}</Text>
      </Flex>
    )
  );

  SelectItem.displayName = "SelectItem"; // Required for forwardRef

  return (
    <Box className={cx(classes.newTicketFormWrapper)} pt="0" my="0">
      <Flex
        className={cx(classes.flexHeaderWrapper)}
        justify="center"
        align="center"
        gap="min(0.25rem, 0.3vw)">
        <DragonButton handleCollapseToggle={handleCollapseToggle} />
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
          size="xs"
          w="100%"
          radius="xl"
          label="Title"
          required
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          placeholder="Just the meat & taters"
        />

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

        <ImageUploader previews={imagePreviews} setPreviews={setImagePreviews} />

        <Box className={classes.priorityTypeFlex}>
          <Select
            size="xs"
            radius="xl"
            w="115px"
            label="Priority"
            placeholder="Select priority"
            data={priorityOptions}
            value={priority}
            onChange={(value) =>
              setPriority(value as "Low" | "Lowest" | "Medium" | "Highest" | "High")
            }
            icon={
              priority ? (
                <Image
                  height={12}
                  width={12}
                  src={priorityOptions.find((p) => p.value === priority)?.icon}
                />
              ) : null
            }
            itemComponent={SelectItem}
          />
          <Box w="min-content" pos="relative">
            <Text component="label">Ticket Type</Text>

            <SegmentedControl
              size="xs"
              className={classes.ticketType}
              radius="lg"
              data={[
                {
                  value: "Story",
                  label: (
                    <Flex w="90px" justify="center" align="center" gap="0.5rem">
                      <MdLibraryAdd size={13} />
                      <Text component="span">New</Text>
                    </Flex>
                  ),
                },
                {
                  value: "Bug",
                  label: (
                    <Flex w="90px" justify="center" align="center" gap="0.5rem">
                      <MdBugReport size={16} />
                      <Text component="span">Bug</Text>
                    </Flex>
                  ),
                },
              ]}
              value={ticketType}
              onChange={(value) => setTicketType(value as "Bug" | "Story")}
            />
            <Text component="span" className={classes.typeSubLabel}>
              {ticketType === "Story"
                ? "New/updated page, content, feature"
                : "Issue, error, or problem to fix"}
            </Text>
          </Box>
        </Box>
        <TextInput
          size="xs"
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
          mb="0.75rem"
          mx="auto"
          className={globalClasses.button}>
          Submit Ticket
        </Button>
        {reporter && onResetReporter && (
          <Text component="h6">
            Not {reporter}?{" "}
            <Text component="a" onClick={onResetReporter}>
              Update your name.
            </Text>
          </Text>
        )}
      </Box>
    </Box>
  );
}
