// This index file is used to mininmize the syntax while importing components in some other components.
// So, now we only need to write component/index/"file name" rather than component/Footer;

import Footer from "./Footer/Footer.jsx";
import Header from "./Header/Header.jsx";
import Container from "./container/container.jsx";
import Logo from "./Logo.jsx";
import Logout from "./Header/LogoutBtn.jsx";

export { Header, Footer, Container, Logo, Logout };
