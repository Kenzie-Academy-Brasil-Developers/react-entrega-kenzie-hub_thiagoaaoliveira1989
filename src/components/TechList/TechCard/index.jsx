import { MdDeleteOutline, MdEdit } from "react-icons/md"
import styles from "./style.module.scss";
import { useContext } from "react";
import { TechContext } from "../../../providers/TechContext";

export const TechCard = ({ tech }) => {

    const { deleteTech, setEditingTech } = useContext(TechContext);

    return (
        <li className={styles.card}>
            <p className="tech">{tech.title}</p>
            <div className={styles.card_btns}>
                <span className="headline">{tech.status}</span>
                <button onClick={() => setEditingTech(tech)}><MdEdit color="white" size={19} /></button>
                <button onClick={() => deleteTech(tech.id)}><MdDeleteOutline color="white" size={19} /></button>
            </div>
        </li>
    )
}