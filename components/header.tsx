import Link from "next/link";
import { FC } from "react";
import PeaIcon from "./peaIcon";

const Header: FC = () => (
  <nav className="w-screen p-3 mb-6">
    {/* left */}
    <Link href="/">
      <a className="w-12 absolute left-3 text-2xl">
        <PeaIcon></PeaIcon>
      </a>
    </Link>
    {/* right */}
    <div>
      <Link href="/create">
        <a className="absolute right-3 text-2xl">New</a>
      </Link>
    </div>
    {/* center */}
    <div className="text-center text-4xl font-medium">
      <Link href="/">
        <a>
          <span>Reci</span>
          <span className="font-light">peas</span>
        </a>
      </Link>
    </div>
  </nav>
);

export default Header;
