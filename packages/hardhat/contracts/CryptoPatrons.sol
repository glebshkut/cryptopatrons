//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./AggregatorV3Interface.sol";
// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * A smart contract that allows making donations to creators.
 * It also allows the owner to withdraw the Ether in the contract
 * @author glebshkut
 */
contract CryptoPatrons is Ownable {
	AggregatorV3Interface internal priceFeed;

	constructor() {
		priceFeed = AggregatorV3Interface(
			0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419
		);
	}

	struct CreatorProfile {
		string name;
		string username;
		string description;
		string profilePictureURL;
		uint minDonationUSD;
		string[] prohibitedWords;
	}

	struct Donation {
		string donorName;
		string message;
		uint amount;
		uint timestamp;
	}

	// Events
	event ProfileUpdated(string username);
	event DonationMade(
		string username,
		string donorName,
		uint amount,
		string message
	);
	event DonationGoalCreated(
		string username,
		string goalDescription,
		uint goalAmount
	);
	event FeesUpdated(uint feePercentage, uint minimumRequiredFeeUSD);
  event DonationWithdrawn(string username, uint amount);

	mapping(string => CreatorProfile) private _profiles;
	mapping(string => Donation[]) private _donations;
	mapping(string => address) private _profileOwners;
	mapping(string => uint) private _donationsAmount;

	uint public feePercentage = 0;
	uint public minimumRequiredFeeUSD = 0;
	uint private collectedFees = 0;

	// Function to update fee settings by the contract owner
	function updateFeeSettings(
		uint _feePercentage,
		uint _minimumRequiredFeeUSD
	) public onlyOwner {
		feePercentage = _feePercentage;
		minimumRequiredFeeUSD = _minimumRequiredFeeUSD;
		emit FeesUpdated(_feePercentage, _minimumRequiredFeeUSD);
	}

	function getLatestPrice() public pure returns (int) {
		// (, int price, , , ) = priceFeed.latestRoundData();
		return 3456;
	}

	function getAllDonations(
		string memory username
	) public view returns (Donation[] memory) {
		return _donations[username];
	}

	function getProfile(
		string memory username
	) public view returns (CreatorProfile memory) {
		require(
			bytes(_profiles[username].name).length != 0,
			"Profile does not exist"
		);
		return _profiles[username];
	}

	// Function for making donations
	function makeDonation(
		string memory username,
		string memory donorName,
		string memory message
	) public payable {
		uint minDonationETH = _convertUSDToETH(
			_profiles[username].minDonationUSD
		);
		require(
			msg.value >= minDonationETH,
			"Donation below minimum requirement"
		);

		// Calculate and collect fee
		uint feeAmount = (msg.value * feePercentage) / 100;
		uint minimumRequiredFeeETH = _convertUSDToETH(minimumRequiredFeeUSD);
		if (feeAmount < minimumRequiredFeeETH) {
			feeAmount = minimumRequiredFeeETH;
		}
		collectedFees += feeAmount;

		// Ensure the net donation amount (after fees) is still above the minimum donation requirement
		require(
			msg.value - feeAmount >= minDonationETH,
			"Net donation after fees is below minimum requirement"
		);

		// Store the donation after deducting the fee
		_donations[username].push(
			Donation(donorName, message, msg.value - feeAmount, block.timestamp)
		);
		_donationsAmount[username] += msg.value - feeAmount;
		emit DonationMade(username, donorName, msg.value - feeAmount, message);
	}

	// Function to withdraw collected fees
	function withdrawFees() public onlyOwner {
		require(collectedFees > 0, "No fees to withdraw");
		payable(owner()).transfer(collectedFees);
		collectedFees = 0;
	}

	// Add existing contract functions here...
	function _convertUSDToETH(uint usdAmount) public pure returns (uint) {
		int price = getLatestPrice();
		require(price > 0, "Invalid price data");
		uint ethPriceInUsd = uint(price); // Convert price to uint
		uint ethAmount = (usdAmount * 1e18) / ethPriceInUsd;
		return ethAmount;
	}

	// Function to update creator profile (Only creator can update their profile)
	function updateProfile(
		string memory username,
		string memory name,
		string memory description,
		string memory profilePictureURL,
		uint minDonationUSD,
		string[] memory prohibitedWords
	) public {
		// Only the profile owner can update the profile.
		require(
			_profileOwners[username] == msg.sender,
			"Not authorized to update this profile"
		);
		_profiles[username] = CreatorProfile(
			name,
			username,
			description,
			profilePictureURL,
			minDonationUSD,
			prohibitedWords
		);
		emit ProfileUpdated(username);
	}

	function createProfile(
		string memory username,
		string memory name,
		string memory description,
		string memory profilePictureURL,
		uint minDonationUSD,
		string[] memory prohibitedWords
	) public {
		require(
			_profileOwners[username] == address(0),
			"Username already taken"
		);

		_profiles[username] = CreatorProfile(
			name,
			username,
			description,
			profilePictureURL,
			minDonationUSD,
			prohibitedWords
		);
		_profileOwners[username] = msg.sender;

		emit ProfileUpdated(username);
	}

	// Function to withdraw donations
	function withdrawDonations(string memory username) public {
		require(
			_profileOwners[username] == msg.sender,
			"Not authorized to withdraw funds for this profile"
		);
		uint amountAvailable = _donationsAmount[username];
		require(amountAvailable > 0, "No donations to withdraw");
		payable(msg.sender).transfer(amountAvailable);
		_donationsAmount[username] = 0;
		emit DonationWithdrawn(username, amountAvailable);
	}
}
