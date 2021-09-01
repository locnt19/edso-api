import Teacher from "../../models/Teacher";
import { UserInputError } from 'apollo-server-express';
import { generateHashFromId, generateIdFromHash } from '../../utils/helpers';
import BaseUser from '../../models/BaseUser';
import AccessTokenModel from '../../models/AccessToken';
import { teacherRegisterInputSchema } from '../../utils';
import bcrypt from 'bcryptjs';




export const registerTeacher = async (rootValue, { teacherInfo }) => {
    try {
        let foundUser = await Teacher.emailExist(teacherInfo.email);
        if (foundUser) {
            return new UserInputError('This email has been used');
        }
        const { error } = teacherRegisterInputSchema.validate(teacherInfo);
        if (error) {
            return new UserInputError(error.message, error);
        }
        teacherInfo.password = bcrypt.hashSync(teacherInfo.password, 10);
        foundUser = await new Teacher(teacherInfo);
        foundUser.hash = generateHashFromId(foundUser._id);
        await foundUser.save();

        return {
            success: true,
            msg: 'Register new teacher successfully',
            payload: foundUser
        };
    } catch (e) {
        return e;
    }
}
