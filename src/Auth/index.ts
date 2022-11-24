import { Auth } from "aws-amplify";
import { ISignInFormValues } from "../interfaces/ISignInFormValues";
import { ISignUpFormValues } from "../interfaces/ISignUpFormValues";
import { IVerifyEmailValues } from "../interfaces/IVerifyEmailValues";

export const signUp = async (values: ISignUpFormValues) => {
    const { firstName, lastName, email, password } = values;
    try {
        const { user } = await Auth.signUp({
            username: email,
            password,
            attributes: {
                given_name: firstName,
                family_name: lastName,
            },
        });
        return user;
    } catch (error) {
        throw error;
    }
};

export const resendConfirmationCode = async (email: string) => {
    try {
        await Auth.resendSignUp(email);
    } catch (error) {
        throw error;
    }
};

export const confirmSignUp = async (values: IVerifyEmailValues) => {
    const { email, code } = values;
    try {
        await Auth.confirmSignUp(email, code);
    } catch (error) {
        throw error;
    }
};

export const signIn = async (values: ISignInFormValues) => {
    const { email, password } = values;
    try {
        const user = await Auth.signIn(email, password);
        return user;
    } catch (error) {
        throw error;
    }
};
