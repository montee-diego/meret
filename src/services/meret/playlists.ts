import type { ReducerAction } from "@reducers/usePlaylists";

type Dispatch = (arg0: ReducerAction) => void;

export async function fetchPls(dispatch: Dispatch): Promise<unknown> {
  return fetch("/api/user/playlists", {
    method: "GET",
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .then((data) => dispatch({ type: "onFetch", payload: data }))
    .catch((error) => Promise.reject(error));
}

export async function createPls(name: string, dispatch: Dispatch): Promise<unknown> {
  return fetch("/api/playlist/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .then((data) => dispatch({ type: "onCreate", payload: data }))
    .catch((error) => Promise.reject(error));
}

export async function deletePls(id: string, dispatch: Dispatch): Promise<unknown> {
  return fetch("/api/playlist/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .then((data) => dispatch({ type: "onDelete", payload: data.documentIds[0] }))
    .catch((error) => Promise.reject(error));
}

export async function renamePls(id: string, name: string, dispatch: Dispatch): Promise<unknown> {
  return fetch("/api/playlist/rename", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, name }),
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .then((data) => dispatch({ type: "onRename", payload: data }))
    .catch((error) => Promise.reject(error));
}
