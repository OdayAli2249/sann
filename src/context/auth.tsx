import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

interface State {
  isAuthenticated: boolean;
}

const enum ActionTypes {
  Login = "login",
  Logout = "logout",
  Initial = "initial",
};

interface ContextValue {
  state: State;
  dispatch: React.Dispatch<any>;
}

const initialState: State = {
  isAuthenticated: false,
};

// action creators
const init = () => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    return {
      type: ActionTypes.Login,
    }
  }

  return {
    type: ActionTypes.Initial,
  };
};

const login = (accessToken: string) => {
  localStorage.setItem("accessToken", accessToken);

  if (accessToken)
    return {
      type: ActionTypes.Login,
    };
};

const logout = () => {
  localStorage.removeItem("accessToken");

  return {
    type: ActionTypes.Logout,
  };
};

// context
const authContext = createContext<ContextValue>({
  state: initialState,
  dispatch: () => undefined,
});

// reducer
const authReducer = (state: State, action: any): State => {
  switch (action?.type) {
    case ActionTypes.Login:
      return {
        isAuthenticated: true,
      };
    case ActionTypes.Logout:
      return initialState;
    case ActionTypes.Initial:
      return initialState;

    default:
      return state;
  }
};

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    dispatch(init())
  }, []);

  return (
    <authContext.Provider value={{ state, dispatch }}>
      {children}
    </authContext.Provider>
  );
};

const useAuthContext = () => useContext(authContext);

export { AuthContextProvider, useAuthContext, login, logout };
