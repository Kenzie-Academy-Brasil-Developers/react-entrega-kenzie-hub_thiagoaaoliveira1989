import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import Input from "../Input";
import { useContext } from "react";
import { loginFormSchema } from "./loginForm.schema";
import { UserContext } from "../../../providers/UserContext";


export default () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginFormSchema),
    });

    const { userLogin, loading } = useContext(UserContext);

    const submit = (payload) => {
        userLogin(payload);
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
                autoComplete="current-password"
                placeholder="Digite aqui sua senha"
                {...register("password")}
                error={errors.password}
            />


            <button disabled={loading} className="btn primary text_btn" type="submit">Entrar</button>


        </form>
    )
}