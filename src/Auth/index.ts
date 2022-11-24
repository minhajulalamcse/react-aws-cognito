import { Auth } from "aws-amplify";
import { ISignUpFormValues } from "../interfaces/ISignUpFormValues";

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
