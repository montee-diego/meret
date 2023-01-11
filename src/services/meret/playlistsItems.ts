export async function addItemTo(playlist: string, track: string): Promise<unknown> {
  return fetch("/api/playlist/edit/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ playlist, track }),
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .then((data) => data)
    .catch((error) => Promise.reject(error));
}
