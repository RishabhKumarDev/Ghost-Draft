import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GhostLoader from "../assets/loader/GhostLoader";

export default function Protected({ children, authentication = true }) {
const [loader, setLoder] = useState(true);

const navigate = useNavigate();
const authStatus = useSelector((state) => state.auth.status);

useEffect(() => {
    if (authentication && authStatus !== authentication) {
    navigate("/login");
    } else if (!authentication && authStatus === true) {
    navigate("/");
    }
    setLoder(false);
}, [authStatus, authentication, navigate]);

return loader ? <GhostLoader text="Boo.. wait..."/> : <>{children}</>;
}
