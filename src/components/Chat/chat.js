import { mapGetters, mapActions } from 'vuex'
import {
    // SET_MESSAGE,
    GET_CHANNELS
} from '../../store/mutation-types'
import MessageList from '../MessageList'
import Btn from '../Btn'

export default {
    name: 'chat',
    mounted() {
        this.GET_CHANNELS()
        this.GET_MESSAGES(this.$route.params.cname)
    },
    computed: {
        ...mapGetters([
            'messages',
            'channels'
        ])
    },
    methods: {
        ...mapActions([
            // SET_MESSAGE,
            GET_CHANNELS,
            'GET_MESSAGES',
            'POST_MESSAGE'
        ]),
        send_message() {
            // this.SET_MESSAGE(this.message)
            this.POST_MESSAGE({ "cname": this.$route.params.cname, "message": this.message })
            this.message = ""
        }
    },
    data() {
        return {
            message: ""
        }
    },
    watch: {
        '$route'(to, from) {
            this.GET_MESSAGES(to.params.cname)
        }
    },
    components: {
        'message-list': MessageList,
        'btn': Btn
    }
}