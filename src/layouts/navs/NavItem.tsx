import Link from "next/link";
import { IconType } from "react-icons";

type Props = {
  item: {
    title: string;
    name: string;
    items: {
      name: string;
      title: string;
      icon: IconType;
      path: string;
    }[];
  },
  pathname: string
};
const NavItem = ({item, pathname}: Props) => {
  return (
    <div>
      <section className="mb-7">
        <h5 className="font-bold text-sm mb-4">
          {item.title}
        </h5>
        <ul>
          {item?.items.map((item) => (
            <li
              className={
                (item.path === pathname
                  ? "text-white"
                  : "text-gray-500") +
                " flex items-center justify-left py-2 hover:text-white transition-all"
              }
              key={`side_${item.name}`}
            >
              <item.icon />
              <Link href={item.path}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default NavItem;
