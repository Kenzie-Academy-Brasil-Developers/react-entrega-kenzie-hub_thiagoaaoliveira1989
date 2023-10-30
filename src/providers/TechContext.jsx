import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import { UserContext } from "./UserContext";

export const TechContext = createContext({});

export const TechProvider = ({ children }) => {
    const [isHidden, setIsHidden] = useState(false);
    const [techList, setTechList] = useState(null);
    const [editingTech, setEditingTech] = useState(null);
    const { user } = useContext(UserContext);


    useEffect(() => {
        setTechList(user);
    }, [user]);


    const hiddenModal = () => {
        setIsHidden(!isHidden);
    }

    const loadUser = async () => {
        try {
            const token = localStorage.getItem("@TOKEN");
            const { data } = await api.get("/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    const addTech = async (formData) => {
        const token = localStorage.getItem("@TOKEN");
        try {
            const { data } = await api.post("/users/techs", formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const updatedUser = await loadUser();
            if (updatedUser) {
                setTechList(updatedUser);
            }

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

        } finally {

        }
    }

    const deleteTech = async (techId) => {
        const token = localStorage.getItem("@TOKEN");

        try {
            const { data } = await api.delete(`users/techs/${techId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const updatedUser = await loadUser();
            if (updatedUser) {
                setTechList(updatedUser);
            }

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
            const { data } = await api.put(`users/techs/${editingTech.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const updatedUser = await loadUser();
            if (updatedUser) {
                setTechList(updatedUser);
            }

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
        <TechContext.Provider value={{ editingTech, setEditingTech, editTech, setTechList, addTech, isHidden, hiddenModal, techList, deleteTech }}>
            {children}
        </TechContext.Provider>
    )
}