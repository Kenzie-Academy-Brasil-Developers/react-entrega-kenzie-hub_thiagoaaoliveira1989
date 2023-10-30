import { createContext, useContext, useEffect, useState } from "react";
import api from './../services/api';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { TechContext } from "./TechContext";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem("@TOKEN")


    const loadUser = async () => {
        try {
            const { data } = await api.get("/profile", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUser(data);
        } catch (error) {
            console.log(error);
            alert("Algo de inesperado aconteceu!");
        }

    }

    useEffect(() => {
        loadUser();
    }, []);


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
        setUser(null);
        navigate("/");
        localStorage.removeItem("@TOKEN");
        toast.warn("Deslogando...", {
            className: "toast-custom-background",
        })
    }

    return (
        <UserContext.Provider value={{ user, userLogin, userRegister, loading, userLogout }}>
            {children}
        </UserContext.Provider>
    )
}