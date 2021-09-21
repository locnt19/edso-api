import { gql } from 'apollo-server-express';

import { HashMustHave, HashOptional, PaginateTemplate } from './index';

const ClassTemplate = `
    centerId: ObjectID
    name: String
    subjectId: ObjectID
    "pending | approved"
    status: String
    maxStudent: Int
    code: String
    year: String
`;

const ClassCreateTemplate = `
    centerId: ObjectID!
    name: String!
    subjectId: ObjectID!
    "pending | approved"
    status: String
    maxStudent: Int
    code: String
    year: String
`;

const ClassStudentTemplate = `
    teacherApproved: ObjectID
    studentId: ObjectID
    "pending | approved. Default is 'pending'"
    status: String
`;

const ClassTimeFrameTemplate = `
    "Time Shift hash"
    timeShift: String
    "mon | tue | wed | thu | fri | sat | sun"
    date: String
`;

const ClassStudentReportTemplate = `
    studentReport: ObjectID
`;

export const ClassDefs = gql`
    type ClassStudent {
        ${ClassStudentTemplate}
    }

    input ClassStudentInput {
        teacherApproved: ObjectID!
        studentId: ObjectID!
        "pending | approved"
        status: String!
    }

    input ClassStudentFilterInput {
        ${ClassStudentTemplate}
    }

    type ClassTimeFrame {
        ${ClassTimeFrameTemplate}
    }

    input ClassTimeFrameInput {
        "Time Shift hash"
        timeShift: String!
        "mon | tue | wed | thu | fri | sat | sun"
        date: String!
    }

    input ClassTimeFrameFilterInput {
        ${ClassTimeFrameTemplate}
    }

    type ClassStudentReport {
        ${ClassStudentReportTemplate}
    }

    input ClassStudentReportInput {
        studentReport: ObjectID!
    }

    input ClassStudentReportFilterInput {
        ${ClassStudentReportTemplate}
    }

    type Class {
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
