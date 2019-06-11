<template>
	<div class="right">
		<div class="shopFrom">
			<el-form class="apply-shop-form" :rules="editFromRules" :model="editData" ref="editDataForm">
				<el-form-item label="当前密码：" label-width="120px" prop="nowPsw">
					<el-input size="small" type="password" v-model="editData.nowPsw" placeholder="请输入当前密码"></el-input>
				</el-form-item>
				<el-form-item label="新密码：" label-width="120px" prop="newPsw">
					<el-input size="small" type="password" v-model="editData.newPsw" placeholder="请输入密码"></el-input>
				</el-form-item>
				<el-form-item label="确认密码：" label-width="120px" prop="rePsw">
					<el-input size="small" type="password" v-model="editData.rePsw" placeholder="请再次输入新密码"></el-input>
				</el-form-item>
				<el-form-item  label-width="120px">
					<el-button size="small" @click="submitApply('editDataForm')" class="btn" type="primary">提交</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
	import axios from 'axios'
	import Services from '../../../store/services'
	export default {
		async asyncData() {

		},
		data() {
			return {
				editData: {
					nowPsw: '',
					newPsw: '',
					rePsw: ''
				},
				editFromRules: {
					nowPsw: [{
						required: true,
						message: '请输入当前密码',
						trigger: 'blur'
					}],
					newPsw: [{
						required: true,
						message: '请输入新密码',
						trigger: 'blur'
					}],
					rePsw: [{
						required: true,
						message: '请再次输入新密码',
						trigger: 'blur'
					}]
				}
			}
		},
		head() {
			return {
				title: '智慧众合-修改密码'
			}
		},
		mounted() {
			
		},
		methods: {
			submitApply(formName) {
				let self = this
				let params = {
					oldPassword: self.editData.nowPsw,
					newPassword: self.editData.newPsw,
					rePassword: self.editData.rePsw
				}
				this.$refs[formName].validate((valid) => {
					if(self.editData.newPsw!=self.editData.rePsw){
						self.$message.error("请输入一致的新密码！")
					}else if(valid) {
						console.log(self.editData)
						Services.resetPassword(params).then(response => {
							if(response.data.code == 200) {
								console.log(response.data);
								self.$message.success(response.data.message)
								self.$store.dispatch('logout')
  								self.$router.push({path: '/login'})
							}else{
								self.$message.error(response.data.message)
							}
						})
					}
				})
			}
		}
	}
</script>
<style scoped>
	.main .right {
		width: 980px;
		min-height: 500px;
		float: right;
		background-color: #FFFFFF;
		padding: 22px 0;
		padding-bottom: 95px;
		margin-bottom: 15px;
	}
	.shopFrom{
		width: 80%;
		margin: 50px auto 0;
	}
</style>