"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class StoreTodos {
    constructor() { }
    static post(name, callback) {
        fetch("/todo/post", { method: "POST", body: name })
            .then((response) => response.json())
            .then((result) => {
            callback(result);
        })
            .catch((error) => alert(`post error : ${error}`));
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield fetch("/todo/getall", { method: "GET" });
                let todoArray = yield response.json();
                return todoArray;
            }
            catch (error) {
                console.log(`get all error ${error}`);
            }
        });
    }
    static delete(id) {
        fetch("/todo/delete", { method: "DELETE", body: id }).catch((error) => alert(`error delete  ${error}`));
    }
    static update(id) {
        fetch("/todo/patch", { method: "PATCH", body: id }).catch((error) => alert(`error update ${error}`));
    }
    static updateAll(status) {
        fetch(`/todo/put`, { method: "PUT", body: "" + !status })
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => alert(`error updated all  ${error}`));
    }
}
class StoreFilterStatus {
    constructor() { }
    static setFilterStatus(status) {
        localStorage.setItem("status", status);
    }
    static getFilterStatus() {
        if (localStorage.getItem("status")) {
            return localStorage.getItem("status");
        }
        else {
            return "noFilter";
        }
    }
}
