import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom";
import { registerFormSchema } from "./registerForm.schema";
import Input from "../Input";
import { useContext, useState } from "react";
import { UserContext } from "../../../providers/UserContext";


export default () => {

    const { userRegister, loading } = useContext(UserContext);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid },
    } = useForm({
        resolver: zodResolver(registerFormSchema),
    });




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