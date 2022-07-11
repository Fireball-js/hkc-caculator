import { defineStore } from "pinia"

export const useStore = defineStore("main", {
    state: () => ({
        navbarActiveIndex: "0"
    }),
    getters: {

    },
    actions: {
        navbarMenuChange (_inx) {
            this.navbarActiveIndex = _inx
        }
    }
})