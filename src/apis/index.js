import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'


// Board
// export const fetchBoardDetailAPI = async (boardId) => {
//     const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
//     return response.data
// }

export const updateBoardDetailAPI = async (boardId, updateData) => {
    const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)
    return response.data
}

export const moveCardToDiffirentColumnsAPI = async (updateData) => {
    const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/boards/supports/move_card`, updateData)
    return response.data
}

// Column
export const createNewColumnAPI = async (newColumnData) => {
    const response = await authorizeAxiosInstance.post(`${API_ROOT}/v1/columns`, newColumnData)
    return response.data
}

export const updateColumnDetailAPI = async (columnId, updateData) => {
    const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/columns/${columnId}`, updateData)
    return response.data
}

export const deleteColumnDetailAPI = async (columnId) => {
    const response = await authorizeAxiosInstance.delete(`${API_ROOT}/v1/columns/${columnId}`)
    return response.data
}

// Card
export const createNewCardAPI = async (newCardData) => {
    const response = await authorizeAxiosInstance.post(`${API_ROOT}/v1/cards`, newCardData)
    return response.data
}
