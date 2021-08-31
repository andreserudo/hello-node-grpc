const path = require('path');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const PORT  = '0.0.0.0:50051';
const packageDefinition = protoLoader.loadSync(path.resolve(__dirname, 'pb', 'hello_message.proto'));
const proto = grpc.loadPackageDefinition(packageDefinition);

const Greetings = ({ request: {name}}, callback) => {
    return  callback(null, { message: `Hello ${name}` });
}

const server = new grpc.Server();
    
server.addService(proto.HelloService.service, { Greetings });

server.bind(PORT, grpc.ServerCredentials.createInsecure());
console.log(`runing at ${PORT}`);
server.start();
