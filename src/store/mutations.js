import { GETLEFTMENUS } from "./mutations_types"
export default {
    // 左侧导航
    [GETLEFTMENUS](state, leftMenus) {
        state.leftMenus = leftMenus
    }
}