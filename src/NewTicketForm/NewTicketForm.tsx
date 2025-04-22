import { useEffect, useState } from "react";
import { FaBug, FaBook } from "react-icons/fa";

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

/**
 * @component {NewTicketForm}
 * @description Phase 1 concept for Marketing -&gt; Dragon Jira requests, associated with Mo&#39;s Q2 2025 optimizations rock
 * @author Mo <mo@characterstrong.com>
 * @returns NewTicketForm - the NewTicketForm component
 */
export function NewTicketForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"Lowest" | "Low" | "Medium" | "High" | "Highest">(
    "Medium"
  );
  const [ticketType, setTicketType] = useState<"Bug" | "Story">("Story");
  const [slackThread, setSlackThread] = useState("");
  const [reporter, setReporter] = useState("");

  const { classes, cx } = useNewTicketFormStyles({ ticketTypeStyle: ticketType });

  // Load saved reporter name from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("dragon-reporter");
    if (saved) setReporter(saved);
  }, []);

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
    <Box className={cx(classes.dragonTicketPageWrapper)} pb="0">
      <Box className={classes.blobWrapper}>
        <svg
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 310 350">
          <path d="M156.4,339.5c31.8-2.5,59.4-26.8,80.2-48.5c28.3-29.5,40.5-47,56.1-85.1c14-34.3,20.7-75.6,2.3-111  c-18.1-34.8-55.7-58-90.4-72.3c-11.7-4.8-24.1-8.8-36.8-11.5l-0.9-0.9l-0.6,0.6c-27.7-5.8-56.6-6-82.4,3c-38.8,13.6-64,48.8-66.8,90.3c-3,43.9,17.8,88.3,33.7,128.8c5.3,13.5,10.4,27.1,14.9,40.9C77.5,309.9,111,343,156.4,339.5z" />
        </svg>
      </Box>
      <Box className={cx(classes.dragonTicketSuccessWrapper)} my="0">
        <Flex
          className={classes.flexHeaderWrapper}
          justify="center"
          align="center"
          maw="470px"
          mb="0"
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
            <Title order={2} className={classes.headerText}>
              SIR TASKALOT
            </Title>
            <Text component="p" className={classes.bodyText}>
              Please fill out the form below to submit your request. We will review it, reach out
              with any questions or clarifications, and get started on. Thanks!
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
            className={classes.dragonFormInput}
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
            className={classes.dragonFormInput}
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
            className={classes.dragonFormInput}
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
            className={classes.dragonFormInput}
          />

          <TextInput
            w="100%"
            radius="xl"
            label="Your Name"
            placeholder="NEW FORM WHO DIS"
            value={reporter}
            onChange={(e) => setReporter(e.currentTarget.value)}
            className={classes.dragonFormInput}
          />

          <Button onClick={handleSubmit} my="1rem" mx="auto" className={classes.button}>
            Submit Ticket
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
