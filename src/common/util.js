/**
 * 公共方法
 */
exports.install = function (Vue,options){
    var _this=Vue.prototype;
    var Common=Vue.prototype.$common={};
    
    /**
     * 在新页面打开
     * @param {*} $this
     * @param {*} routeName
     * @param {*} param 参数对象，对象格式
     */
    Common.OpenNewPage=function($this,routePath,param){
        let routeData=$this.$router.resolve({
            path:routePath,
            query:param
        });
        window.open(routeData.href,'_blank');
    };
    Common.timestampToTime =function(row, column) {
          var date = row[column.property];
          if (date == undefined) {
             return "";
          }
          return moment(date).format("YYYY-MM-DD HH:mm:ss");
    }
};
