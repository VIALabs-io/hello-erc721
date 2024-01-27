import { task } from "hardhat/config";

task("get-nft", "")
	.addParam("nftid", "NFT ID")
	.addOptionalParam("signer", "Custom signer (private key)")
	.addOptionalParam("provider", "Custom provider RPC url")
	.setAction(async (args, hre:any) => {
		const ethers = hre.ethers;
		const [deployer] = await ethers.getSigners();
        
		let signer = deployer;
		if (args.signer) signer = new ethers.Wallet(args.signer, new ethers.providers.JsonRpcProvider(args.provider));

		const helloERC721 = await ethers.getContract("HelloERC721");
		const owner = await helloERC721.ownerOf(args.nftid);
		const meta = await helloERC721.tokenURI(args.nftid);
		console.log('owner',owner);
		console.log('metadata',meta);
	});

