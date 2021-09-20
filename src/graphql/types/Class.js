import { gql } from 'apollo-server-express';

import {
    IdOptional,
    HashMustHave,
    HashOptional,
    PaginateTemplate
} from './index';

const ClassTemplate = `
    centerId: ObjectID
    name: String
    subjectId: ObjectID
    status: String
    maxStudent: Int
    code: String
    year: String
`;

const ClassCreateTemplate = `
    centerId: ObjectID!
    name: String!
    subjectId: ObjectID!
    status: String
    maxStudent: Int
    code: String
    year: String
`;

const ClassStudentTemplate = `
    teacherApproved: ObjectID
    studentId: ObjectID
    status: String
`;

const ClassTimeFrameTemplate = `
    timeShift: String
    date: String
`;

const ClassStudentReportTemplate = `
    studentReport: ObjectID
`;

export const ClassDefs = gql`
    type ClassStudent {
        ${IdOptional}
        ${ClassStudentTemplate}
    }

    input ClassStudentInput {
        teacherApproved: ObjectID!
        studentId: ObjectID!
        status: String!
    }

    input ClassStudentFilterInput {
        ${ClassStudentTemplate}
    }

    type ClassTimeFrame {
        ${IdOptional}
        ${ClassTimeFrameTemplate}
    }

    input ClassTimeFrameInput {
        timeShift: String!
        date: String!
    }

    input ClassTimeFrameFilterInput {
        ${ClassTimeFrameTemplate}
    }

    type ClassStudentReport {
        ${IdOptional}
        ${ClassStudentReportTemplate}
    }

    input ClassStudentReportInput {
        studentReport: ObjectID!
    }

    input ClassStudentReportFilterInput {
        ${ClassStudentReportTemplate}
    }

    type Class {
        ${IdOptional}
        ${HashOptional}
        ${ClassTemplate}
        students: [ClassStudent]
        timeFrame: [ClassTimeFrame]
        studentReport: [ClassStudentReport]
    }

    type MutationOfClass implements MutationOf {
        "Mutation result"
        success: Boolean
        "Mutation message"
        msg: String
        "Class info"
        payload: Class
    }

    type ClassPaginate {
        docs: [Class]
        ${PaginateTemplate}
    }

    input ClassCreateInput {
        ${ClassCreateTemplate}
        students: [ClassStudentInput]
        timeFrame: [ClassTimeFrameInput]
        studentReport: [ClassStudentReportInput]
    }

    input ClassUpdateInput {
        ${HashMustHave}
        ${ClassTemplate}
        students: [ClassStudentInput]
        timeFrame: [ClassTimeFrameInput]
        studentReport: [ClassStudentReportInput]
    }

    input ClassFilterInput {
        ${HashOptional}
        ${ClassTemplate}
        students: ClassStudentFilterInput
        timeFrame: ClassTimeFrameFilterInput
        studentReport: ClassStudentReportFilterInput
    }
`;
