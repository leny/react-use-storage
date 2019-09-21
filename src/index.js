/* leny/react-use-storage
 *
 * /src/index.js - React Hook to handle local and session storage
 *
 * coded by leny@flatLand!
 * started at 03/03/2019
 */

import {useState, useEffect} from "react";

const evtTarget = new EventTarget();

const useStorage = storage => (key, defaultValue) => {
    const raw = storage.getItem(key);

    const [value, setValue] = useState(raw ? JSON.parse(raw) : defaultValue);

    const updater = (updatedValue, remove = false) => {
        setValue(updatedValue);
        storage[remove ? "removeItem" : "setItem"](
            key,
            JSON.stringify(updatedValue),
        );
        evtTarget.dispatchEvent(
            new CustomEvent("storage_change", {detail: {key}}),
        );
    };

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

    return [
        value,
        updatedValue => updater(updatedValue),
        () => updater(null, true),
    ];
};

export const useLocalStorage = useStorage(localStorage);
export const useSessionStorage = useStorage(sessionStorage);
