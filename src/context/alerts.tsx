import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import capitalize from "lodash/capitalize";
import { ReactNode, createContext, useContext, useReducer } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import BlockIcon from "@mui/icons-material/Block";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ColoredSvg from "@/components/ColoredSvg";
import AppButton from "@/components/inputs/AppButton";

const CustomAlert = styled(Alert)(({ theme }) => ({
  gap: "0.5rem",
  "& .MuiAlert-message": {
    padding: 0,
    flex: 1,
  },
  "& .MuiAlert-action , .MuiAlert-icon": {
    padding: 0,
    margin: 0,
  },
  [`${theme.breakpoints.up("lg")}`]: {
    minWidth: "400px", // Increased size
  },
}));

interface State {
  alert: {
    open: boolean;
    message: string;
    type: "success" | "info" | "warning" | "error";
    title?: string;
    icon?: string;
    anchorOrigin?: {
      vertical: "top" | "bottom";
      horizontal: "left" | "center" | "right";
    };
    action?: { name: string; callback: () => void }
  };
  confirm: {
    open: boolean;
    title: string | ReactNode;
    resourceValue: string;
    type?: "Delete" | "Unlink";
    onConfirm?: () => void;
    resourceCustomWarningMsg?: string;
  };
}

const actionTypes = {
  showAlert: "showAlert",
  hideAlert: "hideAlert",
  showConfirm: "showConfirm",
  hideConfirm: "hideConfirm",
};

interface ContextValue {
  state: State;
  dispatch: React.Dispatch<any>;
}

const initialState: State = {
  alert: { open: false, message: "", type: "error" },
  confirm: { open: false, resourceValue: "", title: "" },
};

// Action creators
const showAlert = (
  message: string,
  type: "success" | "info" | "warning" | "error",
  title?: string,
  icon?: string,
  anchorOrigin?: {
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
  },
  action?: { name: string; callback: () => void }
) => ({
  type: actionTypes.showAlert,
  payload: { message, type, title, icon, anchorOrigin, action },
});

const hideAlert = () => ({ type: actionTypes.hideAlert });

const showConfirm = ({
  title,
  type,
  resourceValue,
  onConfirm,
  resourceCustomWarningMsg,
}: {
  type: string;
  resourceValue: string | number;
  onConfirm: () => void;
  title?: string | ReactNode;
  resourceCustomWarningMsg?: string;
}) => ({
  type: actionTypes.showConfirm,
  payload: { type, title, resourceValue, onConfirm, resourceCustomWarningMsg },
});

const hideConfirm = () => ({ type: actionTypes.hideConfirm });

// Context
const AlertsContext = createContext<ContextValue>({
  state: initialState,
  dispatch: () => undefined,
});

// Reducer
const alertsReducer = (state: State, action: any): State => {
  switch (action.type) {
    case actionTypes.showAlert:
      return {
        ...state,
        alert: {
          open: true,
          message: action.payload.message,
          type: action.payload.type,
          title: action.payload.title,
          icon: action.payload.icon,
          anchorOrigin: action.payload.anchorOrigin,
          action: action.payload.action,
        },
      };

    case actionTypes.hideAlert:
      return {
        ...state,
        alert: {
          ...state.alert,
          open: false,
        },
      };

    case actionTypes.showConfirm:
      return {
        ...state,
        confirm: {
          open: true,
          ...action.payload,
        },
      };

    case actionTypes.hideConfirm:
      return {
        ...state,
        confirm: {
          open: false,
          resourceValue: "",
          title: "",
        },
      };

    default:
      return state;
  }
};

const AlertsContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(alertsReducer, initialState);

  const onClose = () => dispatch(hideAlert());

  return (
    <AlertsContext.Provider value={{ state, dispatch }}>
      <>
        {children}

        <Snackbar
          open={state.alert.open}
          anchorOrigin={
            state.alert.anchorOrigin || {
              horizontal: "center",
              vertical: "bottom",
            }
          }
          autoHideDuration={6000}
          sx={{ maxWidth: 300 }}
          ClickAwayListenerProps={{ onClickAway: () => null }}
          onClose={onClose}
        >
          <CustomAlert
            onClose={onClose}
            severity={state.alert.type}
            sx={{
              width: "100%",
              padding: "24px",
              fontSize: "16px",
              border: "1px solid",
              borderRadius: "1rem", // TODO: add sx to alert state
            }} // Increased padding and font size
            iconMapping={{
              success: <CheckCircleOutlineIcon fontSize="inherit" />,
              error: <BlockIcon fontSize="inherit" />,
            }}
            icon={
              state.alert.icon ? (
                <ColoredSvg
                  src={state.alert.icon}
                  width={100}
                  height={100}
                  defaultColor
                />
              ) : <></>
            }
            action={
              <IconButton
                size="small"
                color="inherit"
                sx={{ padding: 0 }}
                onClick={onClose}
              >
                <HighlightOffIcon fontSize="small" color="inherit" />
              </IconButton>
            }
          >
            <Stack gap={"0.5rem"}>
              <Typography lineHeight={1} m="0">
                {capitalize(state.alert.title ?? state.alert.type)}
              </Typography>
              {capitalize(state.alert.message)}
              {state.alert.action && <AppButton
                bgcolor="status.red"
                width={120}
                onClick={state.alert.action.callback}
              >
                {state.alert.action?.name}
              </AppButton>}
            </Stack>
          </CustomAlert>
        </Snackbar>
      </>
    </AlertsContext.Provider>
  );
};

// Custom hooks for alerts and confirm dialogs
const useAlertsContext = () => useContext(AlertsContext);

export const useAlert = () => {
  const { dispatch } = useAlertsContext();

  return (
    message: string,
    type: "success" | "info" | "warning" | "error" = "error",
    title?: string,
    icon?: string,
    anchorOrigin?: {
      vertical: "top" | "bottom";
      horizontal: "left" | "center" | "right";
    },
    action?: { name: string; callback: () => void }
  ) => {
    dispatch(showAlert(message, type, title, icon, anchorOrigin, action));
  };
};

export const useConfirm = () => {
  const { dispatch } = useAlertsContext();

  return ({
    type,
    title,
    resourceValue,
    onConfirm,
    resourceCustomWarningMsg,
  }: {
    type: "Delete" | "Unlink";
    onConfirm: () => void;
    resourceValue?: string | number;
    title?: string | ReactNode;
    resourceCustomWarningMsg?: string;
  }) => {
    dispatch(
      showConfirm({
        title,
        type,
        resourceValue: resourceValue!,
        onConfirm,
        resourceCustomWarningMsg,
      })
    );
  };
};

export {
  AlertsContextProvider,
  useAlertsContext,
  showAlert,
  hideConfirm,
  showConfirm,
  hideAlert,
};
