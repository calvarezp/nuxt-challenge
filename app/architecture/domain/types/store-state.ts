import type { Counter } from "~/architecture/domain/types";

export type StoreState = {
    isModalOpen: boolean
    counters: Counter[]
}
