/* leny/react-use-storage
 *
 * /src/index.js - React Hook to handle local and session storage
 *
 * coded by leny@flatLand!
 * started at 03/03/2019
 */

import {useState, useEffect} from "react";
import serialize from "serialize-javascript";

const evtTarget = new EventTarget();

const deserialize = serializedJavascript => eval(`(${serializedJavascript})`); // eslint-disable-line

const useStorage = storage => (key, defaultValue) => {
    const raw = storage.getItem(key);

    const [value, setValue] = useState(raw ? deserialize(raw) : defaultValue);

    const updater = updatedValue => {
        setValue(updatedValue);
        storage.setItem(key, serialize(updatedValue));
        evtTarget.dispatchEvent(
            new CustomEvent("storage_change", {detail: {key}}),
        );
    };

    defaultValue != null && !raw && updater(defaultValue);

    useEffect(() => {
        const listener = ({detail}) => {
            if (detail.key === key) {
                const lraw = storage.getItem(key);

                lraw !== raw && setValue(deserialize(lraw));
            }
        };

        evtTarget.addEventListener("storage_change", listener);
        return () => evtTarget.removeEventListener("storage_change", listener);
    });

    return [value, updater];
};

export const useLocalStorage = useStorage(localStorage);
export const useSessionStorage = useStorage(sessionStorage);
