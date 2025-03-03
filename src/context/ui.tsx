import { ReactNode, createContext, useContext, useReducer } from "react";
// Import custom theme
import { ThemeProvider } from '@mui/material/styles';
import customTheme from '@/styles/theme'; 
import CssBaseline from '@mui/material/CssBaseline';

interface State {
  isDark: boolean;
}

const actionTypes = {
  toggleDarkTheme: "toggleDarkTheme",
};

interface ContextValue {
  state: State;
  dispatch: React.Dispatch<any>;
}

const initialState: State = {
  isDark: false,
};

// initialize

const init = (): State => {
  const theme = localStorage.getItem("theme");
  if (theme) {
    return { ...initialState, isDark: theme === "true" ? true : false };
  } else return initialState;
};
// action creators
const toggleDarkTheme = (isDark: boolean) => {
  localStorage.setItem("theme", isDark ? "true" : "false");
  return { type: actionTypes.toggleDarkTheme };
};

// context
const UiContext = createContext<ContextValue>({
  state: initialState,
  dispatch: () => undefined,
});

// reducer
const uiContextReducer = (state: State, action: any): State => {
  switch (action.type) {
    case actionTypes.toggleDarkTheme:
      return { ...state, isDark: !state.isDark };

    default:
      return state;
  }
};

const UIContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(uiContextReducer, initialState, init);

  return (
    <UiContext.Provider value={{ state, dispatch }}>
      <ThemeProvider theme={state.isDark ? customTheme.darkTheme : customTheme.lightTheme}>
        {children}

        <CssBaseline />
      </ThemeProvider>
    </UiContext.Provider>
  );
};

const useUiContext = () => useContext(UiContext);

export { UIContextProvider, useUiContext, toggleDarkTheme };
