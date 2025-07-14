import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { mode, type GlobalStyleProps } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
	initialColorMode: "dark",
	useSystemColorMode: true,
};

const theme = extendTheme({
	config,
	styles: {
		global: (props: GlobalStyleProps) => ({
			body: {
				backgroundColor: mode("gray.200", "gray.800")(props),
			},
		}),
	},
});

export default theme;
