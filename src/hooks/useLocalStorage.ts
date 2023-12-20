import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { APP_PREFIX } from "../constants/general";

export const useLocalStorage = <T>(
  storageKey: string,
  fallbackState: T
): [T, Dispatch<SetStateAction<T>>] => {
  if (!storageKey)
    throw new Error(
      `"storageKey" must be a nonempty string, but "${storageKey}" was passed.`
    );

  const storedString = localStorage.getItem(APP_PREFIX + storageKey);
  let parsedObject = null;

  if (storedString !== null) parsedObject = JSON.parse(storedString);

  const [value, setValue] = useState<T>(parsedObject ?? fallbackState);

  useEffect(() => {
    localStorage.setItem(APP_PREFIX + storageKey, JSON.stringify(value));
  }, [value, storageKey]);

  return [value, setValue];
};
