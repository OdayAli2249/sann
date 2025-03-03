// TODO: Use our custom search input
import FormControl from "@mui/material/FormControl";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import { SxProps, styled, useTheme, Theme } from "@mui/material/styles";
// import ColoredSvg from "../ColoredSvg";
// import { icons } from "@/constants/icons";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  height: 56,
  borderRadius: 8,
  backgroundColor: theme.palette.background.paper,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "100%",
  },
}));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.5, 1, 1.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    minWidth: "290px",
    "&::placeholder": {
      opacity: 0.8,
    },
  },
}));

type PropsType = {
  placeholder?: string;
  onChange: (searchTerm: string) => void;
  width?: string | number;
  customIconColor?: string;
  sx?: SxProps<Theme>;
  componentsProps?: {
    container?: SxProps<Theme>;
  };
};

const SearchInput = (props: PropsType) => {
  const theme = useTheme();

  return (
    <Search
      sx={{
        "& .MuiInputBase-root": {
          width: props.width,
          border: `1px solid ${theme.palette.input.outlined.enabledBorder}`,
          borderRadius: 1,
          "&:hover ": {
            borderColor: "#000000",
          },
        },
        ...props.componentsProps?.container,
      }}
    >
      {/* <SearchIconWrapper>
        <ColoredSvg
          color={props?.customIconColor || theme.palette.text.primary}
          width={24}
          src={icons.search}
        />
      </SearchIconWrapper> */}
      <FormControl
        sx={{
          mt: 0.75,
          width: "100%",
          "& .MuiFormLabel-root.MuiInputLabel-root": {
            transform: "translate(14px, 14px) scale(1)",
            backgroundColor: "#fff",
            "&.Mui-focused": {
              transform: "translate(14px, -9px) scale(0.75)",
              color: "text.secondary",
            },
          },
          ...props?.sx,
        }}
      >
        <InputLabel htmlFor="search-input" sx={{ color: "text.secondary" }}>
          Search
        </InputLabel>
        <StyledInputBase
          placeholder={props.placeholder ?? "Name, email, etc..."}
          onChange={(e) => props.onChange(e.target.value)}
        />
      </FormControl>
    </Search>
  );
};

export default SearchInput;
