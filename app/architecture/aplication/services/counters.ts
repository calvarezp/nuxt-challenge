import type {Counter} from "~/architecture/domain/types";

type OrderType = 'name-asc' | 'name-desc' | 'value-asc' | 'value-desc';

export function orderCounters(counters: Counter[], orderType: OrderType) {
    switch (orderType) {
        case 'name-asc':
            return [...counters].sort((a, b) => a.name.localeCompare(b.name));
        case 'name-desc':
            return [...counters].sort((a, b) => b.name.localeCompare(a.name));
        case 'value-asc':
            return [...counters].sort((a, b) => a.value - b.value);
        case 'value-desc':
            return [...counters].sort((a, b) => b.value - a.value);
        default:
            return counters;
    }
}