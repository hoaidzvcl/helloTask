import { useState, useEffect } from 'react'
import { useSearchParams, Navigate } from 'react-router-dom'
import PageLoadingSpinner from '~/componets/Loading/PageLoadingSpinner'
import { verifyUserAPI } from '~/apis/index'

function AccountVerification() {
    // Lấy giá trị email và token từ URL
    let [searchParams] = useSearchParams()
    const { email, token } = Object.fromEntries([...searchParams])

    // Tạo 1 state để biết đã verify tài khoản thành công chưa
    const [verified, setVerified] = useState(false)

    // Call API verify
    useEffect(() => {
        if (email && token) {
            verifyUserAPI({ email, token }).then(() => setVerified(true))
        }
    }, [email, token])

    // Nếu URL có vấn đề, không tồn tại 1 trong 2 giá trị thì redirect trang 404
    if (!email || !token) {
        return <Navigate to="/404" />
    }
    // Nếu chưa verify thì hiện loading page
    if (!verified) {
        return <PageLoadingSpinner caption="Verifying your account ..." />
    }

    // Nếu verify thành công thì redirect về trang login cùng giá trị verifiedEmail
    return <Navigate to={`/login?verifiedEmail=${email}`} />
}

export default AccountVerification