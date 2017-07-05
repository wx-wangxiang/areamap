import utility from 'ct-utility';
function getEnv(){
    var env='';
    var port=location.port;
    var tdl=location.host.split('.').slice(-1)[0];
    if(port==='8080'){
        env='debug';
    }else if (tdl==='org' && port === '1505') {
        env='test';
    } else {
        env='official';
    }
    return env;
}
var base={
    common: {
        api1: '',
        api2: '/api/api2'
    },
    patchList: {
        api3:'/api/api3'
    },
    patchMonitor: {
        api4:'/api/api4'
    },
    singlePackage: {
        api5:'/api/api5'
    }
};
var Interface = {
    debug:utility.base.extend(true,base,{
        common:{
            api1:'/api/api1'
        }
    }),
    test:utility.base.extend(true,base,{
        common:{
            api1:'/api/api11'
        }
    }),
    official:utility.base.extend(true,base,{
        official:{
            api1:'/api/api111'
        }
    })
};
var env=getEnv();
export default Interface[env];