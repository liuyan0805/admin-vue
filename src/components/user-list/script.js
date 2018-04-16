export default {
  async created () {
    this.loadUserByPage(1)
  },
  data () {
    return {
      searchText: '',
      tableData: [], // 表格列表数据
      totalSize: 0, // 总记录数据
      currentPage: 1, // 当前页码
      pageSize: 1, // 当前每页大小
      userForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editUserForm: {
        username: '',
        email: '',
        mobile: ''
      },
      dialogFormVisible: false,
      dialogEditFormVisible: false,
      // 添加rules 验证规则
      addUserFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur'},
          { min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur' }
        ],
        password:  [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    //  ###处理分页大小改变
    async handleSizeChange (pageSize) {
      // console.log(pageSize)

      this.pageSize = pageSize
      // 页码发生改变
      // 重新请求列表数据
      // 用户改变每页大小之后，我们请求新的数据，以新的每页大小的第一页为准
      this.loadUserByPage(1, pageSize)

      // 页码改变之后，不仅让数据到了第1页
      // 同时也要让页码高亮状态也跑到第1页
      this.currentPage = 1
    },
    // ###处理分页页码改变
    async handleCurrentChange (currentPage) {
      // console.log(currentPage)
       this.loadUserByPage(currentPage)
    },
    // ###处理用户搜索
    handleSearch () {
      this.loadUserByPage(1)
    },
    // ###分页加载用户列表数据
    async loadUserByPage (page) {
      const res = await this.$http.get('/users', {
        params: {
          pagenum: page,
          pagesize: this.pageSize,
          query: this.searchText // 根据搜索文本框的内容搜索
        }
      })
      // console.log(res)
      const {users, total} = res.data.data
      this.tableData = users
      // 请求数据成功，我们从服务器得到了总记录数据
      // 然后我们就可以把总数据交给分页插件使用
      this.totalSize = total
    },
    // ###处理用户状态改变
    async handleStateChange (state, user) {
      const {id: userId} = user
      // console.log(state, user)
      // 拿到用户 id
      // 拿到Switch 开光的选中状态 state
      // 发起请求改变状态
      const res = await this.$http.put (`/users/${userId}/state/${state}`)
      // console.log(res)
      if(res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: `用户状态${state ? '启用' :'禁用'}成功`
        })
      }
    },

     // 弹出添加用户对话框
    handleShowAddUser () {
      this.dialogFormVisible = true
      // console.log(this.userForm)
    },
    // 处理添加用户信息
    async handleAddUser () {
      // 1. 获取表单数据
      // 2. 表单验证
      // 3. 发起请求添加用户
      // 4. 根据响应交互
      this.$refs['userForm'].validate(async (valid) =>{
        if (!valid) {
          return false
        }
      })
      const res = await this.$http.post ('/users',this.userForm)
      // console.log(res)
      if(res.data.meta.status === 201) {
        this.$message({
          type: 'success',
          message: '添加用户成功'
        })
        this.dialogFormVisible = false
        // 重新加载用户列表数据
        this.loadUserByPage(this.currentPage)

        // 清空表单内容
        for (let key in this.userForm) {
          this.userForm[key] = ''
        }
      }
    },
    /*
      ###删除单个用户
    */
    handleremoveUser (data) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async () => {
          // 删除功能
          const res = await this.$http.delete(`users/${data.id}`)
          if(res.data.meta.status === 200) {
            this.loadUserByPage(1)
          }
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })        
        })
    },
    /*
    ###编辑单个用户信息
    */
    // 处理显示被编辑的用户表单信息(显示当前用户)
    // 这里的user是传入的当前行信息
    async handleShowEditForm (user) {
      this.dialogEditFormVisible = true
      const res = await this.$http.put(`/users/${user.id}`)
      // console.log(res)
      this.editUserForm = res.data.data
    },
    // 将更新之后的信息，从新发送请求，给出更新成的提示信息
    async handleEidtuser() {
      const {id: userId} = this.editUserForm
      const res = await this.$http.put(`/users/${userId}`,this.editUserForm)
      // console.log(res)
      if(res.data.meta.status === 200) {
        this.$message ({
          type: 'success',
          message: '更新用户成功'
        })
        // 关闭弹出层
        this.dialogEditFormVisible = false
        // 更新列表信息
        this.loadUserByPage(1)
      }
    }
  }
}
