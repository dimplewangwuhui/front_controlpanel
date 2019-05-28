<template>
  <div class="main" style="margin: 10px auto">
    <el-form  :inline="true" ref="formSearch" :model="formSearch" class="demo-form">
      <el-form-item label="" prop="site">
        <el-select class="select-form" v-model="formSearch.site" clearable placeholder="请选择网站">
          <el-option label="安居客" value="安居客"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="city">
        <el-select class="select-form" v-model="formSearch.city" clearable placeholder="请选择城市">
          <el-option-group v-for="group in optionsAll" :key="group.label" :label="group.label">
            <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-option-group>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="region">
        <el-cascader
          class="cascader-form"
          ref="cascaderRegion"
          clearable
          :options="regionOptions"
          :show-all-levels="false"
          placeholder="请选择区域">
        </el-cascader>
      </el-form-item>
      <el-form-item label="" v-show="isMore===true">
        <el-select class="select-form" v-model="formSearch.rentway" clearable placeholder="请选择类型">
          <el-option v-for="item in rentwayOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" v-show="isMore===true">
        <el-select class="select-form" v-model="formSearch.room" clearable placeholder="请选择户型">
          <el-option v-for="item in roomOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" v-show="isMore===true">
        <el-select class="select-form" v-model="formSearch.direction" clearable placeholder="请选择朝向">
          <el-option v-for="item in directionOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" v-show="isMore===true">
        <el-select class="select-form" v-model="formSearch.price" clearable placeholder="请选择租金">
          <el-option v-for="item in priceOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="有电梯" v-show="isMore===true">
        <el-switch v-model="formSearch.lift"></el-switch>
      </el-form-item>
      <el-form-item label="近地铁" v-show="isMore===true">
        <el-switch v-model="formSearch.subway"></el-switch>
      </el-form-item>
      <div>
        <el-form-item label="">
          <el-button type="primary" size="small" @click="isMore=!isMore">更多条件</el-button>
          <el-button type="primary" size="small" @click="getHouse" style="height: 32px">查询</el-button>
          <el-button type="warning" size="small" plain @click="onReset">重置</el-button>
        </el-form-item>
      </div>
      <hr style="height:1px;border:none;border-top:1px dashed rgba(0, 0, 0, .05);" />
      <el-form-item label="操作">
        <el-button size="small" @click="add">添加</el-button>
        <el-button size="small" @click="removes">批量删除</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="tableData1.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)"
      ref="table"
      border
      tooltip-effect="light"
      v-loading="loading"
      element-loading-text="拼命加载中..."
      :highlight-current-row="true"
      :header-cell-style="{color: '#000', backgroundColor: '#DDE2EF'}"
      @selection-change="handleSelectionChange">
      <el-table-column fixed="left" type="selection" align="center" width="50">
      </el-table-column>
      <el-table-column prop="id" label="ID" sortable align="center" width="60">
      </el-table-column>
      <el-table-column prop="site" label="网站" align="center" width="120">
      </el-table-column>
      <el-table-column prop="title" label="标题" show-overflow-tooltip align="center" width="200">
      </el-table-column>
      <el-table-column prop="room" label="户型"  align="center" width="120">
      </el-table-column>
      <el-table-column prop="area" label="面积" sortable align="center" width="120">
      </el-table-column>
      <el-table-column prop="floor" label="楼层" sortable align="center" width="120">
      </el-table-column>
      <el-table-column prop="username" label="中介" align="center" width="120">
      </el-table-column>
      <el-table-column prop="city" label="城市" align="center" width="120">
      </el-table-column>
      <el-table-column prop="region" label="区域" align="center" width="120">
      </el-table-column>
      <el-table-column prop="address" label="地址" show-overflow-tooltip align="center" width="200">
      </el-table-column>
      <el-table-column prop="rentway" label="租赁方式" align="center" width="120">
      </el-table-column>
      <el-table-column prop="direction" label="朝向"  align="center" width="120">
      </el-table-column>
      <el-table-column prop="lift" label="电梯" align="center" width="150">
      </el-table-column>
      <el-table-column prop="subway" label="地铁" show-overflow-tooltip align="center" width="150">
      </el-table-column>
      <el-table-column prop="price" label="租金" sortable align="center" width="120">
      </el-table-column>
      <el-table-column prop="imgURL" label="图片链接" show-overflow-tooltip align="center" width="150">
      </el-table-column>
      <el-table-column prop="urlinfo" label="详情链接" show-overflow-tooltip align="center" width="160">
      </el-table-column>
      <el-table-column prop="create_date" label="创建时间" show-overflow-tooltip align="center" width="160">
      </el-table-column>
      <el-table-column prop="update_date" label="更新时间" show-overflow-tooltip align="center" width="160">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="250" align="center">
        <template slot-scope="scope" v-if= "scope.row.id">
          <el-tooltip content="详情" placement="top">
            <el-button type="primary" size="mini" icon="el-icon-more" @click="handleClick(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip content="收藏" placement="top">
            <el-button type="success" size="mini" @click="focus(scope.row)"><i class="iconfont icon-chakantieziguanzhu" style="padding-right: 0"></i></el-button>
          </el-tooltip>
          <el-tooltip content="编辑" placement="top">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(scope.row,scope.$index)"></el-button>
          </el-tooltip>
          <el-tooltip content="删除" placement="top">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="remove(scope.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagelist" style="margin-top: 20px; margin-bottom: 50px; text-align: center">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :current-page="pageIndex"
        :page-sizes="[10,20,30,40,50,100]"
        :page-size="pageSize"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>

    <el-dialog title="编辑" :visible.sync="editVisible">
      <el-form :model="editForm" :rules="Rules" ref="editForm" status-icon label-width="130px" label-position="right" style="margin: 0 auto;">
        <el-form-item label="序号:" prop="id">
          <el-input disabled v-model="editForm.id" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="网站:" prop="site">
          <el-input v-model="editForm.site" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="标题:" prop="title">
          <el-input v-model="editForm.title" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="户型:" prop="room">
          <el-input v-model="editForm.room" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="面积(平米):" prop="area">
          <el-input v-model="editForm.area" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="楼层:" prop="floor">
          <el-input v-model="editForm.floor" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="中介:" prop="username">
          <el-input v-model="editForm.username" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="城市:" prop="city">
          <el-input v-model="editForm.city" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="区域:" prop="region">
          <el-input v-model="editForm.region" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="地址:" prop="address">
          <el-input v-model="editForm.address" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="租赁方式:" prop="rentway">
          <el-input v-model="editForm.rentway" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="朝向:" prop="direction">
          <el-input v-model="editForm.direction" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="电梯:" prop="lift">
          <el-input v-model="editForm.lift" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="地铁:" prop="subway">
          <el-input v-model="editForm.subway" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="租金(元/月):" prop="price">
          <el-input v-model.number="editForm.price" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="图片链接:" prop="imgURL">
          <el-input v-model="editForm.imgURL" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="详情链接:" prop="urlinfo">
          <el-input v-model="editForm.urlinfo" style="width: 80%"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加" :visible.sync="addVisible">
      <el-form :model="addForm" :rules="Rules" ref="addForm" status-icon label-width="130px" label-position="right" style="margin: 0 auto;">
        <el-form-item label="网站:" prop="site">
          <el-input v-model="addForm.site" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="标题:" prop="title">
          <el-input v-model="addForm.title" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="户型:" prop="room">
          <el-input v-model="addForm.room" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="面积(平米):" prop="area">
          <el-input v-model="addForm.area" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="楼层:" prop="floor">
          <el-input v-model="addForm.floor" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="中介:" prop="username">
          <el-input v-model="addForm.username" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="城市:" prop="city">
          <el-input v-model="addForm.city" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="区域:" prop="region">
          <el-input v-model="addForm.region" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="地址:" prop="address">
          <el-input v-model="addForm.address" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="租赁方式:" prop="rentway">
          <el-input v-model="addForm.rentway" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="朝向:" prop="direction">
          <el-input v-model="addForm.direction" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="电梯:" prop="direction">
          <el-input v-model="addForm.lift" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="地铁:" prop="subway">
          <el-input v-model="addForm.subway" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="租金(元/月):" prop="price">
          <el-input v-model.number="addForm.price" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="图片链接:" prop="direction">
          <el-input v-model="addForm.imgURL" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="详情链接:" prop="urlinfo">
          <el-input v-model="addForm.urlinfo" style="width: 80%"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import api from "../../../api/api";

  export default {
    name: "house_ajk",
    data() {
      let checkPrice = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入租金'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {     //Number.isInteger(value): 判断给定值是否是整数的 Boolean 值。
            console.log(typeof value);
            callback(new Error('请输入数字值'));
          } else {
            if (value < 0) {
              callback(new Error('请输入大于0的值'));
            } else {
              callback();
            }
          }
        }, 0);
      };
      return {
        tableData1: [],
        pageIndex: 1,
        pageSize: 20,
        total: 0,
        currentId:'',
        loading: true,
        isMore: false,
        multipleSelection: [], // 当前页选中的行

        optionsAll: [{
          label: '热门城市',
          options: [{value: '北京市', label: '北京市'},
            {value: '上海市', label: '上海市'}]
          },{
          label: '其他城市',
          options: [{value: '广州市', label: '广州市'},
            {value: '深圳市', label: '深圳市'},
            {value: '武汉市', label: '武汉市'},
            {value: '太原市', label: '太原市'},
            {value: '杭州市', label: '杭州市'}]
        }],
        regionOptions: [{
          label: '北京市',
          value: '北京市',
          children: [{value: '东城区', label: '东城区'},
            {value: '西城区', label: '西城区'},
            {value: '朝阳区', label: '朝阳区'},
            {value: '丰台区', label: '丰台区'},
            {value: '海淀区', label: '海淀区'},
            {value: '石景山区', label: '石景山区'},
            {value: '顺义区', label: '顺义区'},
            {value: '通州区', label: '通州区'},
            {value: '大兴区', label: '大兴区'},
            {value: '房山区', label: '房山区'},
            {value: '门头沟区', label: '门头沟区'},
            {value: '昌平区', label: '昌平区'},
            {value: '平谷区', label: '平谷区'},
            {value: '密云区', label: '密云区'},
            {value: '怀柔区', label: '怀柔区'},
            {value: '延庆区', label: '延庆区'}]
        }, {
          label: '上海市',
          value: '上海市',
          children: [{value: '黄浦区', label: '黄浦区'},
            {value: '徐汇区', label: '徐汇区'},
            {value: '长宁区', label: '长宁区'},
            {value: '静安区', label: '静安区'},
            {value: '普陀区', label: '普陀区'},
            {value: '虹口区', label: '虹口区'},
            {value: '杨浦区', label: '杨浦区'},
            {value: '闵安区', label: '闵安区'},
            {value: '宝山区', label: '宝山区'},
            {value: '嘉定区', label: '嘉定区'},
            {value: '浦东新区', label: '浦东新区'},
            {value: '金山区', label: '金山区'},
            {value: '松江区', label: '松江区'},
            {value: '青浦区', label: '青浦区'},
            {value: '奉贤区', label: '奉贤区'}]
        }, {
          label: '广州市',
          value: '广州市',
          children: [{value: '荔湾区', label: '荔湾区'},
            {value: '越秀区', label: '越秀区'},
            {value: '海珠区', label: '海珠区'},
            {value: '天河区', label: '天河区'},
            {value: '白云区', label: '白云区'},
            {value: '黄埔区', label: '黄埔区'},
            {value: '番禺区', label: '番禺区'},
            {value: '花都区', label: '花都区'},
            {value: '南沙区', label: '南沙区'},
            {value: '从化区', label: '从化区'},
            {value: '增城区', label: '增城区'}]
        }, {
          label: '深圳市',
          value: '深圳市',
          children: [{value: '罗湖区', label: '罗湖区'},
            {value: '福田区', label: '福田区'},
            {value: '南山区', label: '南山区'},
            {value: '宝安区', label: '宝安区'},
            {value: '龙岗区', label: '龙岗区'},
            {value: '盐田区', label: '盐田区'}]
        }, {
          label: '武汉市',
          value: '武汉市',
          children: [{value: '江岸区', label: '江岸区'},
            {value: '江汉区', label: '江汉区'},
            {value: '硚口区', label: '硚口区'},
            {value: '汉阳区', label: '汉阳区'},
            {value: '武昌区', label: '武昌区'},
            {value: '青山区', label: '青山区'},
            {value: '洪山区', label: '洪山区'},
            {value: '东西湖区', label: '东西湖区'},
            {value: '汉南区', label: '汉南区'},
            {value: '蔡甸区', label: '蔡甸区'},
            {value: '江夏区', label: '江夏区'},
            {value: '黄陂区', label: '黄陂区'},
            {value: '新洲区', label: '新洲区'}]
        }, {
          label: '太原市',
          value: '太原市',
          children: [{value: '小店区', label: '小店区'},
            {value: '迎泽区', label: '迎泽区'},
            {value: '杏花岭区', label: '杏花岭区'},
            {value: '尖草坪区', label: '尖草坪区'},
            {value: '万柏林区', label: '万柏林区'},
            {value: '晋源区', label: '晋源区'}]
        }, {
          label: '杭州市',
          value: '杭州市',
          children: [{value: '上城区', label: '上城区'},
            {value: '下城区', label: '下城区'},
            {value: '江干区', label: '江干区'},
            {value: '拱墅区', label: '拱墅区'},
            {value: '西湖区', label: '西湖区'},
            {value: '滨江区', label: '滨江区'},
            {value: '萧山区', label: '萧山区'},
            {value: '余杭区', label: '余杭区'},
            {value: '富阳区', label: '富阳区'}]
        }],

        rentwayOptions: [
          {value: '整租', label: '整租'},
          {value: '合租', label: '合租'}
        ],
        roomOptions: [
          {value: '1室', label: '一室'},
          {value: '2室', label: '二室'},
          {value: '3室', label: '三室'},
          {value: '4室', label: '四室'},
          {value: '5室', label: '五室'},
          {value: '6室', label: '六室'},
          {value: '7室', label: '七室'},
        ],
        directionOptions: [
          {value: '朝东', label: '朝东'},
          {value: '朝西', label: '朝西'},
          {value: '朝南', label: '朝南'},
          {value: '朝北', label: '朝北'},
          {value: '东西', label: '东西'},
          {value: '东南', label: '东南'},
          {value: '东北', label: '东北'},
          {value: '西南', label: '西南'},
          {value: '西北', label: '西北'},
          {value: '南北', label: '南北'},
        ],
        priceOptions: [
          {value: '0-1000', label: '1000以下'},
          {value: '1000-1500', label: '1000-1500'},
          {value: '1500-2000', label: '1500-2000'},
          {value: '2000-2500', label: '2000-2500'},
          {value: '2500-3000', label: '2500-3000'},
          {value: '3000-4000', label: '3000-4000'},
          {value: '4000-5000', label: '4000-5000'},
          {value: '5000-6000', label: '5000-6000'},
          {value: '6000-8000', label: '6000-8000'},
          {value: '8000-15000', label: '8000-15000'},
          {value: '15000-1000000', label: '15000以上'},
        ],

        formSearch:{
          site:'',
          city:'',
          room:'',
          region:'',
          rentway:'',
          direction:'',
          price:'',
          lift: false,
          subway: false,
        },
        editVisible: false,
        editForm:{
          id:'',
          site:'',
          title:'',
          room:'',
          area: '',
          floor:'',
          username:'',
          city:'',
          region:'',
          address :'',
          rentway:'',
          direction:'',
          lift: '',
          subway:'',
          price:'',
          imgURL: '',
          urlinfo:''
        },
        addVisible: false,
        addForm:{
          site:'',
          title:'',
          room:'',
          area: '',
          floor:'',
          username:'',
          city:'',
          region:'',
          address :'',
          rentway:'',
          direction:'',
          lift:'',
          subway:'',
          price:'',
          imgURL:'',
          urlinfo:''
        },
        Rules:{
          title:[
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
          room:[
            { required: true, message: '请输入户型', trigger: 'blur' }
          ],
          area:[
            { required: true, message: '请输入面积', trigger: 'blur' }
          ],
          floor:[
            { required: true, message: '请输入楼层', trigger: 'blur' }
          ],
          address:[
            { required: true, message: '请输入地址', trigger: 'blur' }
          ],
          region:[
            { required: true, message: '请输入区域', trigger: 'blur' }
          ],
          rentway:[
            { required: true, message: '请输入租赁方式', trigger: 'blur' }
          ],
          direction:[
            { required: true, message: '请输入朝向', trigger: 'blur' }
          ],
          lift:[
            { required: true, message: '请输入电梯', trigger: 'blur' }
          ],
          subway:[
            { required: true, message: '请输入地铁', trigger: 'blur' }
          ],
          price:[
            { validator: checkPrice, trigger: 'blur' }
          ]
        }
      }
    },

    mounted(){
      this.getHouse();
    },

    methods: {
      getHouse() {
        // console.log(typeof this.$refs['cascaderRegion'].currentValue[0]);  //undefined和string
        if((typeof this.$refs['cascaderRegion'].currentValue[0]) === 'undefined'){
          this.formSearch.region = '';
        }else {
          this.formSearch.region = this.$refs['cascaderRegion'].currentValue[1]
        }
        let params = Object.assign({}, this.formSearch);
        console.log(params);
        let data = new URLSearchParams();
        for (let key in params) {
          data.append(key, params[key]);
        }
        api.house_get(data)
          .then((response) => {
            this.tableData1 = response.data;
            this.total = this.tableData1.length;
            this.loading = false;
          }).catch(err => {
          console.error(err);
          this.$alert('请求超时，刷新重试！')
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange(val) {
        if (this.pageSize !== val) {
          this.pageSize = val;
          this.getHouse();
        }
      },
      handleCurrentChange(val) {
        if (this.pageIndex !== val) {
          this.pageIndex = val;
          this.getHouse();
        }
      },
      onReset(){
        this.$refs['formSearch'].resetFields();
      },
      handleClick(row){
        window.open(row.urlinfo);  //window.open(url):打开新窗。。window.location.href = url:在本窗口打开
      },

      //编辑
      edit(row, index){
        if(sessionStorage.getItem('ms_username') === 'admin'){
          this.currentId = row.id;
          this.editVisible = true;
          this.editForm = Object.assign({},row);
        }
        else {
          this.$message({message: '您不是管理员,没有修改权限', type: 'warning'});
        }
      },
      //编辑提交
      editSubmit(){
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              let params = Object.assign({}, this.editForm);
              api.house_put(this.currentId, params)
                .then((response) => {
                  if(response){
                    this.$message({message: '提交成功', type: 'success'});
                    this.editVisible = false;
                    this.getHouse();
                  }
                  else {
                    this.$message({message: '执行失败，请重试',type: "error"});
                  }
                });
            }).catch((err) => {
              this.$message({message: '执行失败，请重试',type: "error"});
            });
          }
        });
      },
      //添加
      add(){
        if(sessionStorage.getItem('ms_username') === 'admin'){
          this.addVisible = true;
        }
        else {
          this.$message({message: '您不是管理员,没有添加权限', type: 'warning'});
        }
      },
      //添加提交
      addSubmit(){
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.loading = true;
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              let params = Object.assign({}, this.addForm);
              console.log(params);
              // let data = new URLSearchParams();
              // for (let key in params) {
              //   data.append(key, params[key]);
              // }
              this.$axios({
                method: 'post',
                url: 'http://127.0.0.1:5000/houseAdd',
                data: params
              }).then((response) => {
                if(response){
                  this.$message({message: '提交成功', type: 'success'});
                  this.$refs.addForm.resetFields();
                  this.addVisible = false;
                  this.loading = false;
                  this.getHouse();
                }
                else {
                  this.$message({message: '执行失败，请重试',type: "error"});
                }
              }).catch((err) => {
                this.$message({message: '执行失败，请重试',type: "error"});
                this.loading = false;
              });
            });
          }
        });
      },
      //删除
      remove(row) {
        if(sessionStorage.getItem('ms_username') === 'admin'){
          this.$confirm('是否执行删除操作?', '提示',{
            type: 'warning'
          }).then(() => {
            this.loading = true
            api.house_remove(row).then(res => {
              if(res.code === 'success'){
                this.$message.success('删除成功!');
                this.loading = false;
                this.getHouse();
              }else {
                this.$message.error('删除失败!');
                this.loading = false;
              }
            }).catch((res) => {
              this.$message.error('删除失败!');
              this.loading = false;
            });
          }).catch(() => {
            this.$message.info('已取消操作!');
          });
        }
        else {
          this.$message({message: '您不是管理员,没有删除权限', type: 'warning'});
        }
      },
      //批量删除
      removes(){
        if(sessionStorage.getItem('ms_username') === 'admin'){
          let ids= this.multipleSelection.map(item => item.id);
          console.log(ids);
          if (ids.length === 0){
            this.$message({message: '请选择要删除的项',type: "warning"});
            return;
          }
          this.$confirm('确认删除选中的记录吗？', '提示', {
            type: 'warning'
          }).then(() => {
            this.loading = true;
            api.house_removes(ids)
              .then((response) => {
                if(response.code === 'success'){
                  this.$message({message: '删除成功!', type: 'success'});
                  this.loading = false;
                  this.getHouse();
                }else {
                  this.$message.error('删除失败!');
                  this.loading = false;
                }
              }).catch((err)=>{
              this.$message({message: '执行失败，请重试!',type: "error"});
              this.loading = false;
              console.log(err)
            });
          }).catch(() => {
            this.$message({type: 'info',message: '已取消操作!'});
          });
        }
        else {
          this.$message({message: '您不是管理员,没有批量删除权限', type: 'warning'});
        }
      },
      focus(row) {
        this.$confirm('确认收藏吗？', '提示', {}).then(() => {
          let params = Object.assign({}, row);
          params['focusName'] = sessionStorage.getItem("ms_username");
          console.log(params);
          this.$axios({
            method: 'post',
            url: 'http://127.0.0.1:5000/focusHouse',
            data: params
          }).then((response) => {
            if(response.data.code === 'success'){
              this.$message.success(response.data.msg);
            }
            else if(response.data.code === 'exist') {
              this.$message.warning(response.data.msg);
            }
            else {
              this.$message.error(response.data.msg);
            }
          }).catch((err) => {
            this.$message({message: '收藏失败，请重试',type: "error"});
            this.loading = false;
          });
        });
      }

    }
  }
</script>

<style>
  .demo-form{
    text-align: left;
    background-color: #f5f5f5;
    border: 1px solid #e3e3e3;
    border-radius: 5px;
    padding: 10px 10px 0 10px;
    margin-bottom: 20px;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .05);
  }
  .el-form-item {
    margin-bottom: 10px;
  }
  .input-form, .select-form, .cascader-form{
    width: 300px;
  }

  .el-input__inner{
    height: 32px;
    line-height: 32px;
  }
  .el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner {
    width: 300px;
    margin-top: 4px;
  }
  .el-date-editor .el-range__icon {
    margin-bottom: 8px;
  }
  .el-date-editor .el-range-separator {
    margin-bottom: 8px;
  }
  .el-form-item__error {
    top: 86%;
    left: 50px;
  }
</style>
