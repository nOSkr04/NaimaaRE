import { useSWRConfig } from "swr";

const useMutate = () => {
  const { mutate } = useSWRConfig();

  return (key: string, ...args: any | undefined) => {
    return mutate(key, ...args);
  };
};

export { useMutate };
