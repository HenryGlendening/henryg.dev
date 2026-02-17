export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

const THEME_QUERY = "(prefers-color-scheme: dark)";

const isTheme = (value: string | null): value is Theme =>
  value === "light" || value === "dark";

const getStoredTheme = (): Theme | null => {
  try {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(storedTheme) ? storedTheme : null;
  } catch {
    return null;
  }
};

const setStoredTheme = (theme: Theme): void => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Ignore write failures when storage is unavailable.
  }
};

export const getSystemTheme = (): Theme =>
  window.matchMedia(THEME_QUERY).matches ? "dark" : "light";

export const getPreferredTheme = (): Theme => getStoredTheme() ?? getSystemTheme();

export const setTheme = (theme: Theme): void => {
  document.documentElement.setAttribute("data-theme", theme);
};

export const getActiveTheme = (): Theme => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  return isTheme(currentTheme) ? currentTheme : getPreferredTheme();
};

const syncButtonState = (button: HTMLButtonElement, theme: Theme): void => {
  button.setAttribute("aria-pressed", String(theme === "dark"));

  const sunIcon = button.querySelector<SVGElement>("[data-icon='sun']");
  const moonIcon = button.querySelector<SVGElement>("[data-icon='moon']");

  sunIcon?.classList.toggle("hidden", theme === "dark");
  moonIcon?.classList.toggle("hidden", theme !== "dark");
};

export const toggleTheme = (): Theme => {
  const nextTheme = getActiveTheme() === "dark" ? "light" : "dark";
  setStoredTheme(nextTheme);
  setTheme(nextTheme);
  return nextTheme;
};

let hasAttachedSystemListener = false;

const attachSystemThemeListener = (): void => {
  if (hasAttachedSystemListener) {
    return;
  }

  hasAttachedSystemListener = true;

  const mediaQuery = window.matchMedia(THEME_QUERY);
  mediaQuery.addEventListener("change", () => {
    if (getStoredTheme()) {
      return;
    }

    const systemTheme = mediaQuery.matches ? "dark" : "light";
    setTheme(systemTheme);

    for (const button of document.querySelectorAll<HTMLButtonElement>(
      "[data-theme-toggle]"
    )) {
      syncButtonState(button, systemTheme);
    }
  });
};

export const initThemeToggle = (selector = "[data-theme-toggle]"): void => {
  const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>(selector));

  if (buttons.length === 0) {
    return;
  }

  attachSystemThemeListener();

  const initialTheme = getPreferredTheme();
  setTheme(initialTheme);

  for (const button of buttons) {
    syncButtonState(button, initialTheme);

    if (button.dataset.themeBound === "true") {
      continue;
    }

    button.dataset.themeBound = "true";
    button.addEventListener("click", () => {
      const nextTheme = toggleTheme();
      for (const currentButton of buttons) {
        syncButtonState(currentButton, nextTheme);
      }
    });
  }
};
