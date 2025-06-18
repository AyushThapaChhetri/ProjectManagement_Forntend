// components/DismissibleAlert.tsx
import { Alert, CloseButton, Stack, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";

export type DismissibleAlertProps = {
  status: "error" | "warning" | "info" | "success";
  title: string;
  description?: string;
  duration?: number; // auto‑dismiss after ms; omit to disable
  onClose?: () => void; // notified whenever it closes
};

export const DismissibleAlert = ({
  status,
  title,
  description,
  duration,
  onClose,
}: DismissibleAlertProps) => {
  const { open, onClose: _onClose } = useDisclosure({ defaultOpen: true });

  // call parent when closed
  const handleClose = () => {
    _onClose();
    onClose?.();
  };

  // auto‑dismiss
  useEffect(() => {
    if (duration && open) {
      const id = setTimeout(() => {
        _onClose();
        onClose?.();
      }, duration);
      return () => clearTimeout(id);
    }
  }, [duration, open, _onClose, onClose]);
  if (!open) return null;

  return (
    <Stack mb={2} width="100%">
      <Alert.Root
        size="sm"
        status={status}
        css={{
          h: "40px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>{title}</Alert.Title>
          {description && <Alert.Description>{description}</Alert.Description>}
        </Alert.Content>
        <CloseButton
          onClick={handleClose}
          pos="relative"
          top="2px"
          insetEnd="2px"
        />
      </Alert.Root>
    </Stack>
  );
};
