import { RouteObjectRule } from "../types";

const modules = import.meta.globEager("./modules/*.tsx");
const appRoutes: RouteObjectRule[] = [];

Object.keys(modules).forEach((key) => {
  const defaultModule = modules[key].default;
  if (!defaultModule) return;
  const moduleList = Array.isArray(defaultModule)
    ? [...defaultModule]
    : [defaultModule];
  appRoutes.push(...moduleList);
});

export default appRoutes;
