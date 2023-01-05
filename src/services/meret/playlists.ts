export async function fetchPls(onSuccess: (data: any) => void): Promise<unknown> {
  return fetch("/api/user/playlists", {
    method: "GET",
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .then((data) => onSuccess(data))
    .catch((error) => Promise.reject(error));
}

export async function createPls(name: string, onSuccess: (data: any) => void): Promise<unknown> {
  return fetch("/api/playlist/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name }),
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .then((data) => onSuccess(data))
    .catch((error) => Promise.reject(error));
}

export async function deletePls(id: string, onSuccess: (data: any) => void): Promise<unknown> {
  return fetch("/api/playlist/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id }),
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .then((data) => onSuccess(data.documentIds[0]))
    .catch((error) => Promise.reject(error));
}
