const dgram = require("dgram"); 

export default class LanConnection {
    constructor() {
        this.makeAParty();
        this.searchForAParty();
    }

    private searchForAParty() {
        let client = dgram.createSocket("udp4");

        client.on("listening", () => { client.setBroadcast(true); });
        client.bind(2743);

        client.on("message", (message: string, rinfo: any) => {
            console.log(`Message from: ${rinfo.address}:${rinfo.port} - ${message}`); 
        });
    }

    private makeAParty() {
        let server = dgram.createSocket("udp4");
        server.bind(() => { 
            server.setBroadcast(true);
            setInterval(broadcastGame, 3000);
        });

        const broadcastGame = () => {
            let message = new Buffer("Partie de Toinane");
            server.send(message, 0, message.length, 2743, "255.255.255.255");
        };
    }
}