import { gql } from 'apollo-server-express';

import { HashMustHave, HashOptional, PaginateTemplate } from './index';

const ClassTemplate = `
    centerHash: String
    name: String
    subjectHash: String
    status: ClassStatus
    maxStudent: Int
    code: String
    year: String
`;

const ClassCreateTemplate = `
    centerHash: String!
    name: String!
    subjectHash: String!
    status: ClassStatus
    maxStudent: Int
    code: String
    year: String
`;

const ClassStudentTemplate = `
    teacherApprovedHash: String
    studentHash: String
    status: ClassStudentStatus
`;

const ClassTimeFrameTemplate = `
    timeShiftHash: String
    date: ClassTimeFrameDate
`;

const ClassStudentReportTemplate = `
    studentReportHash: String
`;

export const ClassDefs = gql`
    type ClassStudent {
        ${ClassStudentTemplate}
    }

    input ClassStudentInput {
        teacherApprovedHash: String!
        studentHash: String!
        status: ClassStudentStatus
    }

    input ClassStudentFilterInput {
        ${ClassStudentTemplate}
    }

    type ClassTimeFrame {
        ${ClassTimeFrameTemplate}
    }

    input ClassTimeFrameInput {
        timeShiftHash: String!
        date: ClassTimeFrameDate!
    }

    input ClassTimeFrameFilterInput {
        ${ClassTimeFrameTemplate}
    }

    type ClassStudentReport {
        ${ClassStudentReportTemplate}
    }

    input ClassStudentReportInput {
        studentReportHash: String!
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
