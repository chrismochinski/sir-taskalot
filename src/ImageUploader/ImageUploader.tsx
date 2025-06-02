import { useCallback, useEffect, useState } from "react";
import { Box, Flex, Image, Text, UnstyledButton, Popover, Modal } from "@mantine/core";
import { useDropzone } from "react-dropzone";
import { colors } from "..";
import { BiImageAdd, BiSolidImageAdd } from "react-icons/bi";
import { TiDelete, TiDeleteOutline } from "react-icons/ti";
import { useImageUploaderStyles } from ".";

type ImageUploaderProps = {
  previews: string[];
  setPreviews: React.Dispatch<React.SetStateAction<string[]>>;
};

export function ImageUploader({ previews, setPreviews }: ImageUploaderProps) {
  // State management
  const [isHovered, setIsHovered] = useState(false);
  const [deleteHoveredIndex, setDeleteHoveredIndex] = useState<number | null>(null);
  const [hoveredImageIndex, setHoveredImageIndex] = useState<number | null>(null);
  const [fullImage, setFullImage] = useState<string | null>(null);
  const { classes, cx } = useImageUploaderStyles({ imageCount: previews.length });

  // Dropzone for drag + click
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
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
            setPreviews((prev) => [...prev, reader.result as string]);
          };
          reader.readAsDataURL(file);
        }
      }
    };

    window.addEventListener("paste", handlePaste as unknown as EventListener);
    return () => window.removeEventListener("paste", handlePaste as unknown as EventListener);
  }, []);

  const showSolidIcon = isDragActive || isHovered;

  return (
    <Box className={classes.imageUploaderWrapper}>
      <Box
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cx(classes.imageUploader, isDragActive && "dragging")}
        {...getRootProps()}>
        <Flex justify="center" align="center" gap="0.5rem">
          {showSolidIcon ? (
            <BiSolidImageAdd
              size={previews.length < 4 ? 18 : previews.length >= 5 ? 24 : 28}
              fill={colors.borderBlue}
            />
          ) : (
            <BiImageAdd
              size={previews.length < 4 ? 18 : previews.length >= 5 ? 24 : 28}
              fill={`${colors.black}70`}
            />
          )}
          {previews.length < 4 && <Text component="label">Drag, Click, or Paste</Text>}
        </Flex>
        <input {...getInputProps()} />
      </Box>

      {previews.map((src, idx) => (
        <Box key={idx} className={classes.eachPreviewBox}>
          <Popover
            shadow="xl"
            arrowSize={14}
            arrowOffset={18}
            radius="10px"
            withinPortal
            zIndex={1000}
            position="top-end"
            withArrow
            opened={hoveredImageIndex === idx}>
            <Popover.Target>
              <Box
                onMouseEnter={() => setHoveredImageIndex(idx)}
                onMouseLeave={() => setHoveredImageIndex(null)}
                className={classes.imageHoverPreviewWrapper}>
                <Image
                  className={cx(
                    classes.imagePreview,
                    deleteHoveredIndex === idx && "deleteHovered"
                  )}
                  src={src}
                  alt={`Preview ${idx}`}
                  height="100%"
                  fit="contain"
                  onClick={() => setFullImage(src)}
                />
              </Box>
            </Popover.Target>
            <Popover.Dropdown p="xs">
              <Image src={src} alt="Zoomed preview" width="200px" height="200px" radius="md" />
            </Popover.Dropdown>
          </Popover>
          <UnstyledButton
            onMouseEnter={() => setDeleteHoveredIndex(idx)}
            onMouseLeave={() => setDeleteHoveredIndex(null)}
            className={classes.removeImageButton}
            onClick={() => {
              setPreviews((prev) => prev.filter((_, i) => i !== idx));
            }}>
            {deleteHoveredIndex === idx ? (
              <TiDeleteOutline
                fill={colors.red}
                size={previews.length < 5 ? 18 : 15}
                className={classes.removeImageIcon}
              />
            ) : (
              <TiDelete
                fill={colors.red}
                size={previews.length < 5 ? 18 : 15}
                className={classes.removeImageIcon}
              />
            )}
          </UnstyledButton>

          <Modal
            overlayProps={{ opacity: 0.7, blur: 3 }}
            className={classes.fullImageModal}
            opened={!!fullImage}
            onClose={() => setFullImage(null)}
            title={`Image preview for ${idx + 1}`}
            size="md"
            withCloseButton
            radius="lg"
            centered
            transitionProps={{ transition: "slide-up", duration: 300 }}>
            <Image src={fullImage!} alt="Full image" radius="md" fit="contain" />
          </Modal>
        </Box>
      ))}
    </Box>
  );
}
