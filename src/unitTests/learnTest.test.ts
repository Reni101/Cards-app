
import {
    InitialStateType,
    LearnReducer,
    setCardsLearnAC
} from "../pages/learn/LearnReducer";


let startState: InitialStateType


beforeEach(() => {
    startState = {
        cards: [],
        randomCard: {
            _id: "",
            cardsPack_id: "",
            answer: "",
            question: "",
            created: "",
            grade: 0,
            rating: 0,
            shots: 0,
            updated: "",
            user_id: ""
        },
        packUserId: null,
        packName: null,
        packPrivate: null,
        cardsTotalCount: null
    }
})

test('correct set response', () => {
    const endState = LearnReducer(startState, setCardsLearnAC({
        cards: [{
            _id: "",
            cardsPack_id: "",
            answer: "5",
            question: "1+4",
            created: "",
            grade: 0,
            rating: 0,
            shots: 0,
            updated: "",
            user_id: "",
            more_id: ""
        }],
        packName: "New pack",
        packUserId: "",
        pageCount: 100
    }))
    expect(endState.cards[0].question).toBe("1+4")
    expect(endState.cards[0].answer).toBe("5")
})



