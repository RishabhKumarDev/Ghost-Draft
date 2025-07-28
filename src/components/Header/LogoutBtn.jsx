import authServices from "../../appwrite/auth";
import { logout } from "../../store/features/authSlice";
import { useDispatch } from "react-redux";

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const response = await authServices.logOutUser();
      if (response.success) {
        dispatch(logout());
      } else {
        console.error(response.error.message);
      }
    } catch (error) {
      console.error("logoutbtn :: logoutHnadler ", error);
    }
  };

  return (
    <button
      onClick={logoutHandler}
      className="inline-block px-5 py-2 rounded-full font-bold bg-zinc-800 text-zinc-300 border border-zinc-700 hover:bg-amber-500 hover:text-black transition-all duration-200  hover:shadow-[0_0_12px_rgba(251,191,36,0.3)]"
    >
      LogoutBtn
    </button>
  );
}

export default LogoutBtn;
