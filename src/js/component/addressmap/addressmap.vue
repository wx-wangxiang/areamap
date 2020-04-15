<template>
  <div style="width:700px;display:inline-block;">
    <section class="area-box">
      <section class="area-box-content">
        <div class="area-box-title">
          <span>省，直辖市，地区</span>
          <a href="javascript:;">
            <i class="iconfont icon-china"></i>
          </a>
        </div>
        <div class="area-box-body">
          <div class="area-box-item" v-for="(item) in province" :key="item.Name">
            <div
              class="ct-checkbox-wrapper"
              :class="{'ct-checkbox-on': item.Name === currName.province}"
            >
              <label
                class="ct-checkbox"
                @click="selected('province', item)"
                :class="{'ct-checkbox-checked': (item.state === 1 || item.state === 3), 'ct-checkbox-indeterminate': item.state === 2}"
              >
                <span class="ct-checkbox-inner"></span>
                <input type="checkbox" class="ct-checkbox-input" value="on" />
              </label>
              <span @click="change('province',item.Name)">{{item.Name}}</span>
            </div>
          </div>
        </div>
      </section>
      <section class="area-box-content">
        <div class="area-box-title">
          <span>当前省下的所有市</span>
          <a href="javascript:;">
            <i class="iconfont icon-city"></i>
          </a>
        </div>
        <div class="area-box-body">
          <div class="area-box-item" v-for="(item) in city" :key="item.Name">
            <div
              class="ct-checkbox-wrapper"
              :class="{'ct-checkbox-on' : item.Name === currName.city}"
            >
              <span
                class="ct-checkbox"
                @click="selected('city', item)"
                :class="{'ct-checkbox-checked': (item.state === 1 || item.state === 3), 'ct-checkbox-indeterminate': item.state === 2}"
              >
                <span class="ct-checkbox-inner"></span>
                <input type="checkbox" class="ct-checkbox-input" value="on" />
              </span>
              <span @click="change('city',item.Name)">{{item.Name}}</span>
            </div>
          </div>
        </div>
      </section>
      <section class="area-box-content">
        <div class="area-box-title">
          <span>当前市下的所有县</span>
          <a href="javascript:;">
            <i class="iconfont icon-quyudaili"></i>
          </a>
        </div>
        <div class="area-box-body">
          <div class="area-box-item" v-for="item in region" :key="item.Name">
            <div class="ct-checkbox-wrapper">
              <span
                class="ct-checkbox"
                @click="selected('region', item)"
                :class="{'ct-checkbox-checked': (item.state === 1 || item.state === 3), 'ct-checkbox-indeterminate': item.state === 2}"
              >
                <span class="ct-checkbox-inner"></span>
                <input type="checkbox" class="ct-checkbox-input" value="on" />
              </span>
              <span @click="change('region',item.Name)">{{item.Name}}</span>
            </div>
          </div>
        </div>
      </section>
      <section class="area-box-content">
        <div class="area-box-title">
          <span>已选择地区</span>
          <a class="edit-button" href="javascript:;">
            <i class="iconfont icon-china"></i>
          </a>
        </div>
        <div>
          <ul class="ct-select-selection__rendered">
            <li
              unselectable="unselectable"
              class="ct-select-selection__choice"
              style="user-select: none;"
              v-for="item in selectedArea"
							:key="item.Name"
            >
              <span class="ct-select-selection__choice__remove" @click="clear(item)"></span>
              <span class="ct-select-selection__choice__content">{{item.Name}}</span>
            </li>
          </ul>
        </div>
      </section>
    </section>
  </div>
</template>
<script type="text/javascript">
//import areaData from './area'; //导入全国的地区数据

let area = {};

//新增方法，深拷贝 20170704 @wangxiang
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
//根据传入的地区的ID来获取其Name值，也就是说，给组件传入的数据的Name属性可以为空

function getObject(obj, key, value) {
  //返回数据
  let i,
    j,
    result = "";

  if ($.isArray(obj)) {
    for (i = 0; i < obj.length; i++) {
      if (obj[i][key] === value) {
        return obj[i];
      }
    }
  } else {
    for (let r in obj) {
      if ($.isArray(obj[r])) {
        for (j = 0; j < obj[r].length; j++) {
          if (obj[r][j][key] === value) {
            return obj[r][j];
          }
        }
      }
    }
  }

  return result;
}

function changeAllState(pobj, cobj) {
  //robjCount 和 pobjCount 主要是用来判断省和市的全选和半选
  //如果robjCount 和 pobjCount 等于其下面的子项的长度，则是全选，否则是半选
  var robjCount = 0;
  var pobjCount = 0;
  //改变市状态
  if (area.region[cobj.Name]) {
    $.each(area.region[cobj.Name], function(index, value) {
      if (value.state === 1) {
        robjCount += 1;
      }
      if (robjCount === area.region[cobj.Name].length) {
        cobj.state = 1;
      }
    });
  }
  //改变省状态
  if (area.city[pobj.Name]) {
    $.each(area.city[pobj.Name], function(index, value) {
      if (value.state === 1) {
        pobjCount += 1;
      }
      if (pobjCount === area.city[pobj.Name].length) {
        pobj.state = 1;
      }
    });
  }
}

function setData(value) {
  //state 0 1
  var len, pName, cName, pID, cID, rID;
  len = value.ID.length;
  if (len === 2) {
    setData1(value.ID);
  }
  if (len === 4) {
    pID = value.ID.substring(0, 2);
    cID = value.ID;
    setData2(pID, cID, value);
  }
  if (len === 6) {
    pID = value.ID.substring(0, 2);
    cID = value.ID.substring(0, 4);
    rID = value.ID;
    setData3(pID, cID, value);
  }
}

function setDataCity(obj) {
  var s, arr, i, state;
  state = obj.state;
  s = state === 1 ? 3 : 0;
  arr = area.city[obj.Name];
  for (i = 0; i < arr.length; i++) {
    arr[i].state = s;
  }
}

function setDataRegion(obj) {
  var s, arr, arr2, i, j, state;
  state = obj.state;
  s = state === 1 ? 3 : 0;
  arr = area.city[obj.Name];
  for (i = 0; i < arr.length; i++) {
    arr2 = area.region[arr[i].Name];
    for (j = 0; j < arr2.length; j++) {
      arr2[j].state = s;
    }
  }
}

function setDataRegion2(obj) {
  var s, arr, arr2, i, j, state;
  state = obj.state;
  s = state === 1 ? 3 : 0;
  arr = area.region[obj.Name];
  for (i = 0; i < arr.length; i++) {
    arr[i].state = s;
  }
}

function setData1(id) {
  var obj = getObject(area.province, "ID", id);
  setDataCity(obj);
  setDataRegion(obj);
}

function setData2(pID, cID, value) {
  var s, arr, arr2, i, j, state;
  var obj = getObject(area.province, "ID", pID);
  var obj2 = getObject(area.city, "ID", cID);
  setDataRegion2(obj2);
  state = typeStateChange("city", obj.Name);
  obj.state = state;
}

function setData3(pID, cID, value) {
  var s, arr, arr2, i, j, state, state2;
  var obj = getObject(area.province, "ID", pID);
  var obj2 = getObject(area.city, "ID", cID);

  state = typeStateChange("region", obj2.Name);
  obj2.state = state;
  state2 = typeStateChange("city", obj.Name);
  obj.state = state2;
}

function typeStateChange(type, name) {
  //name上一级名称
  var s,
    arr,
    arr2,
    i,
    j,
    state = 0,
    len,
    stateNum;
  arr = area[type][name];
  len = arr.length;
  stateNum = 0;

  for (i = 0; i < len; i++) {
    if (arr[i].state === 1 || arr[i].state === 3) {
      stateNum += 1;
    }
    if (arr[i].state === 2) {
      stateNum += 0.5;
    }
  }

  if (len === stateNum) {
    for (i = 0; i < len; i++) {
      arr[i].state = 3;
    }
    state = 1;
  }
  if (stateNum === 0) {
    for (i = 0; i < len; i++) {
      arr[i].state = 0;
    }
    state = 0;
  } else {
    if (stateNum < len) {
      for (i = 0; i < len; i++) {
        if (arr[i].state === 3) {
          arr[i].state = 1;
        }
      }
      state = 2;
    }
  }
  return state;
}

export default {
  props: {
    area: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      province: [], //当前的省
      city: [], //当前的市
      region: [],
      currName: {
        province: "",
        city: "",
        region: ""
      },
      selectedArea: []
    };
  },
  methods: {
    /**
     * 初始化
     * @param  {Array} a 全国的地区数据
     * @param  {Array} data    初始化时默认选中的地区
     */
    init(a, data) {
      if (!a) {
        return;
      }

      area = $.extend({}, a);
      this.dataInit(data);
      this.province = area.province;
    },
    dataInit(data) {
      let i;
      if (!$.isArray(data)) {
        console.log("no []");
        return;
      }
      for (i = 0; i < data.length; i++) {
        this.setDateInit(data[i]);
      }
      console.log("dataInit");
      //20170703 修改:重要改动，该改动使得chearAll方法真正起作用，因为clearAll方法中需要用到init前的selectedArea；
      //this.selectedArea = data; //旧代码
      this.selectedArea = deepClone(data); //新代码 20170703
      this.$emit("selected", deepClone(this.selectedArea));
    },
    setDateInit(data) {
      let len = data.ID.length,
        pID,
        cID,
        rID,
        n,
        pobj,
        cobj,
        robj;
      if (len === 6) {
        if (data.ID.substring(4, 6) === "00") {
          len = 4;
          data.ID = data.ID.substring(0, 4);
        }
      }
      if (len === 2) {
        pID = data.ID;
        pobj = getObject(area.province, "ID", pID);
        pobj.state = 1;
        //当未传Name属性值的时候，自动赋值
        if (!data.Name) {
          data.Name = pobj.Name;
        }

        $.each(area.city[data.Name], function(index, value) {
          value.state = 3;
        });
        for (n in area.city[data.Name]) {
          $.each(area.region[area.city[data.Name][n].Name], function(
            index,
            value
          ) {
            value.state = 3;
          });
        }
      }
      if (len === 4) {
        pID = data.ID.substring(0, 2);
        cID = data.ID;
        pobj = getObject(area.province, "ID", pID);
        cobj = getObject(area.city, "ID", cID);
        pobj.state = 2;
        cobj.state = 1;

        //当未传Name属性值的时候，自动赋值
        if (!data.Name) {
          data.Name = cobj.Name;
        }
        if (area.region[data.Name]) {
          $.each(area.region[data.Name], function(index, value) {
            value.state = 3;
          });
        }
        changeAllState(pobj, cobj);
      }
      if (len === 6) {
        pID = data.ID.substring(0, 2);
        cID = data.ID.substring(0, 4);
        rID = data.ID;
        pobj = getObject(area.province, "ID", pID);
        cobj = getObject(area.city, "ID", cID);
        robj = getObject(area.region, "ID", rID);
        //当未传Name属性值的时候，自动赋值
        if (robj) {
          data.Name = robj.Name;
        } else if (cobj) {
          data.Name = cobj.Name;
        } else {
          data.Name = pobj.Name;
        }
        pobj.state = 2;
        cobj.state = 2;
        robj.state = 1;
        changeAllState(pobj, cobj);
      }
    },
    selected(type, el) {
      let value = {
        ID: el.ID,
        Name: el.Name
      };

      this.changeState(type, value);
      this.getResultArea();
      this.$emit("selected", deepClone(this.selectedArea));
    },
    changeState(type, value) {
      // 0,1,2,3 无 选中 半选 被动选中
      var obj = getObject(area[type], "ID", value.ID);

      if (!obj) {
        return;
      }
      if (obj.state === 1 || obj.state === 2 || obj.state === 3) {
        obj.state = 0;
      } else {
        obj.state = 1;
      }
      setData(value);
      //因为在setData方法中，给选中的对象新添加了state属性，不能触发视图更新；所以就采用数组的非变异方法filter来返回数组，从而可以触发视图更新
      this["province"] = area["province"].filter(function(item) {
        return item;
      });
      this["city"] = area.city[this.currName.province] || [];
      this["region"] = area.region[this.currName.city] || [];
    },
    getResultArea() {
      var arr = [];
      $.each(area.province, function(index, value) {
        if (value.state === 1) {
          arr.push(value);
        }
      });
      for (let n in area.city) {
        if (area.city[n]) {
          $.each(area.city[n], function(index, value) {
            if (value.state === 1) {
              arr.push(value);
            }
          });
        }
      }
      for (let n in area.region) {
        if (area.region[n]) {
          $.each(area.region[n], function(index, value) {
            if (value.state === 1) {
              arr.push(value);
            }
          });
        }
      }
      this.selectedArea = arr;
    },
    change(type, name) {
      this["currName"][type] = name;
      if (type === "province") {
        this.city = area["city"][name];
        this.currName.city = "";
        this.region = [];
      }
      if (type === "city") {
        this.region = area["region"][name];
      }
    },
    clear(el) {
      var len = el.ID.length;
      if (len === 2) {
        this.selected("province", el);
      }
      if (len === 4) {
        this.selected("city", el);
      }
      if (len === 6) {
        this.selected("region", el);
      }
    },
    //20170421新增了clearAll函数
    //用于解决bug：当再一次向组件赋值area（已选择地区）的时候，组件中前一次
    //已选择的地区的样式不会清空
    //该函数的作用：将上一次的selectedArea里的对象的选择状态都置为未选择
    clearAll() {
      let _this = this;
      console.log(deepClone(this.selectedArea));
      this.selectedArea.map(function(item, index) {
        var value = {
          ID: item.ID,
          Name: item.Name
        };

        switch (value.ID.length) {
          case 2:
            _this.changeState("province", value);
            break;
          case 4:
            _this.changeState("city", value);
            break;
          case 6:
            _this.changeState("region", value);
            break;
          default:
            "";
        }
      });
      this.selectedArea = [];
    },
    getArea: function() {
      var data = getResultArea_All();
    }
  },
  watch: {
    area: {
      handler(newVal) {
        console.log("init");
        console.log(deepClone(this.selectedArea));
        this.clearAll();
        this.init(AREA, newVal);
      },
      deep: true
    }
  },
  mounted() {
    this.init(AREA, this.area);
  }
};
</script>
<style lang="css" scoped>
@import "area.css";
</style>
