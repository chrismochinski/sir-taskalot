import { useState } from "react";
import { Box, Button, Image, TextInput, Title, Text, Flex } from "@mantine/core";
import dragonButler from "../assets/dragon-butler.png";
import { useOnboardingStyles } from ".";
import { useGlobalStyles } from "../Globals/";

type OnboardingProps = {
  onSave: (name: string) => void;
};

export function Onboarding({ onSave }: OnboardingProps) {
  const { classes, cx } = useOnboardingStyles();
  const { classes: globalClasses } = useGlobalStyles();
  const [name, setName] = useState("");

  return (
    <Box className={classes.onboardingWrapper} w="100%" h="100%">
      <Flex justify="center" align="center" gap="0.5rem" mb="1.5rem">
        <Image
          src={dragonButler}
          alt="Sir Taskalot - who happens to be a dragon"
          width="90px"
          height="auto"
        />
        <Box>
          <Title order={2}>Welcome to Sir Taskalot!</Title>
          <Text component="h3" fw={600}>
            Just{" "}
            <Text component="span" className={classes.highlightSpan}>
              one question
            </Text>{" "}
            before we begin...
          </Text>
        </Box>
      </Flex>
      <Text component="h4" fw={600} pt="0.5rem">
        Who are you?
      </Text>
      <Text component="h5" fw={300} mt="0.6em" mb="2px">
        (don't worry - you can change this later)
      </Text>
      <TextInput
        size="xs"
        radius="xl"
        placeholder="NEW FORM WHO DIS?"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && name.trim()) {
            onSave(name);
          }
        }}
        w="270px"
        mt="0.5rem"
        mb="1.5rem"
      />
      <Button
        className={cx(globalClasses.button, classes.goButton)}
        onClick={() => onSave(name)}
        disabled={!name.trim()}>
        Go!
      </Button>
    </Box>
  );
}
