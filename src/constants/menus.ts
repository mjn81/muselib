import { TiHome, TiFolderDelete } from "react-icons/ti";
import { BsSoundwave } from "react-icons/bs";
import { TbFolderMinus } from "react-icons/tb";
import { RiPlayListLine } from "react-icons/ri";
import {
  BiUser,
  BiHeart,
  BiLineChart,
} from "react-icons/bi";

export const SIDEBAR_MENU = [
  {
    title: "Menu",
    name: "menu",
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
    title: "Library",
    name: "library",
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
