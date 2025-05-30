<script setup>
import axios from 'axios'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import ForgotPasswordForm from './Forms/ForgotPasswordForm.vue'
import OTPForm from './Forms/OTPForm.vue'
import ResetPasswordForm from './Forms/ResetPasswordForm.vue'
import SignInForm from './Forms/SignInForm.vue'
import SignUpForm from './Forms/SignUpForm.vue'
import FlexibleLeftOverlay from './overlays/FlexibleLeftOverlay.vue'
import FlexibleRightOverlay from './overlays/FlexibleRightOverlay.vue'

const router = useRouter()
const currentMode = ref('signin')

// Form data
const signInData = ref({ username: '', password: '' })
const signUpData = ref({ 
  firstName: '', lastName: '', username: '', 
  password: '', contact: '', email: '' 
})
const forgotData = ref({ username: '' })
const otpData = ref({ otp: '' })
const resetData = ref({ 
  newPassword: '', 
  confirmPassword: '' 
})
const error = ref(null)
const loading = ref(false)

// Toggle functions
const switchToSignUp = () => currentMode.value = 'signup'
const switchToSignIn = () => currentMode.value = 'signin'
const switchToForgotPassword = () => currentMode.value = 'forgot'
const switchToOTP = () => currentMode.value = 'otp'
const switchToResetPassword = () => currentMode.value = 'reset'

// Form handlers
const handleSignIn = async (data) => {
  console.log('Starting login with data:', data) // Debug log
  
  try {
    loading.value = true
    error.value = null
    
    console.log('Sending request to:', 'http://localhost:8080/bookstore/auth/token') // Debug log
    
    const response = await axios.post('http://localhost:8080/bookstore/auth/token', {
      username: data.username,
      password: data.password
    })
    
    console.log('Response received:', response.data) // Debug log
    
    if (response.data.code === 1000 && response.data.result.authenticated) {
      // Lưu token vào localStorage
      localStorage.setItem('token', response.data.result.token)
      console.log('Token saved, redirecting to dashboard') // Debug log
      
      // Chuyển hướng đến dashboard
      router.push('/dashboard')
      
    } else {
      console.log('Authentication failed:', response.data) // Debug log
      error.value = 'Sai tên đăng nhập hoặc mật khẩu'
      alert('Sai tên đăng nhập hoặc mật khẩu')
    }
    
  } catch (e) {
    console.error('Login error:', e) // Debug log
    console.error('Error response:', e.response) // Debug log để xem full response
    console.error('Error status:', e.response?.status) // Debug status code
    
    // Kiểm tra nếu có response từ server (lỗi 4xx, 5xx)
    if (e.response) {
      console.log('Server responded with error:', e.response.data) // Debug log
      
      // Xử lý theo error code từ backend
      if (e.response.data?.code) {
        switch (e.response.data.code) {
          case 1001: // hoặc code tương ứng với USER_NOT_EXISTED
            error.value = 'Tên đăng nhập không tồn tại'
            alert('Tên đăng nhập không tồn tại')
            break
          case 1002: // hoặc code tương ứng với UNAUTHENTICATED  
            error.value = 'Sai tên đăng nhập hoặc mật khẩu'
            alert('Sai tên đăng nhập hoặc mật khẩu')
            break
          default:
            error.value = 'Sai tên đăng nhập hoặc mật khẩu'
            alert('Sai tên đăng nhập hoặc mật khẩu')
        }
      } else if (e.response.data?.errorCode) {
        // Xử lý theo errorCode
        switch (e.response.data.errorCode) {
          case 'USER_NOT_EXISTED':
            error.value = 'Tên đăng nhập không tồn tại'
            alert('Tên đăng nhập không tồn tại')
            break
          case 'UNAUTHENTICATED':
            error.value = 'Sai tên đăng nhập hoặc mật khẩu'
            alert('Sai tên đăng nhập hoặc mật khẩu')
            break
          default:
            error.value = 'Sai tên đăng nhập hoặc mật khẩu'
            alert('Sai tên đăng nhập hoặc mật khẩu')
        }
      } else {
        // Fallback cho các lỗi 4xx khác
        error.value = 'Sai tên đăng nhập hoặc mật khẩu'
        alert('Sai tên đăng nhập hoặc mật khẩu')
      }
    } else if (e.request) {
      // Request được gửi nhưng không có response (lỗi network thật)
      console.error('No response received:', e.request)
      error.value = 'Lỗi kết nối mạng. Vui lòng kiểm tra kết nối và thử lại.'
      alert('Lỗi kết nối mạng. Vui lòng kiểm tra kết nối và thử lại.')
    } else {
      // other
      console.error('Request setup error:', e.message)
      error.value = 'Đã xảy ra lỗi. Vui lòng thử lại.'
      alert('Đã xảy ra lỗi. Vui lòng thử lại.')
    }
  } finally {
    loading.value = false
  }
}

const handleSignUp = async (data) => {
  console.log('Starting registration with data:', data) // Debug log
  
  try {
    loading.value = true
    error.value = null
    
    // Validate required fields
    if (!data.firstName || !data.lastName || !data.username || !data.password || !data.email) {
      error.value = 'Vui lòng điền đầy đủ thông tin bắt buộc'
      alert('Vui lòng điền đầy đủ thông tin bắt buộc')
      return
    }
    
    // Validate username length (min 4 characters)
    if (data.username.length < 4) {
      error.value = 'Tên đăng nhập phải có ít nhất 4 ký tự'
      alert('Tên đăng nhập phải có ít nhất 4 ký tự')
      return
    }
    
    // Validate password length (min 8 characters)
    if (data.password.length < 8) {
      error.value = 'Mật khẩu phải có ít nhất 8 ký tự'
      alert('Mật khẩu phải có ít nhất 8 ký tự')
      return
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      error.value = 'Email không hợp lệ'
      alert('Email không hợp lệ')
      return
    }
    
    console.log('Sending registration request to:', 'http://localhost:8080/bookstore/users') // Debug log
    
    const response = await axios.post('http://localhost:8080/bookstore/users', {
      username: data.username,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.contact || null, // contact field maps to phone
      dob: null // You can add date of birth field later if needed
    })
    
    console.log('Registration response received:', response.data) // Debug log
    
    if (response.data.code === 1000 && response.data.result) {
      console.log('Registration successful:', response.data.result) // Debug log
      
      // Clear form data
      signUpData.value = { 
        firstName: '', lastName: '', username: '', 
        password: '', contact: '', email: '' 
      }
      
      // Show success message and switch to sign in
      alert('Đăng ký thành công! Vui lòng đăng nhập.')
      switchToSignIn()
      
    } else {
      console.log('Registration failed:', response.data) // Debug log
      error.value = 'Đăng ký thất bại. Vui lòng thử lại.'
      alert('Đăng ký thất bại. Vui lòng thử lại.')
    }
    
  } catch (e) {
    console.error('Registration error:', e) // Debug log
    console.error('Error response:', e.response) // Debug log để xem full response
    console.error('Error status:', e.response?.status) // Debug status code
    
    // Kiểm tra nếu có response từ server (lỗi 4xx, 5xx)
    if (e.response) {
      console.log('Server responded with error:', e.response.data) // Debug log
      
      // Xử lý theo error code từ backend
      if (e.response.data?.code) {
        switch (e.response.data.code) {
          case 1002: // USER_EXISTED
            error.value = 'Tên đăng nhập đã tồn tại'
            alert('Tên đăng nhập đã tồn tại')
            break
          case 1003: // USERNAME_INVALID
            error.value = 'Tên đăng nhập không hợp lệ (tối thiểu 4 ký tự)'
            alert('Tên đăng nhập không hợp lệ (tối thiểu 4 ký tự)')
            break
          case 1004: // INVALID_PASSWORD
            error.value = 'Mật khẩu không hợp lệ (tối thiểu 8 ký tự)'
            alert('Mật khẩu không hợp lệ (tối thiểu 8 ký tự)')
            break
          default:
            error.value = 'Đăng ký thất bại. Vui lòng thử lại.'
            alert('Đăng ký thất bại. Vui lòng thử lại.')
        }
      } else if (e.response.data?.errorCode) {
        // Xử lý theo errorCode
        switch (e.response.data.errorCode) {
          case 'USER_EXISTED':
            error.value = 'Tên đăng nhập đã tồn tại'
            alert('Tên đăng nhập đã tồn tại')
            break
          case 'USERNAME_INVALID':
            error.value = 'Tên đăng nhập không hợp lệ (tối thiểu 4 ký tự)'
            alert('Tên đăng nhập không hợp lệ (tối thiểu 4 ký tự)')
            break
          case 'INVALID_PASSWORD':
            error.value = 'Mật khẩu không hợp lệ (tối thiểu 8 ký tự)'
            alert('Mật khẩu không hợp lệ (tối thiểu 8 ký tự)')
            break
          default:
            error.value = 'Đăng ký thất bại. Vui lòng thử lại.'
            alert('Đăng ký thất bại. Vui lòng thử lại.')
        }
      } else if (e.response.status === 400) {
        // Bad Request - có thể là validation error
        error.value = 'Thông tin đăng ký không hợp lệ. Vui lòng kiểm tra lại.'
        alert('Thông tin đăng ký không hợp lệ. Vui lòng kiểm tra lại.')
      } else if (e.response.status === 409) {
        // Conflict - user already exists
        error.value = 'Tên đăng nhập đã tồn tại'
        alert('Tên đăng nhập đã tồn tại')
      } else {
        // Fallback cho các lỗi 4xx, 5xx khác
        error.value = 'Đăng ký thất bại. Vui lòng thử lại.'
        alert('Đăng ký thất bại. Vui lòng thử lại.')
      }
    } else if (e.request) {
      // Request được gửi nhưng không có response (lỗi network)
      console.error('No response received:', e.request)
      error.value = 'Lỗi kết nối mạng. Vui lòng kiểm tra kết nối và thử lại.'
      alert('Lỗi kết nối mạng. Vui lòng kiểm tra kết nối và thử lại.')
    } else {
      // Lỗi khác
      console.error('Request setup error:', e.message)
      error.value = 'Đã xảy ra lỗi. Vui lòng thử lại.'
      alert('Đã xảy ra lỗi. Vui lòng thử lại.')
    }
  } finally {
    loading.value = false
  }
}

const handleForgotPassword = (data) => {
  console.log('Forgot Password:', data)
  switchToOTP()
}

const handleOTP = (data) => {
  console.log('OTP:', data)
  switchToResetPassword()
}

const handleResetPassword = (data) => {
  console.log('Reset Password:', data)
  router.push('/')
}
// Overlay config
const overlayConfig = computed(() => {
  switch (currentMode.value) {
    case 'signin':
      return {
        rightTitle: 'New to our platform? Sign Up now.',
        rightButtonText: 'SIGN UP',
        rightAction: switchToSignUp,
        rightMultilineText: false,
        leftAction: switchToSignIn,
        leftMultiline: false
      }
    case 'signup':
      return {
        rightAction: switchToSignUp,
        rightMultilineText: false,
        leftTitle: 'Already have Account? Sign In now.',
        leftButtonText: 'SIGN IN',
        leftAction: switchToSignIn,
        leftMultiline: false
      }
    case 'forgot':
      return {
        rightAction: switchToSignIn, 
        rightMultilineText: false,
        leftTitle: '"Your premier digital library for borrowing and reading books"',
        leftButtonText: null,
        leftAction: null,
        leftMultiline: true
      }
    case 'otp': 
      return {
        rightTitle: '"Your premier digital library for borrowing and reading books"',
        rightButtonText: null,
        rightAction: null,
        rightMultilineText: true,
        leftAction: null,
        leftMultiline: false
      }
    case 'reset':
      return {
        rightAction: switchToSignIn,
        rightMultilineText: false,
        leftTitle: '"Your premier digital library for borrowing and reading books"',
        leftButtonText: null,
        leftAction: null,
        leftMultiline: true
      }
    default:
      return {}
  }
})
</script>

<template>
  <div class="login-window">
    <!-- Background Grid -->
    <section class="background-grid">
      <span v-for="n in 2000" :key="n"></span>
    </section>

    <!-- Main Container -->
    <div class="container" :class="{ 
      'right-panel-active': currentMode === 'signup',
      'forgot-mode': currentMode === 'forgot',
      'otp-mode': currentMode === 'otp',
      'reset-mode': currentMode === 'reset'
    }">
      
      <!-- Sign Up Form Container -->
      <div class="form-container sign-up-container">
        <SignUpForm 
          v-model:firstName="signUpData.firstName"
          v-model:lastName="signUpData.lastName"
          v-model:username="signUpData.username"
          v-model:password="signUpData.password"
          v-model:contact="signUpData.contact"
          v-model:email="signUpData.email"
          @submit="handleSignUp"
        />
      </div>

      <!-- Sign In Form Container -->
      <div class="form-container sign-in-container">
        <SignInForm 
          v-model:username="signInData.username"
          v-model:password="signInData.password"
          @submit="handleSignIn"
          @forgot-password="switchToForgotPassword"
        />
      </div>

      <!-- Forgot Password Form Container -->
      <div class="form-container forgot-container">
        <ForgotPasswordForm 
          v-model:username="forgotData.username"
          @submit="handleForgotPassword"
          @back="switchToSignIn"
        />
      </div>

      <!-- OTP Form Container -->
      <div class="form-container otp-container">
        <OTPForm 
          v-model:otp="otpData.otp"
          @submit="handleOTP"
          @back="switchToForgotPassword"
        />
      </div>

      <!-- Reset Password Form Container -->
      <div class="form-container reset-container">
        <ResetPasswordForm 
          v-model:newPassword="resetData.newPassword"
          v-model:confirmPassword="resetData.confirmPassword"
          @submit="handleResetPassword"
          @back="switchToOTP"
        />
      </div>

      <!-- Overlay Container -->
      <div class="overlay-container">
        <div class="overlay">
          
          <!-- Left Overlay Panel -->
          <div class="overlay-panel overlay-left">
            <FlexibleLeftOverlay 
              :title="overlayConfig.leftTitle"
              :button-text="overlayConfig.leftButtonText"
              :use-multiline-text="overlayConfig.leftMultiline"
              @action="overlayConfig.leftAction"
            />
          </div>

          <!-- Right Overlay Panel -->
          <div class="overlay-panel overlay-right">
            <FlexibleRightOverlay 
              :title="overlayConfig.rightTitle"
              :button-text="overlayConfig.rightButtonText"
              :use-multiline-text="overlayConfig.rightMultilineText"
              @action="overlayConfig.rightAction"
            />
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* ==================== BACKGROUND GRID ==================== */
.background-grid {
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, calc(4vw - 0px));
  grid-auto-rows: calc(4vw - 0px);
  gap: 0px;
  width: 100vw;
  height: 100vh;
  z-index: 0;
}

.background-grid span {
  background: #f000;
  transition: 1.5s;
}

.background-grid span:hover {
  background: var(--vt-c-second-bg-color);
  transition: 0s;
}

/* ==================== MAIN WINDOW & CONTAINER ==================== */
.login-window {
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.container {
  background-color: var(--vt-c-main-bg-color);
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 930px;
  height: 575px;
}

/* ==================== FORM CONTAINERS ==================== */
.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  width: 50%;
  transition: all 0.6s ease-in-out;
}

/* -------------------- SIGN IN CONTAINER -------------------- */
.sign-in-container {
  left: 0;
  z-index: 2;
}

/* -------------------- SIGN UP CONTAINER -------------------- */
.sign-up-container {
  left: 0;
  opacity: 0;
  z-index: 1;
}

/* -------------------- FORGOT CONTAINER -------------------- */
.forgot-container {
  left: 0;
  opacity: 0;
  z-index: 1;
}

/* -------------------- OTP CONTAINER -------------------- */
.otp-container {
  left: 0;
  opacity: 0;
  z-index: 1;
}

/* -------------------- RESET CONTAINER -------------------- */
.reset-container {
  left: 0;
  opacity: 0;
  z-index: 1;
}
/* ==================== DOUBLE SLIDER ANIMATIONS ==================== */

/* -------------------- SIGN UP MODE -------------------- */
.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

/* -------------------- FORGOT MODE -------------------- */
.container.forgot-mode .sign-in-container {
  transform: translateX(100%);
}

.container.forgot-mode .forgot-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

/* -------------------- OTP MODE -------------------- */
.container.otp-mode .sign-in-container,
.container.otp-mode .forgot-container {
  transform: translateX(-100%);
  opacity: 0;
  z-index: 1;
}

.container.otp-mode .otp-container {
  transform: translateX(0); 
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

/* -------------------- RESET MODE -------------------- */
.container.reset-mode .sign-in-container,
.container.reset-mode .forgot-container,
.container.reset-mode .otp-container {
  transform: translateX(100%);
  opacity: 0;
  z-index: 1;
}

.container.reset-mode .reset-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

/* Reset Mode Overlay - giống Forgot */
.container.reset-mode .overlay-container {
  transform: translateX(-100%);
}

.container.reset-mode .overlay {
  transform: translateX(50%);
}

.container.reset-mode .overlay-left {
  transform: translateX(0);
}

.container.reset-mode .overlay-right {
  transform: translateX(20%);
}

/* ==================== OVERLAY SYSTEM ==================== */

/* -------------------- OVERLAY CONTAINER -------------------- */
.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container,
.container.forgot-mode .overlay-container {
  transform: translateX(-100%);
}

.container.otp-mode .overlay-container {
  transform: translateX(0); 
}

/* -------------------- OVERLAY BACKGROUND -------------------- */
.overlay {
  background: var(--vt-c-second-bg-color); 
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #FFFFFF;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay,
.container.forgot-mode .overlay {
  transform: translateX(50%);
}

.container.otp-mode .overlay {
  transform: translateX(0);
}

/* -------------------- OVERLAY PANELS -------------------- */
.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  overflow: hidden;
}

.overlay-left {
  left: 0;
  transform: translateX(-20%);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay-left,
.container.forgot-mode .overlay-left {
  transform: translateX(0);
}

.container.right-panel-active .overlay-right,
.container.forgot-mode .overlay-right {
  transform: translateX(20%);
}

/* OTP mode: chỉ hiển thị right overlay */
.container.otp-mode .overlay-left {
  opacity: 0; /* Ẩn left overlay */
  transform: translateX(-100%);
}

.container.otp-mode .overlay-right {
  transform: translateX(0); /* Hiển thị right overlay */
}

/* -------------------- OVERLAY BORDER RADIUS FIX -------------------- */
.overlay-panel :deep(.window) {
  border-radius: 0 !important;
  width: 100%;
  height: 100%;
  margin: 0;
}

/* ==================== ANIMATIONS ==================== */
@keyframes show {
  0%, 49.99% {
    opacity: 0;
    z-index: 1;
  }
  50%, 100% {
    opacity: 1;
    z-index: 5;
  }
}
</style>
