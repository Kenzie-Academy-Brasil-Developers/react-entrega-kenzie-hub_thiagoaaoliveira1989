import { Link, useNavigate } from "react-router-dom";
import { RegisterForm } from "../../components/Form"
import { useEffect } from "react";
import pageBox from "../../styles/module/pageBox.module.scss";
import Logo from "../../assets/Logo.svg";

export default () => {

    return (

        <main className={pageBox.pageBox}>
            <div className="container sm">
                <div className="infoRegisterMenu" >
                    <img src={Logo} />
                    <Link to="/">
                        <button className="btn disabled small">Voltar</button>
                    </Link>
                </div>
                <div className="box">
                    <h1 className="title1">Crie a sua Conta</h1>
                    <p className="headline grey1 mt-22">Rapido e grátis, vamos nessa</p>
                    <RegisterForm />
                </div>
            </div>
        </main>
    )
}