export declare module "@mui/material" {
  interface PaletteColor {
    main: string;
    dark: string;
    contrast: string;
    5: string;
    10: string;
    20: string;
    30: string;
    40: string;
    60: string;
    70: string;
    80: string;
    90: string;
    states: {
      hover: string;
      selected: string;
      focusVisible: string;
    };
  }
  interface Color {
    main: string;
    dark: string;
    contrast: string;
    5: string;
    10: string;
    20: string;
    30: string;
    40: string;
    60: string;
    70: string;
    80: string;
    90: string;
    states: {};
  }

  interface TypeBackground {
    navbar: string;
    divider: string;
    paperDivider: string;
    hover: string;
    paperHover: string;
    primaryDivider: string;
    backgroundWhite: string;
    paperTransparent: string;
    paperTransparentLighter: string;
  }

  interface TypeText {
    tertiary: string;
    white: string;
  }

  interface PaletteOptions {
    avatar: {};
    input: {};
    inherit: { white: { main: string } };
  }

  interface Palette {
    status: {
      yellow: string;
      yellowTint: string;
      green: string;
      greenTint: string;
      red: string;
      redTint: string;
      orange: string;
      orangeTint: string;
      grey: string;
      greyTint: string;
      primary: string;
      primaryTint: string;
      secondary: string;
      secondaryTint: string;
      lightGreen: string;
      reef: string;
      chardonnay: string;
      lightOrange: string;
      breasts: string;
    };
    backgroundGradient?: string;
    input: {
      standard: {
        enabledBorder: string;
      };
      filled: {
        enabledFill: string;
      };
      outlined: {
        enabledBorder: string;
      };
    };
    inherit: { white: { main: string } };
  }
}

export declare module "@mui/material/styles" {
  interface TypographyVariants {
    body3: React.CSSProperties;
    "alert-title": React.CSSProperties;
    "avatar-initials": React.CSSProperties;
    "button-large": React.CSSProperties;
    "button-medium": React.CSSProperties;
    "input-label": React.CSSProperties;
    "input-text": React.CSSProperties;
    "chip-label": React.CSSProperties;
    "table-header": React.CSSProperties;
    "date-picker-current-month": React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    body3?: React.CSSProperties;
    "alert-title"?: React.CSSProperties;
    "avatar-initials"?: React.CSSProperties;
    "button-large"?: React.CSSProperties;
    "button-medium"?: React.CSSProperties;
    "input-label"?: React.CSSProperties;
    "input-text"?: React.CSSProperties;
    "chip-label"?: React.CSSProperties;
    "table-header"?: React.CSSProperties;
    "date-picker-current-month"?: React.CSSProperties;
  }
}

// Enable usage of these custom variants in the Typography component
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    body3: true;
    "alert-title": true;
    "avatar-initials": true;
    "button-large": true;
    "button-medium": true;
    "input-label": true;
    "input-text": true;
    "chip-label": true;
    "table-header": true;
    "date-picker-current-month": true;
  }
}
