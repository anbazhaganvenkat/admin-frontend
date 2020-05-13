import teamIcon from "./assets/img/icons/nav-icon-team.svg";
import homeIcon from "./assets/img/icons/icon-home.svg";

/**
 * Get navigation list
 */

export function getNavList() {
  let arrayList = [];

  arrayList = arrayList.concat({
    name: "Dashboard",
    url: "/dashboard",
    icon: homeIcon,
  });

  arrayList = arrayList.concat({
    name: "Users",
    url: "/users",
    addPageurl: "/user/new",
    editPageurl: "/user",
    icon: teamIcon,
  });

  return arrayList;
}
