import { task } from "hardhat/config";

task("mint-nft", "")
	.addOptionalParam("signer", "Custom signer (private key)")
	.addOptionalParam("provider", "Custom provider RPC url")
	.setAction(async (args, hre: any) => {
		const ethers = hre.ethers;
		const [deployer] = await ethers.getSigners();

		let signer = deployer;
		if (args.signer) signer = new ethers.Wallet(args.signer, new ethers.providers.JsonRpcProvider(args.provider));

		const helloERC721 = await ethers.getContract("HelloERC721");
		await helloERC721.connect(signer).mint();
		console.log("minted nft to", signer.address);
	});
