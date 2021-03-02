import { requestLeftMenus, requestRolesList } from "../api/index"
import { GETLEFTMENUS, GETROLESLIST } from "./mutations_types"
export default {
    // 左侧导航
    async getLeftMenus({ commit }) {
        const res = await requestLeftMenus()
        res.data.meta.status === 200 && commit(GETLEFTMENUS, res.data.data)
    },
    // 获取角色权限信息列表
    async getRolesList({ commit }, handleRoles) {
        const res = await requestRolesList()
        if (res.data.meta.status === 200) {
            commit(GETROLESLIST, res.data.data)
            handleRoles && handleRoles()
        }
    }
}
