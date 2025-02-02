import { Suspense } from "react";
import { Header } from "./Header/Header";

export const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Suspense fallback={"loading..."}>
        <main>{children}</main>
      </Suspense>
    </>
  );
};
