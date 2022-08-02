import { ThemeOverride } from "./App";

declare global {
  namespace ReactNativePaper {
    interface Theme extends ThemeOverride {
      /* @ts-ignore   */
    }
  }
}
