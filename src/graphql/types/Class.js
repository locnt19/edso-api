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

export const ClassDefs = gql`
    type ClassStudent {
        ${IdOptional}
        teacherApproved: ObjectID
        studentId: ObjectID
        status: String
    }

    input ClassStudentInput {
        teacherApproved: ObjectID!
        studentId: ObjectID!
        status: String
    }

    type ClassTimeFrame {
        ${IdOptional}
        timeShift: String
        date: String
    }

    input ClassTimeFrameInput {
        timeShift: String!
        date: String!
    }

    type ClassStudentReport {
        ${IdOptional}
        studentReport: ObjectID
    }

    input ClassStudentReportInput {
        studentReport: ObjectID!
    }

    type Class {
        ${IdOptional}
        ${HashOptional}
        ${ClassTemplate}
        students: [ClassStudent]
        timeFrame: [ClassTimeFrame]
        studentReport: [ClassStudentReport]
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
`;
