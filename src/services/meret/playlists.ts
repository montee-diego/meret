import type { ReducerAction } from "@reducers/usePlaylists";

type Dispatch = (arg0: ReducerAction) => void;

// temp

type ReducerActionType2 = "onFetch" | "onSub" | "onUnsub";

type ReducerAction2 = {
  type: ReducerActionType2;
  payload?: any;
};

type Dispatch2 = (arg0: ReducerAction2) => void;

export async function fetchPls(dispatch: Dispatch): Promise<unknown> {
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

export async function createPls(name: string, dispatch: Dispatch): Promise<unknown> {
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

export async function deletePls(id: string, dispatch: Dispatch): Promise<unknown> {
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

export async function renamePls(id: string, name: string, dispatch: Dispatch): Promise<unknown> {
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

export async function subscribePls(id: string, dispatch2: Dispatch2): Promise<unknown> {
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
    .then((data) => dispatch2({ type: "onSub", payload: data.subs }))
    .catch((error) => Promise.reject(error));
}

export async function unsubscribePls(id: string, dispatch2: Dispatch2): Promise<unknown> {
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
    .then((data) => dispatch2({ type: "onSub", payload: data.subs }))
    .catch((error) => Promise.reject(error));
}
