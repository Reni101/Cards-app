export type sortTypeUsers = 'avatar' | 'name' | 'email' | 'publicCardPacksCount' | 'actions'

export type ColumnUsers = {
    id: sortTypeUsers
    label: string
    minWidth?: number
    align?: 'center' | 'left' | 'right'
    format?: (value: string) => string
}

export type RowsDataUsers = {
    avatar?: string
    email: string
    _id: string
    name: string
    publicCardPacksCount: number
}

export const createDataUsers = (
    email: string,
    _id: string,
    name: string,
    publicCardPacksCount: number,
    avatar?: string,
): RowsDataUsers => {
    return {_id, name, publicCardPacksCount, avatar, email};
}

export const columnsUsers: ColumnUsers[] = [
    {id: 'avatar', label: 'Avatar', minWidth: 100, align: 'left'},
    {id: 'name', label: 'Name', minWidth: 170, align: 'center'},
    {id: 'email', label: 'Email', minWidth: 80, align: 'center'},
    {id: 'publicCardPacksCount', label: 'Public Cards', minWidth: 170, align: 'center'},
];





