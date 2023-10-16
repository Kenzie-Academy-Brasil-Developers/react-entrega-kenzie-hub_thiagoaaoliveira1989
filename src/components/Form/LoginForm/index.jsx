import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom";
import Input from "../Input";
import { useEffect, useState } from "react";
import api from './../../../services/api';
import { loginFormSchema } from "./loginForm.schema";
import { toast } from "react-toastify";


export default () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid },
    } = useForm({
        resolver: zodResolver(loginFormSchema),
    });


    const userRegister = async (payload) => {
        try {
            setLoading(true);
            const { data } = await api.post("/sessions", payload);
            const { token } = data
            localStorage.setItem("@Token", token);
            toast.success("Login realizado com sucesso!", {
                className: "toast-custom-background",
            })
            navigate("/dashboard");

        } catch (error) {
            toast.error("Email ou Senha incorretos", {
                className: "toast-custom-background",
            });
        } finally {
            setLoading(false);

        }
    }

    const submit = (payload) => {
        userRegister(payload);
    }



    return (
        <form onSubmit={handleSubmit(submit)}>

            <Input
                label="E-mail"
                type="email"
                id="email"
                placeholder="Digite aqui seu email"
                {...register("email")}
                error={errors.email}
            />
            <Input
                label="Senha"
                type="password"
                id="password"
                placeholder="Digite aqui sua senha"
                {...register("password")}
                error={errors.password}
            />


            <button disabled={loading} className="btn primary text_btn" type="submit">Entrar</button>


        </form>
    )
}