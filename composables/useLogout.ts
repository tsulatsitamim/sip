export const useLogout = () => {
  useUser().value = null;
  localStorage.removeItem("token");
  useRouter().push("/");
};
