import * as React from "react";
import * as Switch from "@radix-ui/react-switch";
import "../App.css";
import { useThemeStore } from "../redux/store";
import { THEMES } from "../constant/index";

const SwitchDemo = () => {
    const { theme, setTheme } = useThemeStore();
    
    const toggleTheme = () => {
        // Cycle through available themes
        const currentIndex = THEMES.findIndex(t => t.name === theme);
        const nextIndex = (currentIndex + 1) % THEMES.length;
        setTheme(THEMES[nextIndex].name);
        console.log('Theme changed to:', THEMES[nextIndex].name);
    }
    
    return <>
	<form>
		<div style={{ display: "flex", alignItems: "center" }}>
			<label
				className="Label"
				htmlFor="theme-switch"
				style={{ paddingRight: 15, color: 'var(--text-color)' }}
			>
				Theme: {theme}
			</label>
			<Switch.Root 
				className="SwitchRoot" 
				id="theme-switch" 
				style={{
                    backgroundColor: 'var(--primary-color)',
                    borderColor: 'var(--secondary-color)'
                }}
				checked={theme !== "light"}
				onCheckedChange={toggleTheme}
			>
				<Switch.Thumb 
					className="SwitchThumb" 
					style={{
                        backgroundColor: 'var(--secondary-color)'
                    }}
				/>
			</Switch.Root>
		</div>
	</form>
    </>
}

export default SwitchDemo;
