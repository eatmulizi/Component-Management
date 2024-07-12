<template>
  <div class="content">
    <div class="form">
      <el-form ref="form" :model="Form" label-width="80px">
        <!-- <el-form-item label="标签">
          <el-input v-model="Form.name"></el-input>
        </el-form-item> -->

        <el-form-item>
          <el-upload action="/api/users/addProduct" list-type="picture-card" :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove" :before-upload="beforeProductUpload">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <!-- <el-form-item>
          <el-button type="primary" @click="submit">立即创建</el-button>

        </el-form-item> -->



        <!-- <el-form-item label="通过标签搜索">
          <el-input v-model="searchdata"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>

        </el-form-item> -->
      </el-form>


      <el-form ref="form" :model="updateForm" label-width="80px">
        <el-form-item label="品牌">
          <el-input v-model="updateForm.brand"></el-input>
        </el-form-item>
        <el-form-item label="子品牌">
          <el-input v-model="updateForm.childbrand"></el-input>
        </el-form-item>
        <el-form-item label="原厂配件目录">
          <el-select v-model="updateForm.originalAccessoriesCatalog">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>

          </el-select>
        </el-form-item>
        <el-form-item label="配件目录">
          <el-input v-model="updateForm.catalogName"></el-input>
        </el-form-item>
        <el-form-item label="目录更新日期">
          <el-input v-model="updateForm.catalogDate"></el-input>
        </el-form-item>
        <el-form-item label="vin 查询">
          <el-select v-model="updateForm.vin">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>

          </el-select>
        </el-form-item>
        <el-form-item label="交付形式">
          <el-select v-model="updateForm.originalAccessoriesCatalog">
            <el-option label="软件" value="software"></el-option>
            <el-option label="在线账户" value="online"></el-option>

          </el-select>
        </el-form-item>
        <el-form-item label="供应商名字">
          <el-input v-model="updateForm.supplyName"></el-input>
        </el-form-item>
        <el-form-item label="供应商城市">
          <el-input v-model="updateForm.supplyCity"></el-input>
        </el-form-item>
        <el-form-item label="供应商闲鱼号">
          <el-input v-model="updateForm.supplyFish"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="updateForm.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="微信">
          <el-input v-model="updateForm.weChat"></el-input>
        </el-form-item>

        <el-form-item label="沟通状态">
          <el-select v-model="updateForm.communicateStatus">
            <el-option label="未沟通" value="nonComu"></el-option>
            <el-option label="已沟通" value="alreadyComu"></el-option>
            <el-option label="沟通中" value="onComu"></el-option>

          </el-select>
        </el-form-item>

        <div>
          <template v-for="(tag, index) in updateForm.tags">
            <a-tooltip v-if="tag.length > 20" :key="tag" :title="tag">
              <a-tag :key="tag" :closable="index !== 0" @close="() => handleCloseUpdate(tag)">
                {{ `${tag.slice(0, 20)}...` }}
              </a-tag>
            </a-tooltip>
            <a-tag v-else :key="tag" :closable="index !== 0" @close="() => handleCloseUpdate(tag)">
              {{ tag }}
            </a-tag>
          </template>
          <a-input v-if="inputVisible" ref="input" type="text" size="small" :style="{ width: '78px' }"
            :value="inputValue"
             @change="handleInputChange"
            @blur="handleInputConfirmUpdate"
            @keyup.enter="handleInputConfirmUpdate" />
          <a-tag v-else style="background: #fff; borderStyle: dashed;" @click="showInput">
            <a-icon type="plus" /> New Tag
          </a-tag>
        </div>


        <el-form-item>
          <el-button type="primary" @click="newSubmit">立即创建</el-button>

        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="test">测试</el-button>

        </el-form-item>

        <!-- <p>搜索</p>

        <el-form-item label="品牌">
          <el-input v-model="searchForm.brand"></el-input>
        </el-form-item>
        <el-form-item label="vin 查询">
          <el-select v-model="searchForm.vin">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>

          </el-select>
        </el-form-item>
        <el-form-item label="子品牌">
          <el-input v-model="searchForm.childbrand"></el-input>
        </el-form-item>
        <el-form-item label="配件目录">
          <el-input v-model="searchForm.catalogName"></el-input>
        </el-form-item> -->

        <!-- <div>
    <template v-for="(tag, index) in searchForm.tags">
      <a-tooltip v-if="tag.length > 20" :key="tag" :title="tag">
        <a-tag :key="tag" :closable="index !== 0" @close="() => handleClose(tag)">
          {{ `${tag.slice(0, 20)}...` }}
        </a-tag>
      </a-tooltip>
      <a-tag v-else :key="tag" :closable="index !== 0" @close="() => handleClose(tag)">
        {{ tag }}
      </a-tag>
    </template>
    <a-input
      v-if="inputVisible"
      ref="input"
      type="text"
      size="small"
      :style="{ width: '78px' }"
      :value="inputValue"
      @change="handleInputChange"
      @blur="handleInputConfirm"
      @keyup.enter="handleInputConfirm"
    />
    <a-tag v-else style="background: #fff; borderStyle: dashed;" @click="showInput">
      <a-icon type="plus" /> New Tag
    </a-tag>
  </div> -->
  
  <!-- <div>
    <template v-for="(tag, index) in searchForm.tags">
      <a-tooltip v-if="tag.length > 20" :key="tag" :title="tag">
        <a-tag :key="tag" :closable="index !== 0" @close="() => handleCloseSearch(tag)">
          {{ `${tag.slice(0, 20)}...` }}
        </a-tag>
      </a-tooltip>
      <a-tag v-else :key="tag" :closable="index !== 0" @close="() => handleCloseSearch(tag)">
        {{ tag }}
      </a-tag>
    </template>
    <a-input
      v-if="inputVisible"
      ref="input"
      type="text"
      size="small"
      :style="{ width: '78px' }"
      :value="inputValue"
      @change="handleInputChange"
      @blur="handleInputConfirmSearch"
      @keyup.enter="handleInputConfirmSearch"
    />
    <a-tag v-else style="background: #fff; borderStyle: dashed;" @click="showInput">
      <a-icon type="plus" /> New Tag
    </a-tag>
  </div>


        <el-form-item>
          <el-button type="primary" @click="newSearch">搜索</el-button>

        </el-form-item> -->

      </el-form>









    </div>
    <!-- 图片展示区域 -->
    <div>
    <div v-for="(imageSrc, index) in this.imageSrc" :key="index" class="image-container">
      <img :src="imageSrc" alt="Base64 Image"/>
    </div>
  </div>

  </div>
</template>


<script>
import { Message } from 'element-ui';
import { v4 as uuidv4 } from 'uuid';


export default {
  data() {
    return {
      Form: {
        name: '',
        imageurl: [],




      },
      // 上传表单
      updateForm: {
        brand: '',
        childbrand: '',
        originalAccessoriesCatalog: '',
        catalogName: '',
        catalogDate: '',
        vin: '',
        deliver: '',
        supplyName: '',
        supplyCity: '',
        supplyFish: '',
        phoneNumber: '',
        weChat: '',
        communicateStatus: '',
        tags: [],
        address :[]





      },
      // 搜索表单
      searchForm: {
        brand: '',
        catalogName: '',
        vintype: '',
        childbrand: '',
        tags: []

      },

      searchdata: '',
      imageSrc: [],
      dialogImageUrl: '',
      dialogVisible: false,
      tags: [],
      inputVisible: false,
      inputValue: ''
    };

  },
  methods: {
    handleRemove(file, fileList) {
      //移除图片
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      //图片预览
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeProductUpload(file) {
      var _this = this
      return new Promise(function (resolve, reject) {
        var reader = new FileReader()
        reader.readAsDataURL(file)// 这里是最关键的一步，转换成base64
        reader.onload = function (event) {
          _this.updateForm.address.push(event.target.result) //定义参数获取图片路径
        }
      })

    },
    // 搜索图片根据tags 数组搜索
    search() {
      if (this.tags.length === 0) {
        return;
      }

      var form = {
        label: this.tags
      }
      console.log(form)

      this.$axios.post('http://127.0.0.1:3001/api/picture', form

      ).then(res => {
        console.log(res)

        Message({
          type: 'success',
          message: "搜索完成！"
        })
        // 展示目前不搞
        console.log(res.data.data[0])
        this.imageSrc = res.data.data[0].address
      })

    },
    newSubmit() {
      for  (const key in this.updateForm.address) {
        const myuuid = uuidv4();
      var form = {
        pictureuuid: myuuid,
        address: this.updateForm.address[key],
        brand: this.updateForm.brand,
        childbrand: this.updateForm.childbrand,
        originalAccessoriesCatalog: this.updateForm.originalAccessoriesCatalog,
        catalogName: this.updateForm.catalogName,
        catalogDate: this.updateForm.catalogDate,
        vin: this.updateForm.vin,
        deliver: this.updateForm.deliver,
        supplyName: this.updateForm.supplyName,
        supplyCity: this.updateForm.supplyCity,
        supplyFish: this.updateForm.supplyFish,
        phoneNumber: this.updateForm.phoneNumber,
        weChat: this.updateForm.weChat,
        communicateStatus: this.updateForm.communicateStatus


      }
      console.log(form)
      this.$axios.post('http://127.0.0.1:3001/api/picture/addProductNew', form).then(res => {


        Message({
          type: 'success',
          message: "发布成功！"
        })

        console.log('上传成功')
      })

      // 这里踩坑了如果不用箭头函数会导致重新造上下文，然后this undefined

      this.updateForm.tags.forEach((item) => { // 使用箭头函数
        var form1 = {
          labelname: item,
          pictureid: myuuid
        };
        this.$axios.post('http://127.0.0.1:3001/api/picture/addlabel', form1).then(res => {
          Message({
            type: 'success',
            message: "发布成功！"
          });
          console.log('上传成功');
        });
      });

      }
     




      // 清空列表
      this.resetForm()



    },
    //有tags 和无tags 可以走两个服务

    newSearch() {
     
      this.imageSrc = []
      var form = {}
      if (this.searchForm.brand) form.brand = this.searchForm.brand;
      if (this.searchForm.childbrand) form.childbrand = this.searchForm.childbrand;
      if (this.searchForm.catalogName) form.catalogName = this.searchForm.catalogName;
      if (this.searchForm.vintype) form.vin = this.searchForm.vintype;
      console.log(form)

      if (this.searchForm.tags.length > 0) {
        console.log("查标签")
        form.tags = this.searchForm.tags
        this.$axios.post('http://127.0.0.1:3001/api/searchPictureWithtags', form

        ).then(res => {
          console.log(res)

          Message({
            type: 'success',
            message: "搜索完成！"
          })
          // 展示目前不搞
          console.log(res.data.data[0])
          this.imageSrc = res.data.data.map(item => item.address);
        })
          .catch(error => {
            console.error("请求失败：", error);
            Message({
              type: 'error',
              message: "搜索失败！"
            });
          });


      } else {
        this.$axios.post('http://127.0.0.1:3001/api/searchPictureNotags', form

        ).then(res => {
          console.log(res)

          Message({
            type: 'success',
            message: "搜索完成！"
          })
          // 展示目前不搞
          console.log(res.data.data[0])
          this.imageSrc = res.data.data.map(item => item.address);
        })
        .catch(error => {
          console.error("请求失败：", error);
          Message({
            type: 'error',
            message: "未搜索到结果！"
          });
        });
      }


    },
    // 上传图片
    submit() {
      if (this.tags.length === 0) {
        return;
      }
      const myuuid = uuidv4();
      var form = {
        pictureuuid: myuuid,
        address: this.Form.imageurl
      }
      console.log(form)



      // 分两步走，先存图，再存标签
      // 首先要生成一个uuid用来做图片主键
      // 图的数据库只有图片id （生成的uuid）和图片base 64 编码
      // 标签库是标签id + 标签名 +里面的图片id

      this.$axios.post('http://127.0.0.1:3001/api/picture/addProduct', form).then(res => {


        Message({
          type: 'success',
          message: "发布成功！"
        })

        console.log('上传成功')
      })

      // 处理标签列表
      this.tags.forEach(function (item) {
        var form1 = {
          labelname: item,
          pictureid: myuuid
        }
        this.$axios.post('http://127.0.0.1:3001/api/picture/addlabel', form1).then(res => {


          Message({
            type: 'success',
            message: "发布成功！"
          })

          console.log('上传成功')
        })

      })



      // 清空列表
      resetForm()

    },
    // 标签框相关组件
    handleCloseUpdate(removedTag) {
      this.updateForm.tags = this.updateForm.tags.filter(tag => tag !== removedTag);
      console.log(this.tags);
    },
    handleCloseSearch(removedTag) {
      this.searchForm.tags = this.searchForm.tags.filter(tag => tag !== removedTag);
      console.log(this.tags);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
    handleInputChange(e) {
      this.inputValue = e.target.value;
    },
    handleInputConfirmUpdate() {
      const inputValue = this.inputValue;
      let tags = this.updateForm.tags;

      if (inputValue && this.updateForm.tags.indexOf(inputValue) === -1) {
        this.updateForm.tags.push(inputValue);
      }
      console.log(this.updateForm.tags);
      this.inputVisible = false;
      this.inputValue = '';
      console.log(this.updateForm.tags);
    },


    // 清空上传表单
    resetForm() {
      this.updateForm = {
        brand: '',
        childbrand: '',
        originalAccessoriesCatalog: '',
        catalogName: '',
        catalogDate: '',
        vin: '',
        deliver: '',
        supplyName: '',
        supplyCity: '',
        supplyFish: '',
        phoneNumber: '',
        weChat: '',
        communicateStatus: '',
        tags: []
      };
    },


    handleInputConfirmSearch() {
      const inputValue = this.inputValue;
      

      if (inputValue && this.searchForm.tags.indexOf(inputValue) === -1) {
        this.searchForm.tags.push(inputValue);
      }
      console.log(this.searchForm.tags);
      this.inputVisible = false;
      this.inputValue = '';
      console.log(this.searchForm.tags);
    },

    //调试方法
    test(){
      console.log(this.updateForm.address)
      for (const key in this.updateForm.address) {
  
    console.log(` ${this.updateForm.address[key]}`);
  
}

    }
  }


}
</script>


<style>
/* 指定图片展示的大小 */
.image-container img {
  width: 200px; 
  height: 200px; 
  object-fit: cover; /* 保持图片比例 */
}
</style>
