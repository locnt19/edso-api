import Student from "../../models/Student";
import { UserInputError } from 'apollo-server-express';
import { generateHashFromId, generateIdFromHash } from '../../utils/helpers';
import BaseUser from '../../models/BaseUser';
import AccessTokenModel from '../../models/AccessToken';
import { studentRegisterInputSchema } from '../../utils';
import bcrypt from 'bcryptjs';




export const registerStudent = async (parent, { input }, context, info) => {
    try {
        let newUser = await Student.emailExist(input.email);
        if (newUser) {
            return new UserInputError('This email has been used');
        }
        input.centerId = context.user.centerId;
        const { error } = studentRegisterInputSchema.validate(input);
        if (error) {
            return new UserInputError(error.message, error);
        }
        input.password = bcrypt.hashSync(input.password, 10);
        newUser = await new Student(input);
        newUser.hash = generateHashFromId(newUser._id);
        await newUser.save();

        return {
            success: true,
            msg: 'Register new Student successfully',
            payload: newUser
        };
    } catch (e) {
        return e;
    }
}
