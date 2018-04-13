const userInfoKey = 'user-info'

// 保存登录用户信息到本地存储

export function saveUserInfo (userInfo = {}) {
  window.localStorage.setItem(userInfoKey, JSON.stringify(userInfo))
}

// 从本地存储中获取当前登录用户信息
export function getUserInfo () {
  return window.localStorage.getItem(userInfoKey)
}

// 获取本地存储中用户的Token令牌
export function getToken () {
  return JSON.parse(getUserInfo()).token
}

// 删除本地存储中的用户登录信息
export function removeUserInfo () {
  window.localStorage.removeItem(userInfoKey)
}
