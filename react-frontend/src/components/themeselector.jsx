import { PaletteIcon } from "lucide-react";
import { useThemeStore } from "../redux/store";
import { THEMES } from "../constant/index";

const ThemeSelector = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="dropdown">
      {/* DROPDOWN TOGGLE BUTTON */}
      <button
        className="btn btn-outline-secondary rounded-circle p-2 dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <PaletteIcon size={18} strokeWidth={1.25} />
      </button>

      {/* DROPDOWN MENU */}
      <div
        className="dropdown-menu dropdown-menu-end p-2 shadow border rounded-3"
        style={{
          width: "14rem", // ~w-56
          maxHeight: "20rem", // ~max-h-80
          overflowY: "auto",
          overflowX:'hidden',
          backdropFilter: "blur(8px)",
          backgroundColor: "#f8f9fa",
          scrollbarWidth: 'thin',
  scrollbarColor: '#e0e0e9 #ffffff' // Bootstrap light background
        }}
      >
        {THEMES.map((themeOption) => (
          <button
            key={themeOption.name}
            className={`dropdown-item d-flex align-items-center gap-2 px-3 py-2 rounded ${
              theme === themeOption.name
                ? "bg-primary-subtle text-primary-emphasis"
                : "hover-bg"
            }`}
            onClick={() => setTheme(themeOption.name)}
          >
            <PaletteIcon size={16} strokeWidth={1.25} />

            <span className="small fw-medium">{themeOption.label}</span>

            {/* THEME PREVIEW COLORS */}
            <div className="ms-auto d-flex gap-1">
              {themeOption.colors.map((color, i) => (
                <span
                  key={i}
                  className="rounded-circle"
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: color,
                  }}
                />
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
