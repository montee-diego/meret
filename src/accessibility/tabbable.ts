const elements = [
  "a[href]",
  "button:not([disabled])",
  "input",
  "textarea",
  "select",
  "details > summary:first-of-type",
];

export function tabbable(target: HTMLDivElement | null): HTMLElement[] {
  if (!target) return [];

  const nodes = target.querySelectorAll(elements.join(",")) as NodeListOf<HTMLElement>;
  const focusable: HTMLElement[] = [];

  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].getAttribute("tabIndex") === "-1") {
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
