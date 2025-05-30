import { useCallback, useEffect, useState } from "react";
import { Box, Image, Text, UnstyledButton } from "@mantine/core";
import { useDropzone } from "react-dropzone";
import { useImageUploaderStyles } from ".";

export function ImageUploader() {
    const [preview, setPreview] = useState<string | null>(null);
    const { classes, cx } = useImageUploaderStyles({preview});

  // Dropzone for drag + click
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  // Paste support
  useEffect(() => {
    const handlePaste = async (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (const item of items) {
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (!file) continue;
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreview(reader.result as string);
          };
          reader.readAsDataURL(file);
          break;
        }
      }
    };

    window.addEventListener("paste", handlePaste as unknown as EventListener);
    return () => window.removeEventListener("paste", handlePaste as unknown as EventListener);
  }, []);

  return (
    <Box className={classes.imageUploaderWrapper}>
      <Box
        className={cx(classes.imageUploader, isDragActive && "dragging")}
        {...getRootProps()}>
        {preview ? (
          <UnstyledButton className={classes.removeButton} onClick={() => setPreview(null)}>
            <Text component="span">Remove Image</Text>
          </UnstyledButton>
        ) : (
          <Box>
            {isDragActive ? (

                <Text component="label">Yep! Drop it here!</Text>
            ) : (
                <Text component="label">
                    Drag, click, or paste an image
                </Text>
            )
        
        }
            <input {...getInputProps()} />
          </Box>
        )}
      </Box>

      {preview && (
        <Image
          src={preview}
          height="100%"
          alt="Preview"
          fit="fill"
          className={classes.imagePreview}
        />
      )}
    </Box>
  );
}
