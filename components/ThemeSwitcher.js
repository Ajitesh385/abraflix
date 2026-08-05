"use client";

import { useState, useEffect, useRef } from "react";

const THEMES = [
  { id: "soft-green", name: "Soft Green", color: "#a5d6a7" },
  { id: "soft-pink", name: "Soft Pink", color: "#f48fb1" },
  { id: "soft-blue", name: "Soft Blue", color: "#90caf9" },
  { id: "soft-lavender", name: "Soft Lavender", color: "#b39ddb" },
];

export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("soft-green");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("abraflix-theme") || "soft-green";
    setCurrent(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function selectTheme(themeId) {
    setCurrent(themeId);
    document.documentElement.setAttribute("data-theme", themeId);
    localStorage.setItem("abraflix-theme", themeId);
    setOpen(false);
  }

  return (
    <div className="theme-switcher" ref={dropdownRef}>
      <button
        className="theme-toggle-btn"
        onClick={() => setOpen(!open)}
        aria-label="Change theme"
        title="Change theme"
        id="theme-toggle"
      >
        🎨
      </button>

      {open && (
        <div className="theme-dropdown" id="theme-dropdown">
          {THEMES.map((theme) => (
            <button
              key={theme.id}
              className={`theme-option ${current === theme.id ? "active" : ""}`}
              onClick={() => selectTheme(theme.id)}
              id={`theme-${theme.id}`}
            >
              <span
                className="theme-swatch"
                style={{ background: theme.color }}
              />
              {theme.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
