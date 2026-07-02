const themes = {
    light: {
        bg_main: "bg-taupe-100",
        bg_secondary: "bg-taupe-200",
        bg_grid: "bg-taupe-50",
        btn_default: "bg-taupe-200 hover:bg-taupe-300",
        btn_contrast: "bg-indigo-500 hover:bg-indigo-600",
        btn_danger: "bg-rose-500 hover:bg-rose-600",
        btn_default_selected: "bg-taupe-300",
        text_default: "text-taupe-900",
        text_secondary: "text-taupe-900/80",
        text_dark: "text-taupe-950",
        svg_icon: "#000000",
        svg_icon_transit: "#000000",
        svg_text_transit: "black",
        grid_border: "border-taupe-200",
        seperator: "text-taupe-300",
        cm_hover: "hover:bg-taupe-200",
        download_bg: "#ffffff"
    },
    dark: {
        bg_main: "bg-taupe-800",
        bg_secondary: "bg-taupe-700",
        bg_grid: "bg-taupe-950",
        btn_default: "bg-taupe-700 hover:bg-taupe-600",
        btn_contrast: "bg-indigo-500 hover:bg-indigo-400",
        btn_danger: "bg-rose-500 hover:bg-rose-400",
        btn_default_selected: "bg-taupe-600",
        text_default: "text-taupe-200",
        text_secondary: "text-taupe-200/80",
        text_dark: "text-taupe-950",
        svg_icon: "#ffeeee",
        svg_icon_transit: "#ffffff",
        svg_text_transit: "white",
        grid_border: "border-taupe-900",
        seperator: "text-taupe-700",
        cm_hover: "hover:bg-taupe-700",
        download_bg: "#000000"
    }
}

let darkMode = $state(true);
export const getDarkMode = () => {return darkMode};
export const toggleTheme = () => {
    darkMode = !darkMode;
};

let currentTheme = $derived(darkMode ? themes.dark : themes.light);
export const getCurrentTheme = () => {return currentTheme;}