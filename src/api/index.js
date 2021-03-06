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
// 权限列表
const requestPowersList = (type) => $http(`rights/${type}`)
// 删除角色指定权限
const requestDeleteRolePower = (roleId, rightId) => $http.delete(`roles/${roleId}/rights/${rightId}`)
// 删除角色
const requestDeleteRole = (id) => $http(`roles/${id}`)
// 角色权限设置
const requestUserSetPower = ({ roleId, rids }) => {
    return $http({
        url: `roles/${roleId}/rights`,
        method: "POST",
        data: {
            rids
        }
    })
}
// 获取权限列表
const requestRightsList = () => $http("/rights/list")

// 获取商品列表
const requestGoosData = ({ query, pagenum, pagesize }) => $http({
    url: "/goods",
    params: {
        query,
        pagenum,
        pagesize
    }
})

// 商品分类数据列表
const requestGoodsClassify = () => $http({
    url: "/categories",
    params: {
        type: '',
        pagenum: '',
        pagesize: ''
    }
})
// 获取商品参数列表
const requestGoodsParameter = ({ id, sel }) => $http({
    url: `categories/${id}/attributes`,
    params: {
        sel
    }
})
// 添加商品提交
const requestGoodsSubmit = (data) => $http({
    url: "/goods",
    method: "POST",
    data
})
export {
    requestLogin, requestLeftMenus, requestUsersList, requestChangeStatus, requestSetUserInfo, requestAddUser,
    requestDeleteUser, requestRolesList, requestUserSetting, requestDeleteRolePower, requestDeleteRole, requestPowersList,
    requestUserSetPower, requestRightsList, requestGoosData, requestGoodsClassify, requestGoodsParameter, requestGoodsSubmit
}
