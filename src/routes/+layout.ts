import { redirect } from "@sveltejs/kit";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = ({ url }) => {
  const { pathname } = url;

  if (pathname === "/") {
    throw redirect(302, "/en");
  }

  return {};
};
