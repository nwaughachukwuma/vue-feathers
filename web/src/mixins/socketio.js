const SocketioMixin = {
    created: function () {
        this.hello()
    },
    methods: {
        
    },
    computed: {
        headers: function() {
          return this.$store.getters.headers;
        },
        user: function () {
            return this.$store.getters.user
        }
    },
    sockets: {
        connect(data) {
            // Fired when the socket connects.
            //   this.isConnected = true;
            console.log('socket data on connect', data);
        },
        connect_message(data) {
            console.log(data)
        },
        connect_timeout(data) {
            console.log('socket data on connect timeout', data);
        },
        connect_error(data) {
            console.log('socket data on connect error', data);
        },
        reconnect(data) {
            console.log('socket data on reconnect', data);
        },
        disconnect() {
            // this.isConnected = false;
        },
        // Fired when the server sends something on the "messageChannel" channel.
        messageChannel(data) {
            this.socketMessage = data
        },
        broadcast(data) {
            console.log('onbroadcast :=>>>', data)
        }
    },
}

export default SocketioMixin