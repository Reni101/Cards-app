import moment from "moment";

export type sortCardsType = 'question' | 'answer' | 'updated' | "grade"

export type CardsColumn = {
    id: sortCardsType
    label: string;
    minWidth?: number;
    align?: 'center' | 'left' | 'right';
    format?: (value: string) => string;
}

export type RowDataTableCards = {
    id: string;
    packPackId: string;
    answer: string;
    question: string;
    updated: string;
    grade?: number;
    questionImg: string
    answerImg: string
}

export const createDataForCards = (
    id: string,
    packPackId: string,
    answer: string,
    question: string,
    updated: string,
    grade: number,
    questionImg: string,
    answerImg: string,
): RowDataTableCards => {
    return {id, packPackId, answer, question, updated, grade, questionImg, answerImg};
}

export const columnsForCards: CardsColumn[] = [
    {id: 'question', label: 'Question', minWidth: 170, align: 'left'},
    {id: 'answer', label: 'Answer', minWidth: 80, align: 'center'},
    {
        id: 'updated',
        label: 'Last updated',
        minWidth: 170,
        format: (value: string) => moment(value).utc().format('DD.MM.YYYY'),
        align: 'center'
    },
    {id: 'grade', label: 'Grade', minWidth: 170, align: 'left'},
];

