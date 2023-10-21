import { Link, useNavigate } from "react-router-dom";
import { LoginForm } from "../../components/Form"
import { useEffect } from "react";
import Logo from "../../assets/Logo.svg";
import pageBox from "../../styles/module/pageBox.module.scss";

export default () => {


    return (
        <main className={pageBox.pageBox}>
                <div className="container sm">
                <img src={Logo} alt="Logo site" />
            <div className="box">
                    <h1 className="title1">Login</h1>
                    <LoginForm />
                    <div className="btnForm">
                        <p className="headline bold grey1">Ainda não possui uma conta?</p>
                        <Link to="/register">
                            <button className="btn disabled text_btn">Cadastre-se</button>
                        </Link>
                    </div>
                </div>

            </div>
        </main>
    )
}