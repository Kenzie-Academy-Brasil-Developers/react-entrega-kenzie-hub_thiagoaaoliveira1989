import { useContext } from "react";
import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md"
import { TechContext } from "../../../providers/TechContext";
import Input from "../../Form/Input";
import Select from "../../Form/Select";
import styles from "./style.module.scss";

export const CreateTechModal = () => {

    const { addTech, hiddenModal } = useContext(TechContext);


    const {
        register,
        handleSubmit,
        formState: { errors } } = useForm({});



    const submit = (payload) => {
        addTech(payload);
    }


    const options = [
        { value: "Iniciante", label: "Iniciante" },
        { value: "Intermediário", label: "Intermediário" },
        { value: "Avançado", label: "Avançado" },
    ]

    return (
        <div className={styles.containerBox}>

            <div className={styles.boxInfo}>
                <p className="title3 grey0">Cadastrar Tecnologia</p>
                <button onClick={() => hiddenModal()}><MdClose /></button>
            </div>
            <form onSubmit={handleSubmit(submit)} className={styles.formBox}>
                <Input
                    label="Nome"
                    type="text"
                    id="title"
                    placeholder="Digite a tecnologia"
                    {...register("title")}
                    error={errors.title}
                />

                <Select
                    label="Selecionar Status"
                    id="status"
                    {...register("status")}
                    options={options}
                    error={errors.status}
                />
                <button className="btn primary text_btn" type="submit">Cadastrar Tecnologia</button>
            </form>
        </div>
    )
}