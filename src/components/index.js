// This index file is used to mininmize the syntax while importing components in some other components.
// So, now we only need to write component/index/"file name" rather than component/Footer;

import Footer from "./Footer/Footer.jsx";
import Header from "./Header/Header.jsx";
import Container from "./container/Container.jsx"
import Logo from "./Logo.jsx";
import Logout from "./Header/LogoutBtn.jsx";
import Button from "./Button.jsx";
import Select from "./Select.jsx";
import Input from "./Input.jsx";
import RTE from "./RTE.jsx";
import Signup from "./SignUp.jsx";
import Login from "./LogIn.jsx";
import PostCard from "./PostCard.jsx";
import PostForm from "./post-form/PostForm.jsx";
import AuthLayout from './AuthLayout.jsx';

export {
  Header,
  Footer,
  Container,
  Logo,
  Logout,
  Select,
  Button,
  Input,
  RTE,
  Signup,
  Login,
  PostCard,
  PostForm,
  AuthLayout
};
