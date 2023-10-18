import { useState, useEffect, useRef } from "react";
import { auth } from "../firebase.config";
import { onAuthStateChanged } from "firebase/auth";

export const useUser = () => {
  const [userInfo, setUserInfo] = useState(() => {
    const user = auth.currentUser;
    const isLoading = !user;
    return { user, isLoading };
  });
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        setUserInfo({ user, isLoading: false });
      });
    }
    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);

  return userInfo;
};
