<template>
	<div>
	  	<addressmap :area="area" @selected="selected"></addressmap>
	  	<div style="display: inline-block; position: absolute; top: 100px;">
	  		<h3>测试按钮</h3>
	  		<button class="btn btn-primary btn-sm" type="button" @click="init">init</button>
	  		<button class="btn btn-success btn-sm" type="button" @click="addArea">add</button>
	  		<button class="btn btn-danger btn-sm" type="button" @click="removeArea">remove</button>
	  	</div>
	  </div>
</template>
<script type="text/javascript">
	import addressmap from 'addressmap';

	export default{
		data() {
			return {
				area: [
					{"Name": '北京', "ID": '01'}
				],
				selectedArea: []
			}
		},
		components: { addressmap },
		methods: {
			selected(val) {
				this.selectedArea = val;
				console.log(JSON.parse(JSON.stringify(val)));
			},
			init() {
				this.area = [{
					"Name": '北京', "ID": '01'
				}]
			},
			verify(data) {
				let flag = true;

				for (let item of this.area) {
					if (item.ID === data.ID) {
						flag = false;
						break;
					}
				}
				return flag;
			},
			getID() {
				const len = this.selectedArea.length + 1;

				if (len < 10) {
					return `0${len}`;
				} else if (len > 34) {
					alert('别点了！！！超出了');
					return false;
				}
				return '' + len;
			},
			addArea() {
				//this.area.push({"Name": '江苏', "ID": '04'});
				const ID = this.getID();

				this.area = this.selectedArea;
				if (ID) {
					if (this.verify({ID})) {
						this.area.push({ID});
					} else {
						alert('请不要重复添加');
					}
				}
			},
			removeArea() {
				const len = this.selectedArea.length;
				console.log(len);

				this.selectedArea.splice(len - 1, 1);
				this.area = this.selectedArea;
			}
		}
	}
</script>
