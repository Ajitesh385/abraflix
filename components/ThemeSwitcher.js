"use client";

import { useState, useEffect, useRef } from "react";

const THEMES = [
  { id: "dark", name: "Dark", color: "#000000", border: "#ffffff" },
  { id: "light", name: "Light", color: "#ffffff", border: "#000000" },
  { id: "ocean", name: "Ocean", color: "#18a9c7", border: "#ffffff" },
  { id: "forest", name: "Forest", color: "#37a866", border: "#ffffff" },
  { id: "plum", name: "Plum", color: "#a568c7", border: "#ffffff" },
  { id: "rose", name: "Rose", color: "#dd5d74", border: "#ffffff" },
];

export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("dark");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("abraflix-theme");
    const saved = THEMES.some((theme) => theme.id === savedTheme)
      ? savedTheme
      : "dark";
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
        onClick={() => setOpen((isOpen) => !isOpen)}
        aria-label="Change color theme"
        aria-expanded={open}
        aria-controls="theme-dropdown"
        title="Change color theme"
        id="theme-toggle"
      >
        {current === "dark" ? "☾" : "☀"}
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
                style={{
                  backgroundColor: theme.color,
                  borderColor: theme.border,
                }}
                aria-hidden="true"
              />
              {theme.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
