const path = require('path');
const grpc = require('grpc');
const PORT  = '0.0.0.0:50051';
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(path.resolve(__dirname, 'pb', 'hello_message.proto'));
const clientProto = grpc.loadPackageDefinition(packageDefinition);
const client = new clientProto.HelloService(
    PORT,
    grpc.credentials.createInsecure()
);

client.Greetings({name: 'Andre'}, (err, response) => {
    if(err) console.log(err)
    else {
        const { message } = response;
        console.log(message);
    };
})