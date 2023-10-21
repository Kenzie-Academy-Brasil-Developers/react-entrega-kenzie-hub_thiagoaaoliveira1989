import { createContext, useEffect, useState } from "react";
import api from './../services/api';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem("@Token");

        const getProfile = async () => {
            try {
                setLoading(true);
                const { data } = await api.get("/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserProfile(data);

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        getProfile();

    }, []);

    const userLogin = async (payload) => {
        try {
            setLoading(true);
            const { data } = await api.post("/sessions", payload);
            const { token } = data
            localStorage.setItem("@Token", token);
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

    const logout = () => {
        localStorage.removeItem("@Token");
        setUserProfile(null);
        toast.success("Usuario desconectado!", {
            className: "toast-custom-background",
        });
        navigate("/");
    }

    return (
        <UserContext.Provider value={{ setUserProfile, userProfile, userLogin, userRegister, loading, logout }}>
            {children}
        </UserContext.Provider>
    )
}