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
const requestLeftMenus = () => $http("/menus")

// users 获取用户列表
const requestUsersList = (params) => $http({
    url: "/users",
    params
})
// 添加用户
const requestAddUser = (data) => $http({
    url: "/users",
    method: "POST",
    data
})

// 修改用户状态
const requestChangeStatus = ({ id, status }) => $http.put(`users/${id}/state/${status}`)
// 编辑用户信息
const requestSetUserInfo = ({ id, email, mobile }) => $http({
    url: "/users/" + id + "",
    method: "PUT",
    data: {
        email,
        mobile
    }
})
// 删除当前用户
const requestDeleteUser = (id) => $http.delete(`/users/${id}`)
// 获取角色列表
const requestRolesList = () => $http("/roles")
// 提交角色分配
const requestUserSetting = ({ id, rid }) => $http({
    url: "/users/" + id + "/role",
    method: "PUT",
    data: {
        rid
    }
})


export {
    requestLogin, requestLeftMenus, requestUsersList, requestChangeStatus, requestSetUserInfo, requestAddUser,
    requestDeleteUser, requestRolesList, requestUserSetting
}