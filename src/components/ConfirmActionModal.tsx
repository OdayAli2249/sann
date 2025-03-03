import AppModal from "@/components/AppModal";
import AppButton from "@/components/inputs/AppButton";
import { useTranslation } from "@/translation";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

const ConfirmActionModal = ({
  open,
  onConfirm,
  onHandleClose,
  title,
  content,
  positiveLabel,
  negativeLabel,
  isLoading,
}: {
  open: boolean;
  onHandleClose: () => void;
  onConfirm: () => void;
  title?: string;
  content: string;
  positiveLabel: string;
  negativeLabel: string;
  isLoading?: boolean;
}) => {
  const { t } = useTranslation();

  return (
    <AppModal
      closeIcon
      open={open}
      title={title}
      handleClose={onHandleClose}
      width={"540px"}
      sx={{
        "& .css-1gcpdrz-MuiPaper-root-MuiDialog-paper": {
          borderRadius: "1rem",
        },
      }}
    >
      {content}
      <Divider sx={{ marginY: 3 }} />
      <Stack gap={2} justifyContent="flex-end" direction="row" mt={2}>
        <AppButton width={100} variant="outlined" onClick={onHandleClose}>
          {negativeLabel ?? "Cancel"}
        </AppButton>
        <AppButton
          bgcolor="status.red"
          width={120}
          onClick={() => onConfirm()}
          disabled={isLoading}
        >
          {positiveLabel ?? t("Confirm")}
        </AppButton>
      </Stack>
    </AppModal>
  );
};

export default ConfirmActionModal;
