import { z } from 'zod';

function validatePhoneNumber(phone) {
    return /^[0-9]{10,}$/.test(phone);
}

const CourseModuleEnum = z.enum([
    "Primeiro módulo (Introdução ao Frontend)",
    "Segundo módulo (Frontend Avançado)",
    "Terceiro módulo (Introdução ao Backend)",
    "Quarto módulo (Backend Avançado)"
]);

const registerFormSchema = z.object({
    name: z.string().min(6),
    email: z.string().email("Fornceça um e-mail válido").min(1, "O e-mail é obrigatório."),
    password: z.string().min(8, "A senha precisa ter 8 digistos ou mais!")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).+/),
    confirmPassword: z.string().min(1, "Confirme sua senha"),
    bio: z.string().min(10, "Faça uma breve descrição sobre você com no mínimo 10 digitos"),
    contact: z.string().refine(validatePhoneNumber, {
        message: "digite apenas numeros"
    }),
    course_module: CourseModuleEnum,
})

export { registerFormSchema };