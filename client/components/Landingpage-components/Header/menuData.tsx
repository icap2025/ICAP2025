import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "Conference Scope",
    path: "/scope",
    newTab: false,
  },
  {
    id: 3,
    title: "Authors Guidelines",
    newTab: false,
    submenu: [
      {
        id: 21,
        title: "Submission Guidelines",
        path: "/submission",
        newTab: false,
      }
    ]
  },
  {
    id: 4,
    title: "Registration",
    newTab: false,
    submenu: [
      {
        id: 21,
        title: "Registration Fees",
        path: "/registration-fees",
        newTab: false,
      }
    ]
  },
  {
    id: 5,
    title: "Schedule",
    path: "/schedule",
    newTab: false,
  },
  {
    id: 6,
    title: "Committee",
    path: "/committee",
    newTab: false,
  },
  {
    id: 6,
    title: "About",
    path: "/about",
    newTab: false,
  },
  {
    id: 6,
    title: "Contact",
    path: "/contact",
    newTab: false,
  }
];
export default menuData;
