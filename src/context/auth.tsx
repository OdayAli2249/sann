import PageLoading from "@/components/PageLoading";
// import useReactQuery from "@/hooks/useReactQuery";
import Cookies from "universal-cookie";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const cookies = new Cookies(null, {
  path: "/",
  sameSite: "none",
  secure: true,
});

interface State {
  // user?: IUser;
  isRoot?: boolean;
  isAuthenticated: boolean;
}

const actionTypes = {
  login: "login",
  logout: "logout",
  fetch: "fetch",
};

interface ContextValue {
  state: State;
  dispatch: React.Dispatch<any>;
}

const initialState: State = {
  // user: undefined,
  isAuthenticated: false,
  isRoot: undefined,
};

// action creators
// const init = (
//   // user: IUser
// ) => {
//   // console.log(user);
//   const accessToken = localStorage.getItem("accessToken");

//   let state = initialState;

//   if (accessToken) {
//     state = {
//       ...initialState,
//       isAuthenticated: true,
//       // user,
//     };
//   }

//   return {
//     type: actionTypes.fetch,
//     payload: state,
//   };
// };

const login = (accessToken: string, refreshToken: string) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  const accessTokenLength = accessToken.length;
  console.log(accessTokenLength);
  cookies.set("sharedToken", accessToken);

  if (accessToken)
    return {
      type: actionTypes.login,
      payload: {
        isAuthenticated: true,
      },
    };
};

const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  cookies.remove("sharedToken");

  return {
    type: actionTypes.logout,
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
    case actionTypes.login:
      return {
        ...state,
        isAuthenticated: true,
      };
    case actionTypes.logout:
      return initialState;
    case actionTypes.fetch:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const sharedToken = cookies.get("sharedToken");

  let accessToken = "";

  if (sharedToken) {
    localStorage.setItem("accessToken", sharedToken);
    accessToken = sharedToken;
  } else {
    accessToken = localStorage.getItem("accessToken") || "";
  }

  // const { error } = useReactQuery<IUser>({
  //   url: userEndpoints.getMine.url,
  //   key: userEndpoints.getMine.queryKey,
  //   headers: { Authorization: `Bearer ${accessToken}` },
  //   enabled: !!accessToken,
  //   onSuccess: (userData) => dispatch(init(userData?.data)),
  //   onError: () => {
  //     setIsLoading(false);
  //   },
  // });

  // useEffect(() => {
  //   if (state.user)
  //     setIsLoading(false);
  // }, [state, error]);

  useEffect(() => {
    if (!accessToken) setIsLoading(false);
  }, []);

  if (isLoading) return <PageLoading />;
  return (
    <authContext.Provider value={{ state, dispatch }}>
      {children}
    </authContext.Provider>
  );
};

const useAuthContext = () => useContext(authContext);

export { AuthContextProvider, useAuthContext, login, logout };
