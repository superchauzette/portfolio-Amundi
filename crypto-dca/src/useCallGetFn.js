import { useEffect, useState } from "react";
import { firebase } from "./firebase";

export function useCallGetFn(name, params) {
  const [data, setData] = useState();
  useEffect(() => {
    async function run() {
      const result = await firebase.functions().httpsCallable(name)(params);
      setData(result?.data);
    }
    run();
  }, [name, params]);

  return { data, setData };
}
