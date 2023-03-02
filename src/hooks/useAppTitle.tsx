export const useAppTitle = () => {
  function setAppTitle(title: string) {
    if (typeof window !== "undefined") {
      const headerTitle = document.querySelector("#header-title");

      if (headerTitle && headerTitle instanceof HTMLHeadingElement) {
        headerTitle.innerText = title;
      }
    }
  }

  return { setAppTitle };
};
