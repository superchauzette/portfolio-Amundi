import { useEffect, useState } from "react";
import { firebase } from "./firebase";

export function useCallGetFn(name, params) {
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function run() {
      try {
        const result = await firebase.functions().httpsCallable(name)(params);
        setData(result?.data);
      } catch (err) {
        setError(err);
      }
    }
    run();
  }, [name, params]);

  return { data, error, setData };
}
