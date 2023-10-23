import Logo from "../../assets/Logo.svg"
import { useContext } from "react";
import { UserContext } from "../../providers/UserContext";

export default () => {
    const { userLogout } = useContext(UserContext);


    return (
        <header className="container lg h_72">
            <img src={Logo} alt="" />
            <button onClick={userLogout} className="btn disabled small text_btn">Sair</button>
        </header>
    )
}