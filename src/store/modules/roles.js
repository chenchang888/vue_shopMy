import { requestPowersList } from "../../api/index"
import { GETPOWERLIST } from "../mutations_types"
export default {
    state: {
        powersList: []
    },
    mutations: {
        [GETPOWERLIST](state, powersList) {
            state.powersList = powersList
        }
    },
    actions: {
        // 获取权限列表
        async getPowerList({ commit }, getPowerList) {
            const res = await requestPowersList('tree')
            console.log(res);
            console.log(commit);
            commit(GETPOWERLIST, res.data.data)
            getPowerList && getPowerList()
        }

    },
    getters: {}
}