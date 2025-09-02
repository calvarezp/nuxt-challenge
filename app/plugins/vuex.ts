import { defineNuxtPlugin } from '#app'
import { createStore } from 'vuex'
import type {StoreState} from "~/architecture/domain/types/store-state";
import type {Counter} from "~/architecture/domain/types";

const localStoragePlugin = (store: Store<StoreState>) => {
    if(import.meta.client) {
        const saved = localStorage.getItem('counters');
        if (saved) {
            store.replaceState({
                ...store.state,
                counters: JSON.parse(saved)
            });
        }
        store.subscribe((_mutation: any, state: any) => {
            localStorage.setItem('counters', JSON.stringify(state.counters));
        });
    }
};


export default defineNuxtPlugin((nuxtApp) => {
    const store = createStore({
        state: (): StoreState => ({
            isModalOpen: false,
            counters: []
        }),
        mutations: {
            openModal(state) {
                state.isModalOpen = true
            },
            closeModal(state) {
                state.isModalOpen = false
            },
            addCounter(state, payload) {
                state.counters.push(payload)
            },
            removeCounter(state, id: string) {
                state.counters = state.counters.filter(counter => counter.id !== id);
            },
            sumValue(state, id: string) {
                state.counters = state.counters.map((counter) => {
                    if (counter.id === id) {
                        return {
                            ...counter,
                            value: counter.value + 1
                        }
                    }
                    return counter;
                });
            },
            subtractValue(state, id: string) {
                state.counters = state.counters.map((counter) => {
                    if (counter.id === id && counter.value > 0) {
                        return {
                            ...counter,
                            value: counter.value - 1
                        }
                    }
                    return counter;
                });
            },
        },
        actions: {
            openModal({ commit }) {
                commit('openModal')
            },
            closeModal({ commit }) {
                commit('closeModal')
            },
            addCounter({ commit }, counter: Counter) {
                commit('addCounter', counter)
            },
            removeCounter({ commit }, id: string) {
                commit('removeCounter', id)
            },
            sumValue({ commit }, id: string) {
                commit('sumValue', id)
            },
            subtractValue({ commit }, id: string) {
                commit('subtractValue', id)
            },
        },
        plugins: [localStoragePlugin],
    })

    nuxtApp.vueApp.use(store)
    nuxtApp.provide('store', store)
})