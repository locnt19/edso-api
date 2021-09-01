import Student from "../../models/Student";
import { UserInputError } from 'apollo-server-express';
import { generateHashFromId, generateIdFromHash } from '../../utils/helpers';
import BaseUser from '../../models/BaseUser';
import AccessTokenModel from '../../models/AccessToken';
import { StudentRegisterInputSchema } from '../../utils';
import bcrypt from 'bcryptjs';




export const registerStudent = async (rootValue, { studentInfo }) => {
    try {
        let foundUser = await Student.emailExist(studentInfo.email);
        if (foundUser) {
            return new UserInputError('This email has been used');
        }
        const { error } = StudentRegisterInputSchema.validate(studentInfo);
        if (error) {
            return new UserInputError(error.message, error);
        }
        studentInfo.password = bcrypt.hashSync(studentInfo.password, 10);
        foundUser = await new Student(studentInfo);
        foundUser.hash = generateHashFromId(foundUser._id);
        await foundUser.save();

        return {
            success: true,
            msg: 'Register new student successfully',
            payload: foundUser
        };
    } catch (e) {
        return e;
    }
}
