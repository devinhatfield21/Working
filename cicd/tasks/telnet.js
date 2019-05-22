const config = require("../config");
async function connectToDevice(params) {
    // get references to the required stuff
    var TelnetSocket, net, socket, tSocket;

    net = require("net");

    ({TelnetSocket} = require("telnet-stream"));

    // create a Socket connection
    socket = net.createConnection(8085, params.device.ip);

    // decorate the Socket connection as a TelnetSocket
    tSocket = new TelnetSocket(socket);

    // if we get any data, display it to stdout
    tSocket.on("data", function (buffer) {
        const decors = [
            {
                token: /((^[0-9]*:\*).*$)/gim,
                color: '\x1b[46m'
            },
            {
                token: /(\*)/gm,
                color: '\x1b[34m'
            },
            {
                token: /(- Success)/gm,
                color: '\x1b[32m'
            }
        ]
        const brColors = ['\x1b[95m', '\x1b[33m', '\x1b[31m'];
        const bsDecors = [
            ["sub", "end", "function", "as", "return", "if", "for", "else", "while"],
            ["String", "Object", "Integer", "Boolean", "Void"],
            ["invalid", "\\[Error\\]"]
        ].map((k, index) => {
            return {
                token: new RegExp(`(\\W(${k.join('|')}))`, 'gim'),
                color: brColors[index]
            }
        }).concat([
            {
                token: new RegExp(/(".*")/gim),
                color: '\x1b[36m'
            }
        ])
        let output = buffer.toString("utf8");
        
        if (params.mode && params.mode.name === 'TEST' && global.inputTestResult) {
            testResults = output.match(config.testResultRegexp)
            output = (testResults && testResults.length && testResults.join("\n")) || ""
        }

        decors.concat(bsDecors).forEach(d => {
            output = output.replace(d.token, d.color+ '\$1' + "\x1b[0m");
        })

        return process.stdout.write(output);
    });
    process.openStdin();
    process.stdin.on("data", function (buffer) {
        return tSocket.write(buffer.toString("utf8") + "\r\n");
    });
}
function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}
function decorUnitTest(str) {

}

module.exports = {
    run: connectToDevice
};
