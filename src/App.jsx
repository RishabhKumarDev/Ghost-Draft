import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authServices from "./appwrite/auth";
import { login, logout } from "./store/features/authSlice";
import { Header, Footer } from "./components/index";
import "./App.css";
import { Outlet } from "react-router-dom";
import GhostLoader from "./assets/loader/GhostLoader";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadData() {
      try {
        const userData = await authServices.getUser();
        if (userData.success) {
          dispatch(login(userData.data));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.log("Load Data ", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <>
        <div > <GhostLoader/></div>
      </>
    );
  }

  return (
    <div className=" w-screen h-screen bg-zinc-900 flex flex-wrap content-between text-white ">
      <div className=" w-full block">
        <Header />
        <main className="flex-grow bg-zinc-900">
          <Outlet/>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
