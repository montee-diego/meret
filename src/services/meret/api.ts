export class MeretAPI {
  setParams(method: "POST" | "DELETE", body: {}): RequestInit {
    return {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
  }

  processResponse(response: Response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response);
    }
  }

  async get(url: string) {
    return fetch(url)
      .then((response) => this.processResponse(response))
      .then((data) => data)
      .catch((error) => Promise.reject(error));
  }

  async post(url: string, body: {} = {}) {
    return fetch(url, this.setParams("POST", body))
      .then((response) => this.processResponse(response))
      .then((data) => data)
      .catch((error) => Promise.reject(error));
  }

  async delete(url: string, body: {} = {}) {
    return fetch(url, this.setParams("DELETE", body))
      .then((response) => this.processResponse(response))
      .then((data) => data)
      .catch((error) => Promise.reject(error));
  }
}
