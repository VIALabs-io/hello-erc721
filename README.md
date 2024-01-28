# HelloERC721

HelloERC721 is an ERC721 token implementation showcasing cross-chain NFT functionality without the need for traditional bridges. Utilizing advanced smart contract techniques, it exemplifies a novel approach to NFT minting, transferring, and bridging across different blockchain networks.

## Features

-   **ERC721 NFT Implementation**: A standard ERC721 NFT
-   **Cross-Chain Functionality**: Native support for cross-chain interactions without using a bridge.
-   **CryptoLink.Tech Integration**: Leverages the CryptoLink.Tech NPM package for seamless cross-chain communication.
-   **Configurable on Multiple Networks**: Can be deployed and configured across various blockchain networks.

## Prerequisites

Before you begin, ensure you have the following installed:

-   Node.js and npm (Node Package Manager)
-   A text editor such as VSCode for editing `.sol` and `.ts` files
-   GIT installed

Please visit [node documentation link](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and the [git install documentation](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) for more information.

## Installation

Please open a terminal to run the following commands. You can use any terminal of your choice, including the built in terminal in vscode (Terminal -> New Terminal)

1. **Clone the Repository**:

    ```
    git clone https://github.com/CryptoLinkTech/hello-erc721.git
    ```

    After cloning the repository, if using vscode or a similar IDE, you can now open the hello-erc721 in your IDE of choice.

2. **Install Dependencies**:

    ```
    npm install
    ```

3. **Set Up Environment Variables**:
   Create a new `.env` file to set your EVM private key for contract deployment or copy and edit the existing `.env.example` to `.env`
    ```
    PRIVATE_KEY=0000000000000000000000000000
    ```

## Deployment

Deploy the HelloERC721 contract to your desired networks. This must be done for each network you wish to operate on.

```
npx hardhat --network [network-name] deploy
```

## Configuration

Edit the `networks-testnet.json` file and include all of the networks the contract is deployed on.

```
[
    "fantom-testnet",
    "polygon-testnet",
    "sonic-testnet"
]
```

Once all contracts are deployed across the desired networks and listed in `networks-testnet.json`, configure them using the provided script. Remember, if a new network is added later, all contracts must be reconfigured.

```
npx hardhat --network [network-name] configure
```

## Usage

### Minting an NFT

To mint an NFT on a chain:

```
npx hardhat --network [network-name] mint-nft
```

You will get the next available NFT. NFTs start at [chain-id]0000 so the first NFT minted on Polygon Testnet will be 800010000 and the next 800010001 etc..

### Viewing NFT Details

To view the details of an NFT including its Metadata and Owner:

```
npx hardhat --network [network-name] get-nft ---nftid [nft-id]
```

### Bridging NFTs to Another Chain

To send NFTs to another chain:

```
npx hardhat --network [network-name] bridge-nft --dest [destination-chain-id] --nftid [nft-id]
```
