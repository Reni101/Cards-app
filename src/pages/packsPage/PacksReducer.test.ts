import {
    changeMaxAC,
    changeMinAC,
    changePageAC, changePageCountAC, changeShowMyPacksAC, changeSortPacksAC,
    InitialStateType,
    PacksReducer,
    PacksType,
    setPacksAC, sortPacksNameAC
} from './PacksReducer';
import {ResponsePacksType} from './PacksAPI';

let InitialPacksState:InitialStateType;
const MAX_COUNT_CARDS = 110

beforeEach(()=>{
    InitialPacksState = {
        cardPacks: [],
        cardPacksTotalCount: 0,
        minCardsCount: 0,
        maxCardsCount: 0,
        page: 1,
        pageCount: 5,
        min: 0,
        max: MAX_COUNT_CARDS,
        sortPacks: '',
        packName: null,
        user_id: '',
    }
})
const Pack:PacksType = {
    _id: 'pack_id',
    user_id: 'user_id_1857564756',
    user_name: 'Misha',
    private: false,
    name: 'NewPack',
    grade: 4,
    shots: 0,
    deckCover: '',
    cardsCount: 0,
    created: '22.10.2022',
    updated: '01.01.2023'
}

test('corrected work set packs ',()=>{
    const PacksData:ResponsePacksType = {
        cardPacks: [Pack],
        cardPacksTotalCount:1,
        pageCount:5,
        page:1,
        maxCardsCount:20,
        minCardsCount:0
    }
    const FinishState = PacksReducer(InitialPacksState,setPacksAC(PacksData))
    expect(FinishState.page).toBe(1)
    expect(FinishState.cardPacks[0].name).toBe('NewPack')
    expect(FinishState.cardPacksTotalCount).toBe(1)
    expect(FinishState.cardPacks.length).toBe(1)
    expect(FinishState.maxCardsCount).toBe(20)
})

test('correct work change page ',()=>{
const FinishState = PacksReducer(InitialPacksState,changePageAC(4))

    expect(FinishState.page).toBe(4)
})

test('correct change min filter value',()=>{
const FinishState = PacksReducer(InitialPacksState,changeMinAC(1))
    expect(FinishState.min).toBe(1)
})

test('correct change max filter value',()=>{
const FinishState = PacksReducer(InitialPacksState,changeMaxAC(25))
    expect(FinishState.max).toBe(25)
})

test('correct change page count',()=>{
    const FinishState = PacksReducer(InitialPacksState,changePageCountAC(10))
    expect(FinishState.pageCount).toBe(10)
})

test('correct sort of the name packs',()=>{
    const FinishState = PacksReducer(InitialPacksState,changeSortPacksAC('hello'))
    expect(FinishState.sortPacks).toBe('hello')
})

test('correct change of the pack name ',()=>{
    const FinishState = PacksReducer(InitialPacksState,sortPacksNameAC('Changed name'))
    expect(FinishState.packName).toBe('Changed name')
})

test('correct show me pack where matched user id  ',()=>{
    const FinishState = PacksReducer(InitialPacksState,changeShowMyPacksAC('user_id_1857564756'))
    expect(FinishState.user_id).toBe('user_id_1857564756')
})