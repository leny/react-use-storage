/* leny/react-use-storage
 *
 * /src/index.js - React Hook to handle local and session storage
 *
 * coded by leny@flatLand!
 * started at 03/03/2019
 */

import {useState, useEffect, useCallback} from "react";

const IS_BROWSER =
    typeof window !== "undefined" &&
    typeof navigator !== "undefined" &&
    typeof document !== "undefined";

let evtTarget;

try {
    evtTarget = new EventTarget();
} catch {
    evtTarget = (IS_BROWSER ? document : {})?.createElement?.("phony");
}

// SSR Storage simply returns defaultValue
const useSSRStorage = () => (_, defaultValue) => [defaultValue];

const useStorage = (storage) => (key, defaultValue) => {
    const raw = storage.getItem(key);

    const [value, setValue] = useState(raw ? JSON.parse(raw) : defaultValue);

    const updater = useCallback(
        (updatedValue, remove = false) => {
            setValue(updatedValue);
            storage[remove ? "removeItem" : "setItem"](
                key,
                JSON.stringify(updatedValue),
            );
            evtTarget.dispatchEvent(
                new CustomEvent("storage_change", {detail: {key}}),
            );
        },
        [key],
    );

    defaultValue != null && !raw && updater(defaultValue);

    useEffect(() => {
        const listener = ({detail}) => {
            if (detail.key === key) {
                const lraw = storage.getItem(key);

                lraw !== raw && setValue(JSON.parse(lraw));
            }
        };

        evtTarget.addEventListener("storage_change", listener);
        return () => evtTarget.removeEventListener("storage_change", listener);
    });

    return [value, updater, () => updater(null, true)];
};

export const useLocalStorage = IS_BROWSER
    ? useStorage(localStorage)
    : useSSRStorage();
export const useSessionStorage = IS_BROWSER
    ? useStorage(sessionStorage)
    : useSSRStorage();
