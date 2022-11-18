export const queryAll = () => {
  return `
    *[_type == "song"] {
      ...,
      "audio": audio.asset->url,
      "cover": cover.asset->url
    }
  `;
};
