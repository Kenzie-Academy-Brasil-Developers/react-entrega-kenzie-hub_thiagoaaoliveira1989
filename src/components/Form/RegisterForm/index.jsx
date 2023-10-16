import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom";
import { registerFormSchema } from "./registerForm.schema";
import Input from "../Input";
import { useState } from "react";
import api from './../../../services/api';
import { toast } from "react-toastify";


export default () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid },
    } = useForm({
        resolver: zodResolver(registerFormSchema),
    });


    const userRegister = async (payload) => {
        console.log(payload);
        try {
            setLoading(true);
            await api.post("/users", payload);
            toast.success("Conta criada com sucesso!", {
                className: "toast-custom-background",
            })
            navigate("/")

        } catch (error) {
            toast.error("Ops! Algo deu errado", {
                className: "toast-custom-background",
            })
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
                label="Nome"
                type="text"
                id="text"
                placeholder="Digite aqui seu nome"
                {...register("name")}
                error={errors.name}
            />
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

            <Input
                label="Confirme sua senha"
                type="password"
                id="password2"
                placeholder="Digite sua Senha novamente"
                {...register("confirmPassword")}
                error={errors.confirmPassword}
            />

            <Input
                label="Bio"
                type="text"
                id="bio"
                placeholder="Digite sua Senha novamente"
                {...register("bio")}
                error={errors.bio}
            />

            <Input
                label="Contato"
                type="text"
                id="contact"
                placeholder="Digite sua Senha novamente"
                {...register("contact")}
                error={errors.contact}
            />

            <div className="inputBox">
                <label className="label" htmlFor="course_module">Selecionar Módulo</label>
                <select id="course_module" required {...register("course_module")}>
                    <option value="Primeiro módulo (Introdução ao Frontend)">Primeiro módulo</option>
                    <option value="Segundo módulo (Frontend Avançado)">Segundo módulo</option>
                    <option value="Terceiro módulo (Introdução ao Backend)">Terceiro módulo</option>
                    <option value="Quarto módulo (Backend Avançado)">Quarto módulo</option>
                </select>
            </div>

            <button disabled={loading} className="btn negativo text_btn" type="submit">Cadastrar</button>

        </form>
    )
}