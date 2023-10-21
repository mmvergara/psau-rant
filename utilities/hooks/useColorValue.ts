import { useMainTheme } from "@/theme/ThemeContextProvider";

const useColorValue = (light: string, dark: string) => {
  const { mode } = useMainTheme();
  return mode === "light" ? light : dark;
};

export default useColorValue;
