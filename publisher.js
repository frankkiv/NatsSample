const nats = require('nats');
//const servers = ['nats://demo.nats.io:6222','nats://demo.nats.io:5222','nats://demo.nats.io:4222' ];
const servers = ['nats://localhost:4222'];
const servicename = 'publisher' 

// Randomly connect to a server in the cluster group.
let nc = nats.connect({'servers': servers});

// currentServer is the URL of the connected server.
console.log("Connected to " + nc.currentServer.url.host);

function testPublisher(){
    // Test Publisher
    nc.publish('testPublish', JSON.stringify({name: servicename, text: 'testPublish'}), function(response) {
        console.log('Test Publish OK');
    });
}
function testPublishOnQueue(){
    // Test Publisher on Group queue
    nc.publish('testPublishOnQueue',JSON.stringify({name: servicename, text: 'testPublishOnQueue'}),function(response) {
        console.log('Test Publish On Queue OK');
    });
}
function testRequest(){
    //test request
    nc.request('testRequest', JSON.stringify({name: servicename, text: 'testRequest'}), {'max':10}, function(response) {
        console.log('Test Request: reponse from' + response);
    });
}
function testRequestOne(){
    // Test RequestOne
    nc.requestOne('testRequestOne', JSON.stringify({name: servicename, text: 'testRequestOne'}), {}, 1000, function(response) {
        // `NATS` is the library.
        if(response instanceof nats.NatsError && response.code === nats.REQ_TIMEOUT) {
        console.log('Request for help timed out.');
        return;
        }
        console.log('Test RequestOne: reponse from' + response);
    });
}
function line(){
    console.log('----------------------')
}

function sleep (fn, delay) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(fn()), delay)
    })
}

async function workflow(){
    await sleep(testPublisher, 0);
    await sleep(line,0);
    await sleep(testPublishOnQueue, 3000)
    await sleep(line,0);
    await sleep(testRequest, 3000)
    await sleep(line,0);
    await sleep(testRequestOne, 3000)
    await sleep(line,0);
}
workflow();
