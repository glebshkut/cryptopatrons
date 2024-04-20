/**
 * This file is autogenerated by Scaffold-ETH.
 * You should not edit it manually or your changes might be overwritten.
 */
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const deployedContracts = {
  421614: {
    CryptoPatrons: {
      address: "0x32f069422B3f155ba074433f0dA2D66136850761",
      abi: [
        {
          inputs: [],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "string",
              name: "username",
              type: "string",
            },
            {
              indexed: false,
              internalType: "string",
              name: "goalDescription",
              type: "string",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "goalAmount",
              type: "uint256",
            },
          ],
          name: "DonationGoalCreated",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "string",
              name: "username",
              type: "string",
            },
            {
              indexed: false,
              internalType: "string",
              name: "donorName",
              type: "string",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "string",
              name: "message",
              type: "string",
            },
          ],
          name: "DonationMade",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "string",
              name: "username",
              type: "string",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "DonationWithdrawn",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "feePercentage",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "minimumRequiredFeeUSD",
              type: "uint256",
            },
          ],
          name: "FeesUpdated",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "previousOwner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "OwnershipTransferred",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "string",
              name: "username",
              type: "string",
            },
          ],
          name: "ProfileUpdated",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "usdAmount",
              type: "uint256",
            },
          ],
          name: "_convertUSDToETH",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "username",
              type: "string",
            },
            {
              internalType: "string",
              name: "description",
              type: "string",
            },
            {
              internalType: "string",
              name: "profilePictureURL",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "minDonationUSD",
              type: "uint256",
            },
          ],
          name: "createProfile",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "feePercentage",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "username",
              type: "string",
            },
          ],
          name: "getAllDonations",
          outputs: [
            {
              components: [
                {
                  internalType: "string",
                  name: "donorName",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "message",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "timestamp",
                  type: "uint256",
                },
              ],
              internalType: "struct CryptoPatrons.Donation[]",
              name: "",
              type: "tuple[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getAllProfiles",
          outputs: [
            {
              components: [
                {
                  internalType: "string",
                  name: "username",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "description",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "profilePictureURL",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "minDonationUSD",
                  type: "uint256",
                },
              ],
              internalType: "struct CryptoPatrons.CreatorProfile[]",
              name: "",
              type: "tuple[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "username",
              type: "string",
            },
          ],
          name: "getDonationsAmount",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getLatestPrice",
          outputs: [
            {
              internalType: "int256",
              name: "",
              type: "int256",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "username",
              type: "string",
            },
          ],
          name: "getProfile",
          outputs: [
            {
              components: [
                {
                  internalType: "string",
                  name: "username",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "description",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "profilePictureURL",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "minDonationUSD",
                  type: "uint256",
                },
              ],
              internalType: "struct CryptoPatrons.CreatorProfile",
              name: "",
              type: "tuple",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "username",
              type: "string",
            },
          ],
          name: "getProfileOwner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "username",
              type: "string",
            },
            {
              internalType: "string",
              name: "donorName",
              type: "string",
            },
            {
              internalType: "string",
              name: "message",
              type: "string",
            },
          ],
          name: "makeDonation",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [],
          name: "minimumRequiredFeeUSD",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "renounceOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "transferOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_feePercentage",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_minimumRequiredFeeUSD",
              type: "uint256",
            },
          ],
          name: "updateFeeSettings",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "username",
              type: "string",
            },
            {
              internalType: "string",
              name: "description",
              type: "string",
            },
            {
              internalType: "string",
              name: "profilePictureURL",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "minDonationUSD",
              type: "uint256",
            },
          ],
          name: "updateProfile",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "username",
              type: "string",
            },
          ],
          name: "withdrawDonations",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "withdrawFees",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      inheritedFunctions: {
        owner: "@openzeppelin/contracts/access/Ownable.sol",
        renounceOwnership: "@openzeppelin/contracts/access/Ownable.sol",
        transferOwnership: "@openzeppelin/contracts/access/Ownable.sol",
      },
    },
  },
} as const;

export default deployedContracts satisfies GenericContractsDeclaration;
