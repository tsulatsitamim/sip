export default defineNuxtRouteMiddleware((ctx) => {
  if (process.server) return;

  useAutoLogin();

  const user = useUser();

  if (ctx.path === "/login") {
    if (user.value) {
      return navigateTo("/");
    }
  } else {
    if (!user.value) {
      return navigateTo("/login");
    }
  }
});
