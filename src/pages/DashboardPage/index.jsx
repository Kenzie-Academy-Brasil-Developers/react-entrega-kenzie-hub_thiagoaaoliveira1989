import { useContext, useEffect, useState } from "react";
import { Header } from "../../components";
import api from "../../services/api";
import { UserContext } from "../../providers/UserContext";

export default () => {

    const { userProfile, loading } = useContext(UserContext);

    return (
        <>
            {loading ? <div>...caregando </div> : <>
                <Header />
                <section className="container lg h_118" >
                    <h1 className="title1">Olá, {userProfile.name} </h1>
                    <p className="headline bold grey1"> {userProfile.course_module}</p>
                </section>
                <main className="container lg h_full">
                    <div>
                        <div>
                            <h1 className="title1 tp_37">Que pena! Estamos em desenvolvimento :(</h1>
                            <p className="paragraph one">Nossa aplicação está em desenvolvimento, em breve teremos novidades</p>
                        </div>

                    </div>
                </main>
            </>
            }

        </>
    )
}