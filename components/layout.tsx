import { FC, ReactNode } from "react";
import Header from "./header";

type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = ({ children }) => (
  <>
    <Header />
    <div className="container m-auto px-2 mb-12">{children}</div>
  </>
);

export default Layout;
