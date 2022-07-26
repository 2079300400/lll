<template>
  <div class="publish">
    <van-nav-bar title="发布"></van-nav-bar>

    <div class="container">
      <van-form>
        <!-- 通过 pattern 进行正则校验 -->
        <van-field
          style="margin-top: 10px"
          v-model="title"
          name="title"
          placeholder="请输入标题"
        />

        <van-field
          readonly
          clickable
          :value="cate_name"
          placeholder="请选择"
          @click="showPicker = true"
        />

        <van-popup v-model="showPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @confirm="onConfirm"
            value-key="name"
            @cancel="showPicker = false"
          />
        </van-popup>

        <van-field
          style="margin-top: 10px"
          v-model="content"
          name="content"
          rows="5"
          autosize
          type="textarea"
          placeholder="请输入内容"
          show-word-limit
        />

        <van-field name="uploader" style="margin-top: 10px">
          <template #input>
            <van-uploader v-model="fileList" multiple :max-count="3" />
          </template>
        </van-field>

        <div style="margin: 30px 50px">
          <van-button
            round
            block
            type="primary"
            size="normal"
            :square="true"
            native-type="submit"
            @click="publish"
            >提交</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>
<style>
.publish-box {
  background-color: rgb(243, 245, 247);
}
.van-01 {
  margin-top: 15px;
}
.van-02 {
  margin-top: 15px;
}
.top-text {
  width: 100%;
  height: 52px;
  background-color: #07c160;
  text-align: center;
  line-height: 52px;
  font-size: 19px;
  color: #fff;
}
.photo {
  font-size: 30px;
  color: rgb(223, 227, 229);
  margin-top: 20px;
  margin-left: 20px;
}
.buttom-text {
  margin-top: 40px;
  margin-right: 36px;
  margin-left: 36px;
}
</style>
<script>
import { Form } from "vant";
import { Field } from "vant";
import { Popup } from "vant";
import { Picker } from "vant";
import { Uploader } from "vant";
import {
  getcatelist,
  addArtice,
  getQiniuToken,
  uploadqiniu,
} from "@/utils/api";
import { mapState } from "vuex";
export default {
  data() {
    return {
      title: "",
      content: "",
      fileList: [],
      cate_id: "",
      cate_name: "",
      columns: [],
      showPicker: false,
    };
  },
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [Uploader.name]: Uploader,
  },
  created() {
    this.getCate();
  },
  computed: {
    ...mapState(["uid", "userInfo"]),
  },
  methods: {
    getCate() {
      getcatelist().then((res) => {
        this.columns = res.data.data;
      });
    },
    async upload(fileList) {
      if (!Array.isArray(fileList) || fileList.length === 0) {
        return [];
      }

      let task = fileList.map((v) => {
        return new Promise((resolve, reject) => {
          let file = v.file;
          let { type } = file;
          type = type.split("/")[1];

          let file_name = `${new Date().getTime()}_${Math.random()
            .toString(36)
            .slice(2)}.${type}`;

          getQiniuToken().then((res) => {
            // token   是靠  我们的用户名密码 等认证信息生成的

            const formdata = new FormData();
            formdata.append("file", file);
            formdata.append("token", res.data.token);
            formdata.append("key", file_name);

            //  上传到七牛云的服务器了

            uploadqiniu(formdata).then((res) => {
              resolve(`http://toutiao.longxiaokj.com/` + res.data.key);
            });
          });
        });
      });
      let imgList = await Promise.all(task);

      return imgList;
    },

    async publish() {
      let { title, content, fileList, uid, userInfo, cate_id, cate_name } =
        this;
      console.log(title, content, fileList, uid, userInfo, cate_id, cate_name);
      console.log(fileList[0].file);
      let imageSrc = await this.upload(fileList);

      addArtice({
        title,
        content,
        cate_id,
        cate_name,
        author_id: uid,
        imageSrc,
        author: userInfo.nickname,
      }).then((res) => {
        console.log(res);
      });
    },
    onFailed() {
      console.log("failde", errorInfo);
    },

    onConfirm({ name, _id }) {
      this.cate_name = name;
      this.cate_id = _id;
      this.showPicker = false;
    },
  },
};
</script>
<style lang="less">
</style> 
