import axios from "axios";
import { create } from "zustand";
let url = "http://localhost:2000/data";

export const useTodo = create((set, get) => ({
    data: [],
    getUsers: async() => {
        try {
            let {data} = await axios.get(url);
            set({data:data});
        } catch (error) {
            console.error(error);
        }
    },
    deleteUser: async (id) => {
        try {
            await axios.delete(`${url}/${id}`);
            get().getUsers();
        } catch (error) {
            console.error(error);
        }
    },
    putUser: async (obj, id) => {
        try {
            await axios.put(`${url}/${id}`, obj);
            get().getUsers();
        } catch (error) {
            console.error(error);
        }
    },
    name: "",
    setName: (value) => set({name: value}),
    postUser: async (obj) => {
        try {
            await axios.post(url, obj);
            get().setName("");
            get().getUsers();
        } catch (error) {
            console.error(error);
        }
    },
    isEdit: false,
    setIsEdit: (value) => set({isEdit: value}),
    idx: null,
    setIdx: (value) => set({idx: value}),

}))