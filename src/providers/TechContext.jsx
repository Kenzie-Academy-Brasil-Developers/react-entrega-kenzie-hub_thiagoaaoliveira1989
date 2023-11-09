import { createContext, useContext, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import { UserContext } from "./UserContext";

export const TechContext = createContext({});

export const TechProvider = ({ children }) => {
    const [isHidden, setIsHidden] = useState(false);
    const [editingTech, setEditingTech] = useState(null);

    const { techList, setTechList } = useContext(UserContext);

    const getToken = () => localStorage.getItem("@TOKEN");

    const hiddenModal = () => {
        setIsHidden(!isHidden);
    };

    const addTech = async (formData) => {
        try {
            const response = await api.post("/users/techs", formData, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            });

            // Atualize o estado techList com a nova tecnologia
            setTechList([...techList, response.data]);

            toast.success("Tech cadastrada com sucesso", {
                className: "toast-custom-background",
            });

            hiddenModal();
        } catch (error) {
            console.log(error);
            if (error.response.data.message === "User Already have this technology created you can only update it") {
                toast.error("Não foi possível criar essa Tech, ela já existe", {
                    className: "toast-custom-background",
                });
            }
        }
    };

    const deleteTech = async (techId) => {
        try {
            await api.delete(`users/techs/${techId}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            });

            // Atualize o estado techList removendo a tecnologia excluída
            setTechList(techList.filter((tech) => tech.id !== techId));

            toast.success("Tech deletada com sucesso!", {
                className: "toast-custom-background",
            });
        } catch (error) {
            toast.error("Algo de errado aconteceu!", {
                className: "toast-custom-background",
            });
        }
    };


    const editTech = async (formData) => {
        try {
            const { id } = editingTech;
            await api.put(`users/techs/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            });

            // Atualize o estado techList com a tecnologia editada
            setTechList(techList.map((tech) => (tech.id === id ? { ...tech, ...formData } : tech)));

            setEditingTech(null);

            toast.success("Tech editada com sucesso!", {
                className: "toast-custom-background",
            });
        } catch (error) {
            toast.error("Algo de errado aconteceu!", {
                className: "toast-custom-background",
            });
        }
    };

    return (
        <TechContext.Provider value={{ editingTech, setEditingTech, editTech, addTech, isHidden, hiddenModal, deleteTech }}>
            {children}
        </TechContext.Provider>
    );
};
