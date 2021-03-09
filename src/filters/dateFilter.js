import Vue from "vue"
const dateFilter = Vue.filter("dateFilter", (val) => {
    const dt = new Date(val)
    const Y = dt.getFullYear()
    const M = (dt.getMonth() + 1 + '').padStart(2, 0)
    const D = (dt.getDate() + '').padStart(2, 0)
    const HH = (dt.getHours() + '').padStart(2, 0)
    const MM = (dt.getMinutes() + '').padStart(2, 0)
    const SS = (dt.getSeconds() + '').padStart(2, 0)
    return Y + '-' + M + '-' + D + ' ' + HH + ":" + MM + ":" + SS
})
export default dateFilter
