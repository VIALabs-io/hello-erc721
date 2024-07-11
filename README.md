# HelloERC721

`HelloERC721` is an `ERC721` token implementation showcasing cross-chain NFT functionality without the need for traditional bridges, making the NFT cross-chain native. Utilizing the VIA Labs package it is trivial to add native cross-chain functionality to any NFT contract. Below is a bare-bones `ERC721` contract to showcase the ease of use. 

## Features

-   **ERC721 NFT Implementation**: A standard `ERC721` NFT
-   **Cross-Chain Functionality**: Native support for cross-chain interactions without using a bridge.
-   **VIA Labs Integration**: Leverages the VIA Labs package for seamless cross-chain communication.
-   **Configurable on Multiple Networks**: Can be deployed and configured across various blockchain networks.

## Prerequisites

Before you begin, ensure you have the following installed:

-   Node.js and npm (Node Package Manager)
-   A text editor such as VSCode for editing `.sol` and `.ts` files
-   GIT installed
- Testnet Tokens ([ethereum sepolia faucet](https://chainstack.com/sepolia-faucet/) and [polygon testnet faucet](https://faucet.polygon.technology/))

Please visit [node documentation link](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and the [git install documentation](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) for more information.

## Installation

Please open a terminal to run the following commands. You can use any terminal of your choice, including the built in terminal in vscode (Terminal -> New Terminal)

1. **Clone the Repository**:

```bash
git clone https://github.com/VIALabs-io/hello-erc721.git
```

2. After cloning the repository, if using vscode or a similar IDE, you can now open the hello-erc721 in your IDE of choice.
```bash
code hello-erc721
```

3. **Install Dependencies**:
In vscode (Terminal -> New Terminal)
```
npm install
```

4. **Set Up Environment Variables**:
   Create a new `.env` file to set your EVM private key for contract deployment or copy and edit the existing `.env.example` to `.env`
```
PRIVATE_KEY=0000000000000000000000000000
```

## Deployment

Deploy the `HelloERC721` contract to your desired networks. This must be done for each network you wish to operate on. You can see a list of our networks in the [Package documentation](https://github.com/VIALabs-io/contracts?tab=readme-ov-file#testnets)

1. **Ethereum Sepolia Deployment:**

```bash
npx hardhat --network ethereum-sepolia deploy
```

2. **Polygon Testnet Deployment:**

```bash
npx hardhat --network polygon-amoy deploy
```

## Configuration

Edit the `networks.ts` file and include all of the networks the contract is deployed on.

```javascript
[
    "ethereum-sepolia",
    "polygon-amoy"
]
```

Once all contracts are deployed across the desired networks and listed in `networks.ts`, configure them using the provided script. Remember, if a new network is added later, all contracts must be reconfigured.

1. **Ethereum Sepolia Configuration:**

```bash
npx hardhat --network ethereum-sepolia configure
```

2. **Polygon Testnet Configuration:**

```bash
npx hardhat --network polygon-amoy configure
```

## Usage

### Minting an NFT

To mint an NFT on a chain:

```bash
npx hardhat --network polygon-amoy mint-nft
```

You will get the next available NFT. NFTs start at [chain-id]0000 so the first NFT minted on Polygon Amoy Testnet will be 800020000 and the next 800020001 etc.. You can look up the chain ids in the [Package documentation](https://github.com/VIALabs-io/contracts?tab=readme-ov-file#testnets). You can also look up the transaction on the testnet explorer to see the NFT details using your wallet address.

### Viewing NFT Details

To view the details of an NFT including its Metadata and Owner:

```bash
npx hardhat --network polygon-amoy get-nft ---nftid 800020000
```

### Bridging NFTs to Another Chain

To send NFTs to another chain it is required to set the `--dest` parameter to the destination chain id. The example below uses the id for the Ethereum Sepolia testnet. Chain IDs can be looked up in the [Package documentation](https://github.com/VIALabs-io/contracts?tab=readme-ov-file#testnets).

```bash
npx hardhat --network polygon-amoy bridge-nft --dest 11155111 --nftid 800020000
```

## Contract Breakdown of HelloERC721

The `HelloERC721` contract is an example of an ERC721 token designed for cross-chain operations, leveraging the VIA Labs framework for seamless blockchain interactions.

### Key Features

- **ERC721 Token**: Inherits from OpenZeppelin's ERC721 standard.
- **Cross-Chain Functionality**: Enabled via the MessageClient from the `@vialabs-io/contracts` package.
- **Unique NFT ID Generation**: Utilizes the blockchain's chain ID to generate unique NFT IDs.

### Constructor
```solidity
constructor() ERC721("Hello ERC721!", "H721") {
    nextNftId = block.chainid * 10**4;
}
```
Initializes the NFT with a unique name and symbol, and sets up the initial NFT ID based on the blockchain's chain ID.

### Mint Function
```solidity
function mint() external {
    _mint(msg.sender, nextNftId);
    nextNftId++;
}
```
Allows users to mint a new NFT. The NFT ID is automatically incremented after each minting.

### Bridge Function
```solidity
function bridge(uint _destChainId, address _recipient, uint _nftId) external {
    // Implementation details...
}
```
Enables NFTs to be bridged to a different chain. The NFT is burned on the current chain and a message is sent for minting on the destination chain.

### Message Processing
```solidity
function messageProcess(uint, uint _sourceChainId, address _sender, address, uint, bytes calldata _data) external override {
    // Implementation details...
}
```
Handles incoming messages for cross-chain NFT minting.

### Token URI
```solidity
function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
    // Implementation details...
}
```
Generates a token URI for each NFT, providing its metadata in a base64-encoded JSON format.
