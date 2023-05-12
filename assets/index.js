//const idCardReg =


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
            this.$router.push('/about')
        },
    },
}
const About = {
    template: "#about",
    data() {
        return {
            // model
            username: '',
            sex: '1',
            birthDate: '', // 出生日期
            tel:'',
            // view
            showPicker: false,
            pattern:{
                phone:/^(?:(?:\+|00)86)?1[3-9]\d{9}$/
            },
        }
    },
    methods: {
        onSubmit(values) {
            const { username, sex } = values
            console.log(values);
        },
        onConfirm(time) {
            const year= time.getFullYear()
            const month= time.getMonth() + 1 
            const date= time.getDate()
            console.log('year--',year);
            this.birthDate = `${year}/${month}/${date}`;
            this.showPicker = false;
            console.log(this.birthDate);
        }
    }
}
const Info = {
    template: "#info"
}
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
        path: '/about',
        component: About,
        name: 'about'
    },
]
const router = new VueRouter({
    routes,
    mode: "hash"
})

new Vue({
    router,
    el: '#root',
    data() {
        return {
            msg: 'hello'
        }
    },

})