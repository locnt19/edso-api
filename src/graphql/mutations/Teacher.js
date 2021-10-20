import Teacher from "../../models/Teacher";
import { UserInputError } from 'apollo-server-express';
import { generateHashFromId, generateIdFromHash } from '../../utils/helpers';
import BaseUser from '../../models/BaseUser';
import AccessTokenModel from '../../models/AccessToken';
import { teacherRegisterInputSchema } from '../../utils';
import bcrypt from 'bcryptjs';




export const registerTeacher = async (parent, { input }, context, info) => {
    try {
        let newUser = await Teacher.emailExist(input.email);
        if (newUser) {
            return new UserInputError('This email has been used');
        }
        input.centerId = context.user.centerId;
        const { error } = teacherRegisterInputSchema.validate(input);
        if (error) {
            return new UserInputError(error.message, error);
        }
        input.password = bcrypt.hashSync(input.password, 10);
        newUser = await new Teacher(input);
        newUser.hash = generateHashFromId(newUser._id);
        await newUser.save();

        return {
            success: true,
            msg: 'Register new Teacher successfully',
            payload: newUser
        };
    } catch (e) {
        return e;
    }
}
