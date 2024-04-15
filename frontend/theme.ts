import { extendTheme } from "@chakra-ui/react";
import "@fontsource-variable/inter";

const theme = extendTheme({
  fonts: {
    heading: `'Inter Variable', sans-serif`,
    body: `'Inter Variable', sans-serif`,
  },
});

export default theme;
