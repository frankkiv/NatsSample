### Nats 簡單概念
* 架設Nats Server (via docker)
```
docker  run -d -p 4222:4222 --name nats nats 

// -p => specify the port access to docker
// —name => describe the name
``` 
* 或是使用官方demo server 

```
['nats://demo.nats.io:4222', 'nats://demo.nats.io:5222', 'nats://demo.nats.io:6222']
```
* Nats Client (https://github.com/nats-io/node-nats)

