## Nats Demo Sample

### Server Side
* Create your Nats Server (via docker)
```console=
docker  run -d -p 4222:4222 --name nats nats 

// -p => specify the port access to docker
// —name => describe the name
``` 
* Use the offical demo server 

```console=
['nats://demo.nats.io:4222', 'nats://demo.nats.io:5222', 'nats://demo.nats.io:6222']
```

### Client Side
* How to use?
```javascript=
// Create the service to subscribe
node client.js --name 'servicename'

// run the publish services 
node publish.js
```
* check few api
    * nats.publish => Broadcast 
    * nats.request => Broadcast and wait for the responese back
    * nats.requestOne => Broadcast and wait for the first response
    * nats.subscribe => Recive the subscribe subject msg. If the subscriber subscribe on the same group queu, only one of subscriber get the msg. (use case: the cluster of service suscribe to the same group queue. )

* Reference https://github.com/nats-io/node-nats

### Demo

#### Workflow: 
1. Create 3 service as subscriber, then run the publisher.
2. Publisher publish the message on subject 'testPublish'. All of the subscribers receive the message.
3. Publisher publish the message on subject 'testPublishOnQueue'. All of the subscribers subscribe on the same group, so only one of the subscriber can receive the message.
4. Publisher request the message on subject 'testRequest'. All of the subscribers receive the message and send response back to publisher.
5. Publisher request the message on subject 'testRequestOne'. All of the subscribers receive the message and publisher only receive the first reponse.

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/qLYdwjQoiTA/0.jpg)](http://www.youtube.com/watch?v=qLYdwjQoiTA)

