import { useContext } from "react";
import { Header } from "../../components";
import { UserContext } from "../../providers/UserContext";
import { TechList } from "../../components/TechList";
import { CreateTechModal } from "../../components/Modals/CreateTechModal";
import { TechContext } from "../../providers/TechContext";
import { EditTechModal } from "../../components/Modals/EditTechModal";

export default () => {

    const { user } = useContext(UserContext);
    const { isHidden, editingTech } = useContext(TechContext);

    return (
        <>
            <Header />
            <main>
                <section className="container lg h_118">
                    <h1 className="title1">Olá, {user?.name} </h1>
                    <p className="headline bold grey1"> {user?.course_module} </p>
                </section>
                <TechList />
                {isHidden ? <CreateTechModal /> : null}
                {editingTech ? <EditTechModal /> : null}
            </main>
        </>

    )
}