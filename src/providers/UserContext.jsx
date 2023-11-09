import { createContext, useContext, useEffect, useState } from "react";
import api from './../services/api';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [techList, setTechList] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem("@TOKEN")

    useEffect(() => {
        const getuser = async () => {
            if (!token) {
                setUser(null);
                return;
            }

            try {
                const { data } = await api.get("/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(data);
                setTechList(data.techs);
            } catch (error) {
                console.log(error);
                alert("Algo de inesperado aconteceu!");
            }
        }

        getuser();

        return () => {
            // Função de retorno do useEffect para limpar o usuário quando o componente for desmontado
            setUser(null);
        }
    }, [token]);





    const userLogin = async (payload) => {
        try {
            setLoading(true);
            const { data } = await api.post("/sessions", payload);

            localStorage.setItem("@TOKEN", data.token);
            setUser(data.user);

            toast.success("Login realizado com sucesso!", {
                className: "toast-custom-background",
            })
            navigate("/dashboard");

        } catch (error) {
            toast.error("Email ou Senha incorretos", {
                className: "toast-custom-background",
            });
        } finally {
            setLoading(false);

        }
    }

    const userRegister = async (payload) => {
        console.log(payload);
        try {
            setLoading(true);
            await api.post("/users", payload);
            toast.success("Conta criada com sucesso!", {
                className: "toast-custom-background",
            })
            navigate("/")

        } catch (error) {
            if (error.response.data.message === "Email already exists") {
                toast.error("Ops! Email já existe", {
                    className: "toast-custom-background",
                })
            } else {
                toast.error("Ops! Algo deu errado", {
                    className: "toast-custom-background",
                })
            }
        } finally {
            setLoading(false);

        }
    }

    const userLogout = () => {
        localStorage.removeItem("@TOKEN");
        setUser(null);
        toast.warn("Deslogando...", {
            className: "toast-custom-background",
        });
        navigate("/");
    }



    return (
        <UserContext.Provider value={{ user, setTechList, techList, userLogin, userRegister, loading, userLogout }}>
            {children}
        </UserContext.Provider>
    )
}