import { TechCard } from "./TechCard";
import styles from "./style.module.scss";
import { useContext } from "react";
import { TechContext } from "../../providers/TechContext";
import BtnPlus from "../../assets/ButtonPlus.svg"
import { UserContext } from "../../providers/UserContext";
export const TechList = () => {

    const { hiddenModal } = useContext(TechContext);
    const { techList } = useContext(UserContext);

    return (
        <section className="container lg h_full">
            <div className={styles.card_list_container}>
                <div className={styles.card_list_top}>
                    <p className="title2">Tecnologias</p>
                    <button onClick={() => hiddenModal()}> <img src={BtnPlus} /> </button>
                </div>
                <div>
                    {techList ? (
                        <>
                            <ul className={styles.card_list}>
                                {techList.map((tech) => {
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
