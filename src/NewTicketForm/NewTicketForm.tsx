import { useEffect, useState } from "react";
import { FaBug, FaBook } from "react-icons/fa";

import {
  Box,
  Title,
  Text,
  TextInput,
  Textarea,
  Select,
  Image,
  Button,
  SegmentedControl,
  Flex,
} from "@mantine/core";
import { useNewTicketFormStyles, submitTicket } from ".";

/**
 * @component {NewTicketForm}
 * @description Phase 1 concept for Marketing -&gt; Dragon Jira requests, associated with Mo&#39;s Q2 2025 optimizations rock
 * @author Mo <mo@characterstrong.com>
 * @returns NewTicketForm - the NewTicketForm component
 */
export function NewTicketForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [ticketType, setTicketType] = useState<"Bug" | "Story">("Story");
  const [slackThread, setSlackThread] = useState("");
  const [reporter, setReporter] = useState("");

  const { classes, cx } = useNewTicketFormStyles({ ticketTypeStyle: ticketType });
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("authToken");

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
      alert("🎉 Ticket submitted to Slack!");
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
    <Box id="dragon-ticket-form-v1">
      <Box
        className={cx(
          classes.dragonTicketPageWrapper,
          token === import.meta.env.VITE_DRAGON_FORM_SECRET ? "success" : "unauth"
        )}
        pb="0"
        mt="-80px">
        {token !== import.meta.env.VITE_DRAGON_FORM_SECRET ? (
          <Box className={cx(classes.dragonTicketUnauthWrapper)} my="0">
            <Title order={2} className={classes.headerText}>
              ⛔️ Unauthorized
            </Title>
            <Text component="p" className={classes.bodyText}>
              Did you get a specific link to the form?
            </Text>
            <Image
              radius="20px"
              mt="1rem"
              src="/media/tools/dragon-tongue.gif"
              alt="Cute Dragon Raspberry"
              width="175px"
            />
          </Box>
        ) : (
          <Box className={cx(classes.dragonTicketSuccessWrapper)} my="0">
            <Title order={2} className={classes.headerText}>
              Create a Dragon Ticket
            </Title>

            <Text component="p" className={classes.bodyText} maw="600px" ta="center">
              Please fill out the form below to submit your request. We will review it, reach out
              with any questions or clarifications, and get started on. Thanks!
            </Text>
            <Box className={classes.formFieldsBox}>
              <TextInput
                w="100%"
                radius="xl"
                label="Title"
                required
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
                className={classes.dragonFormInput}
                placeholder="Just the meat & taters here"
              />

              <Textarea
                w="100%"
                radius="md"
                label="Description"
                minRows={4}
                value={description}
                onChange={(e) => setDescription(e.currentTarget.value)}
                className={classes.dragonFormInput}
                placeholder="Share as much or as little as you can - we love context & clarity!"
              />

              <Select
                radius="xl"
                w="50%"
                label="Priority"
                data={["Lowest", "Low", "Medium", "High", "Highest"]}
                value={priority}
                onChange={(value) => setPriority(value || "")}
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
                placeholder="If applicable & if contextually helpful"
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
        )}
      </Box>
      <Box
        mx="0"
        mb="0"
        mt="-2rem"
        bg={token === import.meta.env.VITE_DRAGON_FORM_SECRET ? "#DEFCEE" : "#F2D0D1"}></Box>
    </Box>
  );
}
