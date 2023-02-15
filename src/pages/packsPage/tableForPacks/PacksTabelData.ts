import moment from "moment/moment";

export type sortTypePacks = 'cover' | 'name' | 'cardsCount' | 'user_name' | 'updated' | 'actions'

export type ColumnPacks = {
    id: sortTypePacks
    label: string
    minWidth?: number
    align?: 'center' | 'left' | 'right'
    format?: (value: string) => string
}

export type RowsDataPacks = {
    cover: string;
    pack_id: string;
    user_id: string;
    name: string;
    cardsCount: number;
    user_name: string;
    updated: string;
    actions?: any;
}

export const createDataPacks = (
    cover: string,
    pack_id: string,
    user_id: string,
    name: string,
    cardsCount: number,
    user_name: string,
    updated: string,
): RowsDataPacks => {
    return {cover, pack_id, user_id, name, cardsCount, user_name, updated};
}

export const columnsPacks: ColumnPacks[] = [
    {id: 'cover', label: 'Cover', minWidth: 100, align: 'left'},
    {id: 'name', label: 'Name', minWidth: 170, align: 'center'},
    {id: 'cardsCount', label: 'Cards', minWidth: 80, align: 'center'},
    {id: 'user_name', label: 'Created by', minWidth: 170, align: 'center'},
    {
        id: 'updated',
        label: 'Last updated',
        minWidth: 170,
        format: (value: string) => moment(value).utc().format('DD.MM.YYYY'),
        align: 'center'
    },
    {id: 'actions', label: 'Actions', minWidth: 170, align: 'right'},
];





