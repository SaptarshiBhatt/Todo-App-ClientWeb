import CreateTodo from "@/components/CreateTodo";
import Nav from "@/components/Nav";
import TodoCategories from "@/components/TodoCategories";
import { ThemeAtom } from "@/utils/ThemeAtom";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

const index = () => {

  const [theme, setTheme] = useAtom(ThemeAtom);

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  return (
    <>
      <nav>
                <Nav/>
            </nav>
            <div className="lg:w-[58%] w-[90%] flex flex-col items-center mx-auto gap-12">
                <div className="flex md:flex-row flex-col justify-between items-center gap-3 w-full">
                    <CreateTodo/>
                </div>
                <div className="w-full flex flex-col gap-6">
                    <TodoCategories/>
                </div>
            </div>

              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                />
                {/* Same as */}
              <ToastContainer />
    </>
  );
}

export default index;