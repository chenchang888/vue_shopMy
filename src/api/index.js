import $http from './ajax'
// 账号密码登录
const requestLogin = ({ userAccount, password }) => {
    return $http({
        url: "/login",
        method: "POST",
        data: {
            username: userAccount,
            password: password
        }
    })
}
// 获取左侧导航菜单
const requestLeftMenus = () => {
    return $http("/menus")
}
export { requestLogin, requestLeftMenus }
