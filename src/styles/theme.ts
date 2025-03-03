import { createTheme, responsiveFontSizes } from "@mui/material";

const themeCreator = (type: "light" | "dark") => {
  return createTheme({
    palette: {
      mode: type,
      primary: {
        main: "#3D5FA7",
        dark: "#263A63",
        contrast: "#E5EDFF",
        // Tint
        10: "#EAF0FF",
        20: "#C8D2E8",
        30: "#A5B5D8",
        40: "#607CB7",
        // shades
        60: "#314C86",
        70: "#253964",
        80: "#1B2A4B",
        90: "#182643",
        states: {
          hover: "#3D5FA70D",
          selected: "#3D5FA717",
        },
      },

      secondary: {
        main: "#7CBB6F",
        // Tint
        5: "#E0E8DF",
        10: "#E0EFDC",
        20: "#CBE4C5",
        30: "#B0D6A8",
        40: "#96C88C",
        // shades
        60: "#529044",
        70: "#315629",
        80: "#213A1B",
        90: "#142310",
        states: {
          selected: "#73BE631A",
        },
      },
      divider: "#0000001F",

      text: {
        primary: "#000000",
        secondary: "#00000099",
        disabled: "#00000061",
      },

      action: {
        active: "#0000008F",
        hover: "#0000000A",
        disabledBackground: "#0000001F",
        focus: "#0000001F",
        disabled: "#00000061",
      },

      // status
      error: {
        main: "#D32F2F",
        contrast: "#FFFFFF",
        states: {
          selected: "#D32F2F14",
          focusVisible: "#D32F2F4D",
        },
      },
      warning: {
        main: "#ED6C02",
        states: {
          selected: "#ED6C0214",
        },
      },
      info: {
        main: "#0288D1",
        states: {
          selected: "#0288D114",
        },
      },
      success: {
        main: "#2E7D32",
        light: "#4CAF50",
        states: {
          selected: "#2E7D3214",
        },
      },

      grey: {
        50: "#FAFAFA",
        100: "#F5F5F5",
        200: "#EEEEEE",
        300: "#E0E0E0",
      },

      background: {
        default: "#FFFFFF",
      },

      inherit: {
        white: {
          main: "#FFFFFF"
        },
      },

      avatar: {
        fill: "#BDBDBD",
      },

      input: {
        standard: {
          enabledBorder: "#0000006B",
        },
        filled: {
          enabledFill: "#0000000F",
        },
        outlined: {
          enabledBorder: "#0000003B",
        },
      },
    },

    typography: {
      fontFamily: "Poppins",
      h5: {
        fontSize: 24,
        fontWeight: 600,
      },
      h6: {
        fontSize: 20,
        fontWeight: 500,
        letterSpacing: "0.15px",
      },
      subtitle1: {
        fontSize: 16,
        fontWeight: 500,
        letterSpacing: "0.15px",
      },
      body2: {
        fontSize: 16,
        fontWeight: 400,
        letterSpacing: "0.15px",
      },
      body3: {
        fontSize: 14,
        fontWeight: 400,
        letterSpacing: "0.17px",
      },
      // Under Components in figma file
      "alert-title": {
        fontSize: 16,
        fontWeight: 500,
        letterSpacing: "0.15px",
      },
      "avatar-initials": {
        fontSize: 20,
        fontWeight: 400,
        letterSpacing: "0.14px",
      },
      "button-large": {
        fontSize: 15,
        fontWeight: 500,
        letterSpacing: "0.46px",
      },
      "button-medium": {
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: "0.4px",
      },
      "input-label": {
        fontSize: 12,
        fontWeight: 400,
        letterSpacing: "0.15px",
      },
      "input-text": {
        fontSize: 16,
        fontWeight: 400,
        letterSpacing: "0.15px",
      },
      "chip-label": {
        fontSize: 13,
        fontWeight: 400,
        letterSpacing: "0.16px",
      },
      "table-header": {
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: "0.17px",
      },
      "date-picker-current-month": {
        fontSize: 16,
        fontWeight: 500,
        letterSpacing: "0.15px",
      },
    },

    components: {
      MuiTypography: {
        defaultProps: { variant: "body2" },
        styleOverrides: {
          root: {
            color: "#000000",
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        }
      },
    },
  });
};

export default {
  lightTheme: responsiveFontSizes(themeCreator("light")),
  darkTheme: responsiveFontSizes(themeCreator("dark")),
};
