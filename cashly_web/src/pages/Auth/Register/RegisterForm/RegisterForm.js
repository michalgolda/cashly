import * as yup from "yup";
import { useFormik } from "formik";
import { useMutation } from "react-query";

import { register } from "../../../../mutations";
import AuthForm from "../../AuthForm/AuthForm";
import { Input, Button } from "../../../../components";
import { useHistory } from "react-router";

export default function RegisterForm() {
    const initialValues = {
        email: "",
        password: "",
        confirmPassword: ""
    };

    const validationSchema = yup.object({
        email: yup.string()
            .email("Podaj prawidłowy email")
            .required("To pole jest wymagane"),
        password: yup.string()
            .required("To pole jest wymagane"),
        confirmPassword: yup.string()
            .oneOf(
                [yup.ref("password"), null], 
                "Hasła nie są zgodne"
            )
            .required("To pole jest wymagane")
    });
    
    const history = useHistory();

    const mutation = useMutation(register, {
        onSuccess: () => history.push('/login')
    });

    const onSubmit = (values, { setFieldError}) => {
        delete values['confirmPassword'];

        mutation.mutate(values, {
            onError: ({ response }) => {
                if (response) {
                    if (response.status == 400) {
                        const { code, message } = response.data;

                        switch (code) {
                            case "UserEmailAlreadyUsed":
                                setFieldError("email", message);
                                break;
                        }
                    }
                }
            }
        });
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    });

    return (
        <AuthForm onSubmit={formik.handleSubmit} noValidate>
            <Input 
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.touched.email && formik.errors.email}
                labelText="E-Mail"
                fullWidth
            />
            <Input 
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                error={formik.touched.password && formik.errors.password}
                labelText="Hasło"
                fullWidth
            />
            <Input 
                name="confirmPassword"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                error={formik.touched.confirmPassword && formik.errors.confirmPassword}
                labelText="Powtórz hasło"
                fullWidth
            />
            <Button type="submit" fullWidth>Zarejestruj się</Button>
        </AuthForm>
    )
}