export default defineNuxtRouteMiddleware((to) => {
  const { status, data } = useAuth();
  const user = computed(() => data.value?.user);

  if (!user.value && to.path === "/") {
    navigateTo("/login");
  } else if (user.value && to.path === "/login") {
    navigateTo("/");
  }
});
