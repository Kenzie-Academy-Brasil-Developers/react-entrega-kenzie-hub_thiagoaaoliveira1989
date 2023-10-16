import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.svg"
import pageBox from "../../styles/module/pageBox.module.scss";
import { toast } from "react-toastify";

export default ({ setUserProfile }) => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("@Token");
        setUserProfile(null);
        toast.success("Usuario desconectado!", {
            className: "toast-custom-background",
        });
        navigate("/");
    }

    return (
        <header className="container lg h_72">
            <img src={Logo} alt="" />
            <button onClick={logout}  className="btn disabled small text_btn">Sair</button>
        </header>
    )
}