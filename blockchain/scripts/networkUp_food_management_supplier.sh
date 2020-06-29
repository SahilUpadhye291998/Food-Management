echo "Channel name : mychannel"

CRC_SRC_PATH="/opt/gopath/src/github.com/chaincode/insurance/node/"

echo "************************************************************************"
echo "************************For Organization 2******************************"
echo "************************************************************************"

CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
CORE_PEER_ADDRESS=peer0.org2.example.com:9051
CORE_PEER_LOCALMSPID="Org2MSP"
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt

echo "==================Joining for peer0.org2.example.com:9051======================="
peer channel join -b mychannel.block
echo "======================================================"

echo "==================Update anchor peers for peer0.org1.example.com====================="
peer channel update -o orderer.example.com:7050 -c mychannel -f ./channel-artifacts/Org2MSPanchors.tx --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
echo "======================================================="

echo "==================channel install for peer0.org1.example.com====================="
peer chaincode install -n mycc -v 1.0 -l node -p /opt/gopath/src/github.com/chaincode/customer/node/
echo "====================================================="
