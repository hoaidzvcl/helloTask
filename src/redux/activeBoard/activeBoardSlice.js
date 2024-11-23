import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { isEmpty } from 'lodash'
import { mapOrder } from '~/utils/sorts'
import { API_ROOT } from '~/utils/constants'
import { generatePlaceholderCard } from '~/utils/formatters'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


// Khởi tạo giá trị State của 1 Slice trong Redux
const initialState = {
    currentActiveBoard: null
}

// Các hành động gọi API (bất đồng bộ) và cập nhật dữ liệu vào Redux, dùng MiddleWare createAsyncThunk đi kèm với extraReducers
export const fetchBoardDetailAPI = createAsyncThunk(
    'activeBoard/fetchBoardDetailAPI',
    async (boardId) => {
        const response = await authorizeAxiosInstance.get(`${API_ROOT}/v1/boards/${boardId}`)
        return response.data
    }
)

// Khởi tạo 1 Slice trong kho lưu trữ Redux Store
export const activeBoardSlice = createSlice({
    name: 'activeBoard',
    initialState,
    // Reducer là nơi xử lý dữ liệu đồng bộ
    reducers: {
        updateCurrentActiveBoard: (state, action) => {
            // action.payload là chuẩn đặt tên nhận dữ liêu và reducer, gán ra 1 biến có ý nghĩa hơn
            const board = action.payload

            // Xử lý dữ liệu nếu cần
            //...

            // Update lại dữ liệu của currentActiveBoard
            state.currentActiveBoard = board
        }
    },
    // extraReducer là nơi xử lý dữ liệu bất đồng bộ
    extraReducers: (builder) => {
        builder.addCase(fetchBoardDetailAPI.fulfilled, (state, action) => {
            // action.payload ở đây là response.data trả về
            let board = action.payload

            board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')
            // Xử lý kéo thả vào một column rỗng
            board.columns.forEach(column => {
                if (isEmpty(column.cards)) {
                    column.cards = [generatePlaceholderCard(column)]
                    column.cardOrderIds = [generatePlaceholderCard(column)._id]
                } else {
                    column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
                }
            })

            // Update lại dữ liệu của currentActiveBoard
            state.currentActiveBoard = board
        })
    }
})

export const { updateCurrentActiveBoard } = activeBoardSlice.actions

export const selectCurrentActiveBoard = (state) => {
    return state.activeBoard.currentActiveBoard
}
// export default activeBoardSlice.reducer
export const activeBoardSliceReducer = activeBoardSlice.reducer