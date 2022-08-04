import { TiHome, TiFolderDelete } from "react-icons/ti";
import { BsSoundwave } from "react-icons/bs";
import { TbFolderMinus } from "react-icons/tb";
import { RiPlayListLine } from "react-icons/ri";
import {
  BiUser,
  BiHeart,
  BiLineChart,
  BiListPlus,
} from "react-icons/bi";
import { Role } from "@prisma/client";

export const SIDEBAR_MENU = [
  {
    title: "admin",
    name: "admin",
    roles: [Role.ADMIN],
    items: [
      {
        title: "create genre",
        name: "createGenre",
        icon: BiListPlus,
        path: "/admin/genre",
      },
    ],
  },
  {
    title: "menu",
    name: "menu",
    roles: [Role.CLIENT, Role.ADMIN],
    items: [
      {
        name: "dashboard",
        title: "Explore",
        icon: TiHome,
        path: "/app",
      },
      {
        name: "genres",
        title: "Genres",
        icon: BsSoundwave,
        path: "/app/genres",
      },
      {
        name: "albums",
        title: "Albums",
        icon: TiFolderDelete,
        path: "/app/albums",
      },
      {
        name: "artists",
        title: "Artists",
        icon: BiUser,
        path: "/app/artists",
      },
    ],
  },
  {
    title: "library",
    name: "library",
    roles: [Role.CLIENT, Role.ADMIN],
    items: [
      {
        name: "playlists",
        title: "My Playlists",
        icon: RiPlayListLine,
        path: "/app/myplaylists",
      },
      {
        name: "favourites",
        title: "Favourites",
        icon: BiHeart,
        path: "/app/favourites",
      },
      {
        name: "popular",
        title: "Popular",
        icon: BiLineChart,
        path: "/app/popular",
      },
      {
        name: "mymusic",
        title: "My Music",
        icon: TbFolderMinus,
        path: "/app/mymusic",
      },
    ],
  },
];
