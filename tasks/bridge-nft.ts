import { task } from "hardhat/config";

task("bridge-nft", "")
    .addParam("dest", "Destination chain id")
	.addParam("nftid", "NFT id")
	.addOptionalParam("recipient", "Send to different wallet on destination")
	.addOptionalParam("wallet", "Custom wallet")
	.addOptionalParam("signer", "Custom signer (private key)")
	.addOptionalParam("provider", "Custom provider RPC url")
	.setAction(async (args, hre:any) => {
		const ethers = hre.ethers;
		const [deployer] = await ethers.getSigners();
        
		let signer = deployer;
		let recipient = deployer.address;
		if (args.signer) signer = new ethers.Wallet(args.signer, new ethers.providers.JsonRpcProvider(args.provider));
		if (args.recipient) recipient = args.recipient;

		const helloERC721 = await ethers.getContract("HelloERC721");

		await helloERC721.connect(signer).bridge.estimateGas(args.dest, recipient, args.nftid);
		await(await helloERC721.connect(signer).bridge(args.dest, recipient, args.nftid)).wait();

		console.log('sent nft id',args.nftid,'to', recipient, 'on chain id', args.dest);
	});
