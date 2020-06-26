
echo "************************************************************************"
echo "************************     Testing custom     ************************"
echo "************************************************************************"


echo "Sleeping 3 sec"
sleep 3
# ==== Invoke Transaction ====
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
    -c '{"Args":["addProductCustomerSupplier","xGod66612345678","Sahil12345678","product 1","1", "100"]}'

echo "Sleeping 3 sec"
sleep 3
# ==== Invoke marbles ====
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
    -c '{"Args":["addProductFarmerSupplier","FarmerTest12345678","Sahil12345678","product 2","10", "100"]}'

echo "Sleeping 3 sec"
sleep 3

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
    -c '{"Args":["addProductCustomerSupplier","xGod66612345678","Sahil12345678","product 2","1", "200"]}'

echo "Sleeping 3 sec"
sleep 3

#==== Invoke marbles ====
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
    -c '{"Args":["addProductFarmerSupplier","FarmerTest12345678","Sahil12345678","product 4","10", "100"]}'


echo "Sleeping for 5 sec"
sleep 3

peer chaincode query -C mychannel -n mycc -c  '{"Args":["readCustomer","xGod66612345678"]}'
echo ""
peer chaincode query -C mychannel -n mycc -c  '{"Args":["readSupplier","Sahil12345678"]}'
echo ""
peer chaincode query -C mychannel -n mycc -c  '{"Args":["readFarmer","FarmerTest12345678"]}'
echo ""
peer chaincode query -C mychannel -n mycc -c  '{"Args":["readCustomerSupplierData","xGod66612345678"]}'
echo ""
peer chaincode query -C mychannel -n mycc -c  '{"Args":["readSupplierFarmerData","Sahil12345678"]}'
echo ""
peer chaincode query -C mychannel -n mycc -c  '{"Args":["readSupplierCustomerData","Sahil12345678"]}'
echo ""
peer chaincode query -C mychannel -n mycc -c  '{"Args":["readFarmerSupplierData","FarmerTest12345678"]}'
echo ""
peer chaincode query -C mychannel -n mycc -c  '{"Args":["queryCustomerByOwnerAndPassword","xGod66612345678","A1!"]}'
echo ""
peer chaincode query -C mychannel -n mycc -c  '{"Args":["queryCustomerByOwner","xGod666"]}'
echo ""
peer chaincode query -C mychannel -n mycc -c  '{"Args":["getHistoryForCustomer","xGod66612345678"]}'
echo ""


