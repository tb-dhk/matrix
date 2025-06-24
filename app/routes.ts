import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./home.tsx"),
  route("blog/*", "./blog.tsx"),
  route("dir/*", "./dir.tsx"),
  route("tags/*", "./tags.tsx"),
  route("search/*", "./search.tsx")
] satisfies RouteConfig;
