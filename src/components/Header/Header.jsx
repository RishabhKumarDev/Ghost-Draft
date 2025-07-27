import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Logo, Logout } from "../index";

function Header() {
  const authStatus = useSelector((state) => state.auth.status); // this value is being used to show the the items on the navbar

  // all the items that will appear on the navbar,
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "SignUp",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className=" py-3 shadow bg-gray-500">
      <Container>
        <nav className=" flex">
          <div className=" mr-4">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <ul className="flex  ml-auto">
            {navItems.map((item) =>
              // active true means either the user is login or not(use this to show relevant links on the navbar);
              item.active ? (
                <li
                  key={item.name}
                  className=" inline-block py-6 px-6 duration-200 hover:bg-blue-100 rounded-full"
                >
                  <Link to={item.slug}>{item.name}</Link>
                </li>
              ) : null
            )}

            {/* if user is loged in show him the logout btn */}
            {authStatus && (
              <li>
                <Logout />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
