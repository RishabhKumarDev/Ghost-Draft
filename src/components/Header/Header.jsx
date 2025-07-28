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
    <header className=" shadow bg-zinc-950">
      <Container>
        <nav className=" flex">
          <div className=" mr-4">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <ul className="flex  ml-auto items-center space-x-2">
            {navItems.map((item) =>
              // active true means either the user is login or not(use this to show relevant links on the navbar);
              item.active ? (
                <li
                  key={item.name}
                  className=" inline-block py-2 px-4 duration-200 hover:bg-amber-400/10 rounded-full"
                >
                  <Link className="text-zinc-300 hover:text-amber-400" to={item.slug}>{item.name}</Link>
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
