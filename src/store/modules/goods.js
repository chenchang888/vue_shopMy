import { requestGoosData, requestGoodsClassify, requestGoodsParameter } from "../../api/index"
import { GETGOODSDATA, GETGOODSCLASSIFY, GETGOODSPARAMETER } from "../mutations_types"
export default {
    state: {
        goods: [],
        goodsClassify: [],
        goodsparameter: []
    },
    mutations: {
        [GETGOODSDATA](state, goods) {
            state.goods = goods
        },
        [GETGOODSCLASSIFY](state, goodsclassify) {
            state.goodsClassify = goodsclassify
        },
        [GETGOODSPARAMETER](state, goodsparameter) {
            state.goodsparameter = goodsparameter
        }
    },
    actions: {
        // 获取商品列表数据
        async getGoodsData({ commit }, params) {
            const res = await requestGoosData(params)
            res.data.meta.status === 200 && commit(GETGOODSDATA, res.data.data)
        },
        // 获取商品分类数据列表
        async getGoodsClassify({ commit }, getClassify) {
            const res = await requestGoodsClassify()
            if (res.data.meta.status === 200) {
                commit(GETGOODSCLASSIFY, res.data.data)
                getClassify && getClassify()
            }
        },
        // 获取商品参数列表
        async getGoodsParameter({ commit }, params) {
            const res = await requestGoodsParameter(params)
            if (res.data.meta.status === 200) {
                commit(GETGOODSPARAMETER, res.data.data)
                console.log(params.getParameter);
                params.getParameter && params.getParameter()
            }
        }
    },
    getters: {}
}