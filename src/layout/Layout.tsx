import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col ">
      {/* HEADER */}
      <div className="fixed left-0 top-0 z-50 w-full">
        <Header />
      </div>

      {/* MAIN */}
      <main
        className="
          flex-1
          pt-[54px]
        "
      >
        <Outlet />
      </main>

      {/* FOOTER */}
      <div className=" bottom-0 left-0 z-50 w-full">
        <Footer />
      </div>
    </div>
  );
}
