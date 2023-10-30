import { MdAdd } from "react-icons/md";
import { TechCard } from "./TechCard";
import styles from "./style.module.scss";
import { useContext } from "react";
import { TechContext } from "../../providers/TechContext";

export const TechList = () => {

    const { hiddenModal, techList } = useContext(TechContext);
    const techs = techList ? techList.techs : [];
    return (
        <section className="container lg h_full">
            <div className={styles.card_list_container}>
                <div className={styles.card_list_top}>
                    <p className="title2">Tecnologias</p>
                    <button onClick={() => hiddenModal()}><MdAdd color="white" size={16} /></button>
                </div>
                <div>
                    {techs.length > 0 ? (
                        <>
                            <ul className={styles.card_list}>
                                {techList.techs.map((tech) => {
                                    return <TechCard key={tech.id} tech={tech} />
                                })}
                            </ul>
                        </>
                    ) : null}
                </div>
            </div>
        </section>
    )
}
