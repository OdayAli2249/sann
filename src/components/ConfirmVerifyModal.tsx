import { userEndpoints } from "@/api/user";
import AppModal from "@/components/AppModal";
import AppButton from "@/components/inputs/AppButton";
import { useAlert } from "@/context/alerts";
import useReactQuery from "@/hooks/useReactQuery";
import { useTranslation } from "@/translation";
import { IPatient } from "@/types/Patient";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { useQueryClient } from "@tanstack/react-query";

const ConfirmVerifyModal = ({
  open,
  onHandleClose,
  patient,
  invalidateKeys
}: {
  open: boolean;
  onHandleClose: () => void;
  patient: IPatient;
  invalidateKeys?: string[];
}) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const alert = useAlert();

  const { mutate: verify, isLoading } = useReactQuery({
    method: "POST",
    url: userEndpoints.verify.url(patient?.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: invalidateKeys,
      });
      alert(t("Patient email verified successfully"), "success");
      onHandleClose();
    },
    enabled: false,
  });
  return (
    <AppModal
      closeIcon
      open={open}
      title={"Verify Selected Patient?"}
      handleClose={onHandleClose}
      width={"540px"}
      sx={{
        "& .css-1gcpdrz-MuiPaper-root-MuiDialog-paper": {
          borderRadius: "1rem",
        },
      }}
    >
      {t("Are you sure you want to verify selected patient ?")}
      <Divider sx={{ marginY: 3 }} />
      <Stack gap={2} justifyContent="flex-end" direction="row" mt={2}>
        <AppButton width={100} variant="outlined" onClick={onHandleClose}>
          Cancel
        </AppButton>
        <AppButton
          bgcolor="status.red"
          width={120}
          onClick={() => verify({})}
          isLoading={isLoading}
          disabled={isLoading}
        >
          {t("Verify")}
        </AppButton>
      </Stack>
    </AppModal>
  );
};

export default ConfirmVerifyModal;
