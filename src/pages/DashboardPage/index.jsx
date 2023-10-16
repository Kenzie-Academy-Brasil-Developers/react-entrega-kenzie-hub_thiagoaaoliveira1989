import { useEffect, useState } from "react";
import { Header } from "../../components";
import api from "../../services/api";

export default () => {

    const [userProfile, setUserProfile] = useState(null);


    const [name, setName] = useState("");
    const [course_module, setCourse_Module] = useState("");

    useEffect(() => {
        if (userProfile !== null) {
            const { name, course_module } = userProfile;
            setName(name);
            setCourse_Module(course_module);
        }


    }, [userProfile, setName, setCourse_Module])

    useEffect(() => {
        // Verificar se existe um token no localStorage
        const token = localStorage.getItem("@Token");

        if (token) {
            // Fazer uma solicitação ao servidor para validar o token
            api
                .get("/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    const user = response.data;
                    setUserProfile(user);
                })
                .catch((error) => {
                    console.log(error);
                    // Trate os erros adequadamente (por exemplo, limpar o localStorage)
                });
        }
    }, [setUserProfile]);


    return (
        <>
            <Header setUserProfile={setUserProfile} />
            <section className="container lg h_118" >
                <h1 className="title1">Olá, {name} </h1>
                <p className="headline bold grey1"> {course_module}</p>
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
    )
}