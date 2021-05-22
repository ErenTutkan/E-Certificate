pragma solidity 0.7.0;
pragma experimental ABIEncoderV2;
// SPDX-License-Identifier: MIT
contract DigitalCertificate{
   
   struct University{
       string universityname;
       bool isFlag;
   }
    
    struct Certificate{
        string studentname;
        string department;
        University universitydata;
        string startingtime;
        string graduationtime;
        string average;
        uint blocktimestamp;
        
    }
    struct CertificateList{
        bytes32 hash;
        string studentname;
        string department;
        string universityname;
    }
    struct BlockList{
        string reasonforblocking;
        bool isFlag;
    }
    
    bytes32  public hash;
    CertificateList[] certificatelist;
     uint public totalcertificate=0;
    address public superadminaddress =msg.sender;

    mapping(address=>University) public university;
    mapping(bytes32=>Certificate) public certificates;
    event GenerateCertificate(bytes32 hash);

   function uint2str(uint _i) internal pure returns (string memory _uintAsString) {
    if (_i == 0) {
        return "0";
    }
    uint j = _i;
    uint len;
    while (j != 0) {
        len++;
        j /= 10;
    }
    bytes memory bstr = new bytes(len);
    uint k = len - 1;
    while (_i != 0) {
        bstr[k--] = byte(uint8(48 + _i % 10));
        _i /= 10;
    }
    return string(bstr);
}
  
     function strConcat(string memory _base, string memory _value) internal returns (string memory) {
        bytes memory _baseBytes = bytes(_base);
        bytes memory _valueBytes = bytes(_value);

        string memory _tmpValue = new string(_baseBytes.length + _valueBytes.length);
        bytes memory _newValue = bytes(_tmpValue);

        uint i;
        uint j;

        for(i=0; i<_baseBytes.length; i++) {
            _newValue[j++] = _baseBytes[i];
        }

        for(i=0; i<_valueBytes.length; i++) {
            _newValue[j++] = _valueBytes[i++];
        }

        return string(_newValue);
    }
    
 
    function Login(address _address) public view returns(uint){// Tamamlandı.
        if(_address==superadminaddress)
        {
            return 1;
        }
        else if(university[_address].isFlag!=false){
            return 2;
        }
        else{
            return 0;
        }
    }
    
    function getUniversity(address _address) public view returns(string memory){//data geliyor
        require(university[_address].isFlag!=false,"Boyle Bir Adres Yok");
        University memory temp=university[_address];
        return(temp.universityname);
    }
    
    function addUniversity(address _address, string memory _universityname) public {
        
        if(msg.sender==superadminaddress ){
            if(university[_address].isFlag !=true){
               university[_address].universityname=_universityname;
               university[_address].isFlag=true;
               totalcertificate++;
            }
            else {
                revert("Ayni Adrese Sahip Universite Bulunuyor.");
            }
        }
    else{
        revert("Sadece Admin Ekleme yapabilir.");
        }
    
    }
    
    function generateCertificate(string memory _studentname,string memory _department,string memory _startingtime,string memory _graduationtime,string memory _average) public {
          if(university[msg.sender].isFlag!=false){
          
          uint _timestamp=block.timestamp;
             bytes32 hash_id=sha256(abi.encodePacked(strConcat(_studentname,uint2str( block.timestamp))));
     //   certificates.push(Certificate({studentname:_studentname,universitydata,startingtime:_startingtime,graduationtime:_graduationtime,average:_average}));
     hash=hash_id;
     certificates[hash_id].studentname=_studentname;
     certificates[hash_id].department=_department;
     certificates[hash_id].universitydata=university[msg.sender];
     certificates[hash_id].startingtime=_startingtime;
     certificates[hash_id].graduationtime=_graduationtime;
     certificates[hash_id].average=_average;
     certificates[hash_id].blocktimestamp=_timestamp;
     certificatelist.push(CertificateList(hash_id,_studentname,_department,university[msg.sender].universityname));
     totalcertificate++;
     
     emit GenerateCertificate(hash_id);
      }
      else{
          revert("Ekleme Yetkiniz Yok.");
      }
        
    }
    function getTotalCertificate() public returns (uint){
        return totalcertificate;
    }
    function getData(bytes32 _id) public view returns(string memory,string memory,string memory,string memory,string memory,string memory,uint){
        Certificate memory temp=certificates[_id];
         return (temp.studentname,temp.department,temp.universitydata.universityname,temp.startingtime,temp.graduationtime,temp.average,temp.blocktimestamp);
        
    }
    
          function getCertificateList(uint _index,address _address)public view returns(bytes32,string memory,string memory){
                
                
                if(university[_address].isFlag==true && keccak256(abi.encodePacked(university[_address].universityname))==keccak256(abi.encodePacked(certificatelist[_index].universityname))){
                      return (certificatelist[_index].hash,certificatelist[_index].studentname,certificatelist[_index].department); 
                }
                else{
                    
                }
      

        }
    
    
    
}