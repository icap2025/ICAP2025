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
    title: "Tracks",
    newTab: false,
    submenu: [
      {
        id: 21,
        title: "A",
        path: "/",
        newTab: false,
      },
      {
        id: 22,
        title: "B",
        path: "/",
        newTab: false,
      },
      {
        id: 23,
        title: "C",
        path: "/",
        newTab: false,
      },

    ]
  },
  {
    id: 3,
    title: "For-Authors",
    path: "/for-authors",
    newTab: false,
  },
  {
    id: 4,
    title: "Registration",
    path: "/registration",
    newTab: false,
  },
  {
    id: 5,
    title: "Schedule",
    path: "/schedule",
    newTab: false,
  },
  {
    id: 6,
    title: "Gallery",
    path: "/gallery",
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
