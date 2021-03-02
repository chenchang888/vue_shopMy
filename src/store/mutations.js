import { GETLEFTMENUS, GETROLESLIST } from "./mutations_types"
export default {
    // 左侧导航
    [GETLEFTMENUS](state, leftMenus) {
        state.leftMenus = leftMenus
    },
    // 角色权限信息列表
    [GETROLESLIST](state, rolesList){
        state.rolesList = rolesList
    }
}