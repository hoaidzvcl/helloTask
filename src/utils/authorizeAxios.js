import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from './formatters'

// Khởi tạo đối tượng Axios (authorizeAxiosInstance) để custom và cấu hình chung cho dự án
let authorizeAxiosInstance = axios.create()

// Thời gian chờ tối đa của 1 request là 10p
authorizeAxiosInstance.defaults.timeout = 1000 * 60 * 10

//withCredentials cho phép axios tự động gửi cookie trog mỗi req lên BE (để lưu JWT token vào httpOnly Cookie của trình duyệt)
authorizeAxiosInstance.defaults.withCredentials = true

// Add a request interceptor
authorizeAxiosInstance.interceptors.request.use((config) => {
    // Chặn spam click
    interceptorLoadingElements(true)
    
    return config
}, (error) => {
    // Do something with request error
    return Promise.reject(error)
})

// Add a response interceptor
authorizeAxiosInstance.interceptors.response.use((response) => {
    // Chặn spam click
    interceptorLoadingElements(false)

    return response
}, (error) => {
    // Mọi mã http status code nằm ngoài khoảng 200-299 sẽ là error rơi vào Đây

    // Chặn spam click
    interceptorLoadingElements(false)

    // Xử lý tập trung phần hiển thị thông báo lỗi trả vê từ API ở đây 
    // console.log(error) để thấy cấu trúc data dẫn tới message lỗi
    let errorMessage = error?.message
    if (error.response?.data?.message) {
        errorMessage = error.response?.data?.message
    }

    if (error.response?.status !== 410) {
        toast.error(errorMessage)
    }



    return Promise.reject(error)
})

export default authorizeAxiosInstance