import { theme } from "@chakra-ui/react";

export const newTheme = {
  ...theme,
  shadows: { ...theme.shadows, outline: "0 !important" },
};
