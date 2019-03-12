import {
    GET_CHANNELS,
    // SET_MESSAGE
} from './mutation-types'

// メッセージ用APIのパスを取得する関数
const get_message_path = cname => `https://us-central1-demoapp-c0d46.cloudfunctions.net/v1/channels/${cname}/messages`

async function fetch_get_messages(cname) {
    const response = await fetch(get_message_path(cname))
    const json = await response.json()
    return json.channels
}

export default {
    // [SET_MESSAGE]({ commit }, message) {
    //     commit(SET_MESSAGE, message)
    // },
    [GET_CHANNELS]({ commit }) {
        async function fetchAPI() {
            const url = 'https://us-central1-demoapp-c0d46.cloudfunctions.net/v1/channels'
            const response = await fetch(url)
            const json = await response.json()
            commit(GET_CHANNELS, json.channels)
        }
        fetchAPI()
    },
    // メソッドをasync functionで定義することも可能です
    // サーバのメッセージを取得します
    async GET_MESSAGES({ commit }, cname) {
        // サーバのメッサージをGETで取得します
        const messages = await fetch_get_messages(cname)
        // サーバのメッサージを所得したメッサージをコミットします
        commit('SET_MESSAGES', messages)
    },
    // サーバにメッサージを送信します
    async POST_MESSAGE({ commit }, { cname, message }) {
        // サーバにメッサージをPOSTで送信します
        // fetchの第2引数は送信パラメータです
        const response = await fetch(get_message_path(cname), {
            method: 'POST',
            body: JSON.stringify({
                'body': message
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        // POSTしたレスポンスを受け取ります
        const json = await response.json()
        // POSTがOKならサーバのメッセージを取得しコミットします
        if (json.result === 'ok') {
            const messages = await fetch_get_messages(cname)
            commit('SET_MESSAGES', messages)
        }
    }
}