import { Button, TextField, Typography } from "@mui/material";
import { Formik, Form, FormikHelpers } from "formik";
import * as yup from "yup";
import { IResetPasswordStep1Form } from "../../interfaces/IResetPasswordStep1Form";
import FormWrapper from "../common/FormWrapper";

const ResetPasswordStep1Form = () => {
    const initialValues: IResetPasswordStep1Form = {
        email: "",
    };

    const validationSchema = yup.object().shape({
        email: yup.string().email("Invalid email").required("Required"),
    });

    const onSubmit = (values: IResetPasswordStep1Form, actions: FormikHelpers<IResetPasswordStep1Form>) => {
        console.log(values);
        localStorage.setItem("email", values.email);
        window.dispatchEvent(new Event("storage"));
    };
    return (
        <FormWrapper>
            <Typography variant="h5" mb={1} textAlign="center">
                Reset Password
            </Typography>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {(formik) => {
                    return (
                        <Form>
                            <TextField
                                label="Email"
                                size="medium"
                                name="email"
                                sx={{
                                    border: "1px solid #FFF",
                                    borderRadius: 1,
                                    width: "100%",
                                    mt: "12px",
                                }}
                                autoComplete="off"
                                type="text"
                                placeholder="Email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />

                            <Button type="submit" variant="contained" disableElevation fullWidth sx={{ mt: "12px" }}>
                                Submit
                            </Button>
                        </Form>
                    );
                }}
            </Formik>
        </FormWrapper>
    );
};

export default ResetPasswordStep1Form;
