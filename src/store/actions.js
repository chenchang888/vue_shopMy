import { requestLeftMenus } from "../api/index"
import { GETLEFTMENUS } from "./mutations_types"
export default {
    // 左侧导航
    async getLeftMenus({ commit }) {
        const res = await requestLeftMenus()
        console.log(res);
        res.data.meta.status === 200 && commit(GETLEFTMENUS, res.data.data)
    }
}
