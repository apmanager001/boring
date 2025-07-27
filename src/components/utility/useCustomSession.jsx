import { useEffect } from "react";
import useStore from "../../app/store/store";

const useCustomSession = () => {
  const { user, loading, error, validateSession } = useStore();

  useEffect(() => {
    if (!user && !loading) {
      validateSession();
    }
  }, [user, loading, validateSession]);

  const status = loading
    ? "loading"
    : user
    ? "authenticated"
    : "unauthenticated";

  return {
    data: { user },
    status,
    error,
  };
};

export default useCustomSession;
