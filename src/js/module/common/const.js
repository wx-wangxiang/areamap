/**
 * @author rubyisapm
 */
var constConfig={
    data: {
        reportType: [
            {
                key:1,
                val:'下载'
            },{
                key:2,
                val:'安装'
            }
        ]
    },
    getter: {
        getValByKey(col, key){
            var data = constConfig.data[col];
            var matchedItem = data.filter((item)=> {
                return item.key === key;
            });
            return matchedItem[0].val;
        },
        getKeyByVal(col,val){
            var data = constConfig.data[col];
            var matchedItem = data.filter((item)=> {
                return item.val === val;
            });
            return matchedItem[0].key;
        },
        getListConfig(col){
            var data = constConfig.data[col];
            var config = {};
            data.map((item)=> {
                config[item.key] = {
                    text: item.val
                };
                if (typeof item.color !== 'undefined') {
                    config[item.key].className = item.color;
                }
            });
            return config;
        }
    }
};
export default constConfig;


