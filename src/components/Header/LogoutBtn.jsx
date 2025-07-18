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
      className=" inline-block py-6 px-6 duration-200 hover:bg-blue-100 rounded-full"
    >
      LogoutBtn
    </button>
  );
}

export default LogoutBtn;
