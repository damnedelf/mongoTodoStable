

class StoreTodos {
  constructor() { }

  static post(name: string, callback: Function) {
    fetch("/todo/post", { method: "POST", body: name })
      .then((response) => response.json())
      .then((result) => {
        callback(result);
      })

      .catch((error) => alert(`post error : ${error}`));
  }

  static async getAll(callback: Function) {
   await fetch("/todo/getall", { method: "GET" })
      .then((response) => response.text())
      .then((result) => {
        callback(JSON.parse(result));
      })
      .catch((error) => alert(`get array from db ${error}`));
  }

  static delete(id: string) {
    fetch('/todo/delete', { method: "DELETE", body: id })
      .catch((error) => alert(`error delete  ${error}`));
  }
  static update(id: string) {
    fetch('/todo/patch', { method: "PATCH", body: id })
      .catch((error) => alert(`error update ${error}`));
  }
  //i see dat error. cannot imagine how to fix dat
  static updateAll(status: boolean) {
    fetch(`/todo/put`, { method: "PUT", body: !status })
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => alert(`error updated all  ${error}`));
  }
}

class StoreFilterStatus {
  constructor() { }
  static setFilterStatus(status: string): void {
    localStorage.setItem("status", status);
  }
  static getFilterStatus(): string | undefined | null {
    if (localStorage.getItem("status")) {
      return localStorage.getItem("status");
    } else {
      return "noFilter";
    }
  }
}
