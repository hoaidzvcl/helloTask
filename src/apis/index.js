import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'
import { toast } from 'react-toastify'


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

/** Users */
export const registerUserAPI = async (data) => {
    const response = await authorizeAxiosInstance.post(`${API_ROOT}/v1/users/register`, data)
    toast.success('Account created successfully! Please check and verify your account before logging in!', { theme: 'colored' })
    return response.data
}

export const verifyUserAPI = async (data) => {
    const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/users/verify`, data)
    toast.success('Account verified successfully! Now you can login to enjoy our services! Have a good day!', { theme: 'colored' })
    return response.data
}
