import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import { UserContext } from "./UserContext";

export const TechContext = createContext({});

export const TechProvider = ({ children }) => {
    const [isHidden, setIsHidden] = useState(false);
    const [editingTech, setEditingTech] = useState(null);

    const { loadUser } = useContext(UserContext);

    const hiddenModal = () => {
        setIsHidden(!isHidden);
    }


    const addTech = async (formData) => {
        const token = localStorage.getItem("@TOKEN");
        try {
            await api.post("/users/techs", formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            loadUser();

            toast.success("Tech cadastrada com sucesso", {
                className: "toast-custom-background",
            });

            hiddenModal();

        } catch (error) {
            console.log(error);
            if (error.response.data.message === "User Already have this technology created you can only update it") {
                toast.error("Não foi possivel criar essa Tech, ela já existe", {
                    className: "toast-custom-background",
                })
            }
        }
    }

    const deleteTech = async (techId) => {
        const token = localStorage.getItem("@TOKEN");

        try {
            await api.delete(`users/techs/${techId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            loadUser();

            toast.success("Tech deletada com sucesso!", {
                className: "toast-custom-background",
            })
        } catch (error) {
            toast.error("Algo de errado aconteceu!", {
                className: "toast-custom-background",
            })
        }
    }

    const editTech = async (formData) => {
        const token = localStorage.getItem("@TOKEN");

        try {
            await api.put(`users/techs/${editingTech.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            loadUser();

            setEditingTech(null);

            toast.success("Tech editada com sucesso!", {
                className: "toast-custom-background",
            })

        } catch (error) {
            toast.error("Algo de errado aconteceu!", {
                className: "toast-custom-background",
            })
        }
    }

    return (
        <TechContext.Provider value={{ editingTech, setEditingTech, editTech, addTech, isHidden, hiddenModal, deleteTech }}>
            {children}
        </TechContext.Provider>
    )
}