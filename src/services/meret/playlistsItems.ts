export async function onAddItem(playlist: string, track: string): Promise<unknown> {
  return fetch(`/api/playlists/edit/${playlist}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ track }),
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

export async function onDeleteItem(playlist: string, key: string): Promise<unknown> {
  return fetch(`/api/playlists/edit/${playlist}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ key }),
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
