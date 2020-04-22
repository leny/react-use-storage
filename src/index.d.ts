export type StorageHook<V> = [V, (value: V) => void, () => void];

export declare const useLocalStorage: <V>(
    key: string,
    defaultValue?: V,
) => StorageHook<V>;

export declare const useSessionStorage: <V>(
    key: string,
    defaultValue?: V,
) => StorageHook<V>;