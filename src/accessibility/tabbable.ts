const selectors = [
  "a[href]",
  "button:not([disabled])",
  "input",
  "textarea",
  "select",
  "details > summary:first-of-type",
];

export function getTabbable(target: HTMLDivElement | null): HTMLElement[] {
  if (!target) return [];

  const nodes = target.querySelectorAll(selectors.join(",")) as NodeListOf<HTMLElement>;
  const focusable: HTMLElement[] = [];

  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].tabIndex < 0) {
      continue;
    }

    if (nodes[i].closest("details")?.matches("details:not([open])")) {
      if (nodes[i].nodeName !== "SUMMARY") {
        continue;
      }
    }

    focusable.push(nodes[i]);
  }

  return focusable;
}

export function getIsFocusable(target: HTMLElement): boolean {
  if (target.tabIndex < 0) {
    return false;
  }

  return target.matches(selectors.join(","));
}
