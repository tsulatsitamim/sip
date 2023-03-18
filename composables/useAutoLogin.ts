import { User } from ".prisma/client";
import decode from "jwt-decode";

export const useAutoLogin = () => {
  const user = useUser();
  if (user.value) {
    return;
  }

  const token = localStorage.getItem("token");
  if (!token) {
    return;
  }

  try {
    const decoded = decode(token) as User & { exp: number };
    if (Date.now() / 1000 > decoded.exp) {
      return;
    }
    user.value = decoded;
  } catch (error) {
    console.log(error);
  }
};
