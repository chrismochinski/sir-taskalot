import { useEffect, useState } from "react";
import { FaBug, FaBook } from "react-icons/fa";
import { useGlobalStyles } from "../Globals";

import {
  Box,
  Title,
  Text,
  TextInput,
  Textarea,
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
  const [priority, setPriority] = useState<"Lowest" | "Low" | "Medium" | "High" | "Highest">(
    "Medium"
  );
  const [ticketType, setTicketType] = useState<"Bug" | "Story">("Story");
  const [slackThread, setSlackThread] = useState("");

  const { classes, cx } = useNewTicketFormStyles({ ticketTypeStyle: ticketType });
  const { classes: globalClasses } = useGlobalStyles();

  // Save reporter name to localStorage on change
  useEffect(() => {
    if (reporter) localStorage.setItem("dragon-reporter", reporter);
  }, [reporter]);

  const handleSubmit = async () => {
    const success = await submitTicket({
      title,
      description,
      priority,
      ticketType,
      slackThread,
      reporter,
    });

    if (success) {
      alert("Ticket submitted to Slack 🚀");
      setTitle("");
      setDescription("");
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
        maw="470px"
        gap="min(0.25rem, 0.3vw)">
        <Image
          src={dragonButler}
          alt="Sir Taskalot - who happens to be a dragon"
          width="clamp(80px, 17vw, 120px)"
          height="clamp(80px, 17vw, 120px)"
          m={0}
          p={0}
        />
        <Box>
          <Title order={1}>SIR TASKALOT</Title>
          <Text component="p">
            Fill out this quick n' dirty form to submit your request. We will review it, reach out
            with any questions or updates, and get crackin'. Thanks in
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

        <Textarea
          w="100%"
          radius="md"
          label="Description"
          required
          minRows={3}
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
          placeholder="We love context & clarity"
        />

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
              Story
            </Text>{" "}
            = content addition/update
            <br />
            <Text component="span" fw={500} color="#F0AD1E">
              Bug
            </Text>{" "}
            = error or issue with existing content
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
                    <Text component="span">Story</Text>
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
      <Box className={globalClasses.dragRegion} id="form-bottom"/>
      <Box className={globalClasses.dragRegion} id="form-top"/>
    </Box>
  );
}
