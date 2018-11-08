const argv = require('minimist')(process.argv.slice(2));
const nats = require('nats');
const servers = ['nats://localhost:4222'];
//const servicename = 'service' 
//console.log(argv)
let servicename = argv.name? argv.name: 'default';

console.logCopy = console.log.bind(console);
console.log = function(){
    this.logCopy('['+servicename+']', arguments[0]);
};

// Randomly connect to a server in the cluster group.
let nc = nats.connect({'servers': servers});

// currentServer is the URL of the connected server.
console.log("Connected to " + nc.currentServer.url.host);

// Simple Subscriber
nc.subscribe('testPublish',function(msg) {
    console.log(parsing(msg));
});

// Subscribe on group queue
nc.subscribe('testPublishOnQueue',{'queue':'job.workers'},function(msg) {
    console.log(parsing(msg));
});

// Simple Subscriber with Replies
nc.subscribe('testRequest', function(msg, replyTo) {
    console.log(parsing(msg));
    if(replyTo){
        //console.log(replyTo);
        nc.publish(replyTo, 'Respone "'+JSON.stringify(parsing(msg))+'" from '+servicename+'!');
    }
});

// Simple Subscriber with Replies
nc.subscribe('testRequestOne', function(msg, replyTo) {
    console.log(parsing(msg));
    if(replyTo){
        //console.log(replyTo);
        nc.publish(replyTo, 'Respone "'+JSON.stringify(parsing(msg))+'" from '+servicename+'!');
    }
});

function parsing(string){
    let obj = IsJsonString(string)? JSON.parse(string): {};
    let name = obj.name? obj.name: '';
    let msg = obj.text? obj.text: '';
    let counts = msg.split('');
    return {from: name, text: msg, counts: counts.length}
}

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}


