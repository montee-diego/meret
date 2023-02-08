import type { ReducerAction } from "@reducers/usePlaylists";

type Dispatch = (arg0: ReducerAction) => void;

export async function onFetch(dispatch: Dispatch): Promise<unknown> {
  return fetch("/api/playlists", {
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

export async function onCreate(name: string, dispatch: Dispatch): Promise<unknown> {
  return fetch("/api/playlists", {
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

export async function onDelete(id: string, dispatch: Dispatch): Promise<unknown> {
  return fetch(`/api/playlists/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .then((data) => dispatch({ type: "onDelete", payload: data }))
    .catch((error) => Promise.reject(error));
}

export async function onRename(id: string, name: string, dispatch: Dispatch): Promise<unknown> {
  return fetch(`/api/playlists/${id}`, {
    method: "PATCH",
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
    .then((data) => dispatch({ type: "onRename", payload: data }))
    .catch((error) => Promise.reject(error));
}

export async function onSub(id: string, dispatch: Dispatch): Promise<unknown> {
  return fetch(`/api/playlists/subscribe/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .then((data) => dispatch({ type: "onSub", payload: data.subs }))
    .catch((error) => Promise.reject(error));
}

export async function onUnsub(id: string, dispatch: Dispatch): Promise<unknown> {
  return fetch(`/api/playlists/subscribe/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .then((data) => dispatch({ type: "onSub", payload: data.subs }))
    .catch((error) => Promise.reject(error));
}
