echo "************************************************************************"
echo "************************        Org 2        ***************************"
echo "************************************************************************"

echo "Sleeping 3 sec"
sleep 3
# ==== Invoke Supplier ====
peer chaincode invoke -o orderer.example.com:7050 \
    --tls true \
    --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem \
    -C mychannel \
    -n mycc \
    --peerAddresses peer0.org1.example.com:7051 \
    --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt \
    --peerAddresses peer0.org2.example.com:9051 \
    --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt \
    --peerAddresses peer0.org3.example.com:11051 \
    --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.example.com/peers/peer0.org3.example.com/tls/ca.crt \
    -c '{"Args":["initSupplier","Sahil","Earth","12345678","S1!", "100000"]}'

echo "Sleeping for 5 sec"
sleep 5

peer chaincode query -C mychannel -n mycc -c  '{"Args":["readSupplier","Sahil12345678"]}'

