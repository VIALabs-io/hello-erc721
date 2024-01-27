import { task } from "hardhat/config";

task("transfer-nft", "")
    .addParam("recipient", "Recipient")
	.addParam("nftid", "NFT id")
	.addOptionalParam("signer", "Custom signer (private key)")
	.addOptionalParam("provider", "Custom provider RPC url")
	.setAction(async (args, hre:any) => {
		const ethers = hre.ethers;
		const network = hre.network.name;
		const [deployer] = await ethers.getSigners();
        
		let signer = deployer;
		if (args.signer) signer = new ethers.Wallet(args.signer, new ethers.providers.JsonRpcProvider(args.provider));

		const helloERC20 = await ethers.getContract("HelloERC20");

		await(await helloERC20.connect(signer).transfer(args.recipient, args.nftid)).wait();
		console.log('sent nft id', args.nftid, 'to', args.recipient);
	});
