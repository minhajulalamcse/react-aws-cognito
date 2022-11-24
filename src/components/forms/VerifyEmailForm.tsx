import { Button, TextField, Typography } from "@mui/material";
import { Formik, Form, FormikHelpers } from "formik";
import * as yup from "yup";
import { IVerifyEmailValues } from "../../interfaces/IVerifyEmailValues";
import FormWrapper from "../common/FormWrapper";

const VerifyEmailForm = () => {
    const initialValues: IVerifyEmailValues = {
        code: "",
    };

    const validationSchema = yup.object().shape({
        code: yup.string().required("Required"),
    });

    const onSubmit = (values: IVerifyEmailValues, actions: FormikHelpers<IVerifyEmailValues>) => {
        console.log(values);
    };
    return (
        <FormWrapper>
            <Typography variant="h5" mb={1} textAlign="center">
                Verify Email
            </Typography>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {(formik) => {
                    return (
                        <Form>
                            <TextField
                                label="Code"
                                size="medium"
                                name="code"
                                sx={{
                                    border: "1px solid #FFF",
                                    borderRadius: 1,
                                    width: "100%",
                                    mt: "12px",
                                }}
                                autoComplete="off"
                                type="text"
                                placeholder="Code"
                                value={formik.values.code}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.code && Boolean(formik.errors.code)}
                                helperText={formik.touched.code && formik.errors.code}
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

export default VerifyEmailForm;
