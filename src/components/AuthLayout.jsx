import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

return loader ? <h1>Loading...</h1> : <>{children}</>;
}
