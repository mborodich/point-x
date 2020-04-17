pragma solidity >=0.4.0 <0.7.0;


library ItemsLib {

    struct Kind {
        uint count;
        mapping (uint => Item) items;
    }

    struct Store {
        uint8 count;
        mapping (uint8 => string) names;
        mapping (string => Kind) kinds;
    }

    struct Item {
		string caption;
		string description;
		string image;
		uint value;
		address owner;
		uint8 itemType;
		uint8 status;
		bytes data;
		uint totalAmount;
		uint resultsAmount;
		mapping (address => uint) accToNum;
		mapping (uint => address) numToAcc;
		mapping (address => bytes) results;
    }

    function _addKind(Store storage s, string memory name) internal {
        s.count += 1;
        s.names[s.count] = name;
    }

    function _addItem(Store storage s, string memory k,
		string memory caption,
		string memory description,
		string memory image,

		uint value,
		address owner,
		uint8 itemType,
		bytes memory data,
		uint totalAmount
    	) internal
    {
        s.kinds[k].count += 1;

        s.kinds[k].items[s.kinds[k].count] = Item(
        	caption, description, image,
        	value, owner, itemType, 0, data, totalAmount, 0);
    }

    function _addResult(Store storage s, string memory k, uint i, address account, bytes memory data) internal {
    	// TODO: require no records for account before
    	s.kinds[k].items[i].resultsAmount += 1;
    	uint num = s.kinds[k].items[i].resultsAmount;
    	s.kinds[k].items[i].accToNum[account] = num;
    	s.kinds[k].items[i].numToAcc[num] = account;

		s.kinds[k].items[i].results[account] = data;
    }

    function _setStatus(Store storage s, string memory k, uint i, uint8 status) internal {
    	s.kinds[k].items[i].status = status;
    }

    function _exist(Store storage s, string memory k, uint i) internal view returns (bool) {
        require(i != 0, "Items: zero number");

        return s.kinds[k].items[i].status > 0;
    }
}
