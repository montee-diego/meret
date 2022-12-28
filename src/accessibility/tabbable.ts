const elements = [
  "a[href]",
  "button:not([disabled])",
  "input",
  "textarea",
  "select",
  "details > summary:first-of-type",
];

export const tabbable = (target: Element): HTMLElement[] => {
  const nodes = target.querySelectorAll(elements.join(",")) as NodeListOf<HTMLElement>;
  let list: HTMLElement[] = [];

  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].getAttribute("tabIndex") === "-1") {
      continue;
    }

    if (nodes[i].closest("details")?.matches("details:not([open])")) {
      if (nodes[i].nodeName !== "SUMMARY") {
        continue;
      }
    }

    list.push(nodes[i]);
  }

  return list;
};
