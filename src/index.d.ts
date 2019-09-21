export declare const useLocalStorage: <V>(
    key: string,
    defaultValue: V,
) => [V, (V) => void, (V) => void];

export declare const useSessionStorage: <V>(
    key: string,
    defaultValue: V,
) => [V, (V) => void, (V) => void];
