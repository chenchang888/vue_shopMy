import { requestUsersList } from "../../api/index"
import { GETUSERLIST } from "../mutations_types"
export default {
    state: {
        // 用户列表
        usersList: [],
        // 总页数
        total: 0
    },
    mutations: {
        [GETUSERLIST](state, usersList) {
            state.usersList = usersList.users
            state.total = usersList.total
        }
    },
    actions: {
        // 获取用户列表
        async getuserlist({ commit }, { usersParams, getuserlist }) {
            const res = await requestUsersList(usersParams)
            if (res.data.meta.status === 200) {
                commit(GETUSERLIST, res.data.data)
                getuserlist && getuserlist()
            }
        }
    },
    getters: {},
}