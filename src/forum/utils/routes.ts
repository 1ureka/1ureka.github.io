type Routes = {
  readonly home: string;

  readonly login: string;
  readonly register: string;
  readonly verify: string;

  readonly post: string;
  readonly posts: string;
  readonly search: string;
  readonly users: string;
};

const dev: Routes = {
  home: "/src/forum/index.html",

  login: "/src/forum/pages/login/index.html",
  register: "/src/forum/pages/register/index.html",
  verify: "/src/forum/pages/verify/index.html",

  post: "/src/forum/pages/post/index.html",
  posts: "/src/forum/pages/posts/index.html",
  search: "/src/forum/pages/search/index.html",
  users: "/src/forum/pages/users/index.html",
};

const prod: Routes = {
  home: "/",

  login: "/login",
  register: "/register",
  verify: "/verify",

  post: "/post",
  posts: "/posts",
  search: "/search",
  users: "/users",
};

export const routes = import.meta.env.PROD ? prod : dev;
