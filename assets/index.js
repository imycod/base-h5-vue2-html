let vm = null


const selectDateComponent = {
    template: '#select-date',
    props: {
        options: {
            type: Array,
            default: () => [
                {
                    label: '年',
                    prop: 'year',
                    value: new Date().getFullYear(),
                    step: 100,
                },
                {
                    label: '月',
                    prop: 'month',
                    value: 12,
                },
                {
                    label: '日',
                    prop: 'day',
                    value: 31,
                },
            ]
        },
        form: {
            type: Object,
            default: () => { }
        },
        prop: {
            type: String,
            defualt: ''
        },
        label: {
            type: String,
            default: '填写日期'
        }
    }
}

const Home = {
    template: "#home",
    data() {
        return {
            // model
            reporter: '', // 上报者姓名
            username: '', // 患者姓名
            idCard: '', // 省份证
            // view
            pattern: /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/,
        }
    },
    methods: {
        onSubmit(values) {
            const { reporter, username } = values // van-field -> name
            this.$router.push('/info')
        },
    },
}

const nationColumns = nationsData.map(nation => nation.label)
const InfoModel = {
    form: {
        username: '',
        sex: '1',
        birthDate: '', // 出生日期
        tel: '',
        nation: '',
        selectDate: {
            year: '',
            month: '',
            day: ''
        },
    },
    view: (scope) => {
        return {
            model: {
                picker: false,
                pickerType: '',
                birthDate: false,
                nation: false,
                nationColumns, // 从后端获取数据
                minDate: new Date(1950, 01, 01),
                maxDate: new Date(),
            },
            form: [
                {
                    prop: 'username',
                    name: 'username',
                    label: '患者姓名',
                    placeholder: '请填写患者姓名',
                    type: 'text',
                    rules: [
                        { required: true, message: '请填写患者姓名' },
                    ]
                },
                {
                    prop: 'sex',
                    name: 'sex',
                    label: '患者性别',
                    placeholder: '请选择患者性别',
                    type: 'radio',
                    direction: 'horizontal',
                    options: [
                        {
                            label: '男',
                            value: '1'
                        },
                        {
                            label: '女',
                            value: '2'
                        }
                    ]
                },
                // {
                //     prop: 'birthDate',
                //     name: 'birthDate',
                //     label: '出生日期',
                //     placeholder: '请选择出生日期',
                //     type: 'picker',
                //     readonly: true,
                //     clickable: true,
                //     onClick: (prop) => {
                //         scope.view.model.pickerType = 'date-picker'
                //         scope.view.model.picker = true
                //     },
                //     rules: [
                //         { required: true, message: '请选择出生日期' },
                //     ]
                // },
                {
                    prop: 'birthDate',
                    name: 'birthDate',
                    label: '出生日期',
                    placeholder: '请选择出生日期',
                    type: 'select',
                    options: [
                        {
                            label: '年',
                            prop: 'year',
                            value: new Date().getFullYear(),
                            step: 100,
                        },
                        {
                            label: '月',
                            prop: 'month',
                            value: 12,
                        },
                        {
                            label: '日',
                            prop: 'day',
                            value: 31,
                        },
                    ]
                },
                {
                    prop: 'tel',
                    name: 'tel',
                    type: 'tel',
                    label: '联系电话',
                    placeholder: '请输入联系电话',
                    rules: [
                        { required: true, message: '请输入联系电话' },
                        {
                            pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
                            message: '联系电话输入错误,请重新输入'
                        },
                    ]
                },
                {
                    prop: 'nation', // 民族
                    name: 'nation',
                    type: 'picker',
                    label: '民族',
                    placeholder: '请选择民族',
                    readonly: true,
                    clickable: true,
                    rules: [
                        { required: true, message: '请选择民族' },
                    ],
                    onClick: (prop) => {
                        scope.view.model.pickerType = 'picker'
                        scope.view.model.picker = true
                        console.log('scope.view.model-', scope.form)
                    }
                },
                {
                    // 体重
                    prop: 'weight',
                    name: 'weight',
                    type: 'number',
                    label: '体重',
                    placeholder: '请输入体重',
                    rules: [
                        { required: true, message: '请输入体重' },
                    ]
                },
                {
                    // 已知疾病
                    prop: 'disease',
                    name: 'disease',
                    type: 'text',
                    label: '',
                    customLabel: '列出已知的疾病状况：',
                    class: 'custom-label',
                    placeholder: '（如糖尿病、高血压、癌症、心脏病等）',
                },
                {
                    // 列出所有过敏
                    prop: 'allergy',
                    name: 'allergy',
                    type: 'text',
                    label: '',
                    customLabel: '列出所有过敏: ',
                    class: 'custom-label',
                    placeholder: '（如药物、食物、花粉或其他）',
                },
                {
                    // 列出所有关于患者其他重要信息：
                    prop: 'other_info',
                    name: 'other_info',
                    type: 'text',
                    label: '',
                    customLabel: '列出所有关于患者其他重要信息: ',
                    class: 'custom-label',
                    placeholder: '（如抽烟、喝酒、怀孕等）',
                },
            ],
        }
    }
}

const Info = {
    template: "#info",
    data() {
        return {
            // data model - 数据模型层给到api
            form: InfoModel.form,
            // view model - 视图模型层给到视图
            view: InfoModel.view(this),
            pattern: InfoModel.pattern,
        }
    },
    methods: {
        formatter(type, val) {
            if (type === 'year') {
                return `${val}年`;
            } else if (type === 'month') {
                return `${val}月`;
            } else {
                return `${val}日`;
            }
        },
        onSubmit(values) {
            console.log('values---', values);
            console.log('this.form--', this.form)

            this.$store.commit('set', { type: 'patientInfo', data: this.form })
            this.$router.push('/adverse')
        },
        onConfirm(value, type, prop) {
            if (type == 'date-picker') {
                const year = value.getFullYear()
                const month = value.getMonth() + 1 < 10 ? `0${value.getMonth() + 1}` : value.getMonth() + 1
                const date = value.getDate() < 10 ? `0${value.getDate()}` : value.getDate()
                console.log('year--', year);
                this.form[prop] = `${year}/${month}/${date}`;
            } else {
                this.form[prop] = value
            }

            this.view.model.picker = false;
        }
    }
}

const Adverse = {
    template: "#adverse",
    components: {
        'custom-selectate-component': selectDateComponent,
    },
    data() {
        return {
            form: {
                quest: [],
                quest_text: '',
                events: [],
                date: {
                    year: '',
                    month: '',
                    day: ''
                },
                first_radio: '1',
                first_same_radio: '1',
                quest_lib_text: '',
                fileList: [
                    // { url: 'https://img01.yzcdn.cn/vant/leaf.jpg' },
                    // Uploader 根据文件后缀来判断是否为图片文件
                    // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
                    // { url: 'https://cloud-image', isImage: true },
                ],
                durge:'',
                quest_durge_text:'',
                answer:[],
                quest_answer_text:'',
                quest_hap_text:'',
                fileList1:[],
            },
            view: {
                model: {

                },
                form: {
                    question: [
                        {
                            id: '0',
                            label: '1、发生了什么样的问题？（可多选）',
                            prop: 'quest',
                            type: 'checkbox',
                            options: [
                                {
                                    text: '受伤或产生了副作用（包括所有新的或恶化的症状）',
                                    value: '1'
                                },
                                {
                                    text: '未正确使用药品，可能导致或已导致问题',
                                    value: '2',
                                },
                                {
                                    text: '发现药品有质量问题',
                                    value: '3',
                                },
                                {
                                    text: '同一药品换厂家后出现问题',
                                    value: '4',
                                },
                                {
                                    text: '其他（填空）',
                                    value: '5',
                                },
                            ]

                        },
                        {
                            id: '1',
                            label: '2、发生过以下事件吗？（可多选）',
                            prop: 'events',
                            type: 'checkbox',
                            options: [
                                {
                                    text: '导致住院或使住院时间延长',
                                    value: '1'
                                },
                                {
                                    text: '需要进一步治疗以防止永久性伤害',
                                    value: '2',
                                },
                                {
                                    text: '残疾或其他健康问题',
                                    value: '3',
                                },
                                {
                                    text: '胎儿出生缺陷',
                                    value: '4',
                                },
                                {
                                    text: '威胁生命',
                                    value: '5',
                                },
                                {
                                    text: '死亡',
                                    value: '6',
                                },
                                {
                                    text: '无',
                                    value: '7',
                                },
                                {
                                    text: '其他严重不良反应事件（填空）',
                                    value: '8',
                                },
                            ]

                        },
                    ]
                }
            }
        }
    },
    methods: {
        onSubmit() {
            console.log(this.form)

            this.$router.push('/medicineinfo')
        },
        afterRead(file) {
            // 此时可以自行将文件上传至服务器
            console.log(file);
        },
        afterRead1(file){
            console.log(file)
        }
    },
}


const MedicineInfo = {
    template:`#medicineinfo`,
    components: {
        'custom-selectate-component': selectDateComponent,
    },
    data(){
        return{
            form:{
                pingu:'',
                durge_name:'',
                durgeFileList:[],
                facompy_name:'',
                facompyFileList:[],
                durgeDate:{
                    year:"",
                    month:"",
                    day:"",
                },
                dugDateFileList:[],
                dugId:'',
                dugIdFileList:[],
                approvalId:'',
                approvalIdFileList:[],
                usevey:'',
                frequency:'',
                howtuse:'',
                durgeDate1:{
                    year:"",
                    month:"",
                    day:"",
                },
                durgeDate2:{
                    year:"",
                    month:"",
                    day:"",
                },
                durgeDate3:{
                    year:"",
                    month:"",
                    day:"",
                },
                durgeDate4:{
                    year:"",
                    month:"",
                    day:"",
                },
                what:'',
                zhengzhuangjq:'',
                problemagain:'',
                record:'',
                recordFileList:[],
                report:'',
                supplement:'',
                supFileList:[],  
            },
            view:{
                form:[
                    {
                        // 第一次用药日期
                        prop:"durgeDate1",
                        title:'10、第一次使用药的日期',
                        label:'使用日期: ',
                    },
                    {
                        // 停止使用药品的日期
                        prop:"durgeDate2",
                        title:'11、停止使用药品的日期',
                        label:'停止日期: ',
                    },
                    {
                        // 减少药品使用剂量的日期
                        prop:"durgeDate3",
                        title:'12、减少药品使用剂量的日期',
                        label:'减少日期: ',
                    },
                    {
                        // 持续使用该药品的大概事件
                        prop:"durgeDate4",
                        title:'13、持续使用该药品的大概事件',
                        label:'持续使用: ',
                    },
                    
                ]
            }
        }
    },
    methods:{
        afterRead(file){},
        afterRead1(file){},
        afterRead2(file){},
        afterRead3(file){},
        afterRead4(file){},
        afterRead5(file){},
        afterRead6(file){},
        onSubmit(){
            alert('todo...')
        },
    }
}

//  vue router
const routes = [
    {
        path: '/',
        component: Home,
        name: 'home'
    },
    {
        path: '/info',
        component: Info,
        name: 'info'
    },
    {
        path: '/adverse',
        component: Adverse,
        name: 'adverse'
    },
    {
        path: '/medicineinfo',
        component: MedicineInfo,
        name: 'medicineinfo'
    },
]
const router = new VueRouter({
    routes,
    mode: "hash"
})
// vuex
const store = new Vuex.Store({
    state() {
        return {
            // 患者信息
            patientInfo: {},
            // 不良事件
            adverseEvent: {},
            // 药品信息
            drugInfo: {},
        }
    },
    mutations: {
        set(state, payload) {
            state[payload.type] = payload.data
        }
    }
})

Vue.use(Vuex)

const app = new Vue({
    router,
    store,
    el: '#root',
    data() {
        return {
            msg: 'hello'
        }
    },
})

vm = app