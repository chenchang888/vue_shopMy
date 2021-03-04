import { requestRightsList } from "../../api/index"
import { GETRIGHTSLIST } from "../mutations_types"
export default {
    state: {
        rights: []
    },
    mutations: {
        [GETRIGHTSLIST](state, rights) {
            state.rights = rights
        }
    },
    actions: {
        // 获取权限类表
        async getRightsList({ commit }) {
            const res = await requestRightsList()
            if (res.data.meta.status === 200) {
                commit(GETRIGHTSLIST, res.data.data)
            }
        }
    }
}