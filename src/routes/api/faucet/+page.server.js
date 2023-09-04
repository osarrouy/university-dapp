/** @type {import('@sveltejs/adapter-vercel').Config} */
export const config = {
  runtime: 'nodejs18.x'
};

import { ethers } from 'ethers';
 
export const load = async (request, response) => {
	console.log(process.env.PROJECT_ID)
	console.log(process.env.PROJECT_SECRET)

	const address = request.url.searchParams.get('address')
	const amountInEther = '0.01';

	let wallet = ethers.Wallet.fromPhrase('radio shy wolf unlock peanut shock olive entry cry honey page visa'); // 0x8cC0743af4C72866501F591D892e34c4167C8d19
	console.log('1')
	
	const provider = new ethers.InfuraProvider('goerli', process.env.PROJECT_ID, process.env.PROJECT_SECRET);
	console.log(provider.projectId)
	console.log(provider.projectSecret)

	const tx = {
		to: address,
		value: ethers.parseEther(amountInEther)
	};
	console.log('2')
	wallet = wallet.connect(provider);
	console.log('3')

	const receipt = await wallet.sendTransaction(tx);
	console.log('4')

	console.log(receipt.hash + ' => ' + address);
	console.log('Balance : ' + (await wallet.getBalance()).toString());

	 response.status(200).json({
    body: JSON.stringify({ status: 'OK' }),
		headers: {
			'access-control-allow-origin': '*'
		}
  });

 
}