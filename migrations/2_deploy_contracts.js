const PointX = artifacts.require("PointX");

const RolesLib = artifacts.require("RolesLib");
const ItemsLib = artifacts.require("ItemsLib");
const Core = artifacts.require("Core");
const Getters = artifacts.require("Getters");

const TokenX = artifacts.require("TokenX");

// <DEV STUFF>
const { Mocks } = require('../src/utils/mocks');
const E16 = require('../src/utils/E16');
const admin =          '0x77cBFd20156d5a3dA59aF105853B3279abf84fb8';
const partner1 =       '0x281ba3dcC5d8C1D881287cdd637Fcb4Bd488Ae7d';
const partner2 =       '0x3643DbdD6cddeF41525d561D44Edf55dDa531a9C';
const partner3 =       '0x714DA679bA53Ac4423027dA81458c9095484a9b8';
const user1 =          '0x21338334d837526e16D370148DBF7234bE45839c';
const user2 =          '0xB89a894F618E9420765e9EdE22d523B6e211C610';
const user3 =          '0xaf0ED3787deAc9d296020C923A103b041D84B956';
const moderator =      '0x540Cb57f30586a81c5357bAbF4E6d1c50f548806';

let mocks = new Mocks([admin, partner1, partner2, partner3, user1, user2, user3, moderator]);
// </DEV STUFF>

const name = "TokenX";
const symbol = "PNTX";
const decimals = 18;


module.exports = (deployer) => {
	deployer.then(async () => {
		let rolesLib = await deployer.deploy(RolesLib);
		await deployer.link(RolesLib, Core)

		let itemsLib = await deployer.deploy(ItemsLib);
		await deployer.link(ItemsLib, Core)

		let core = await deployer.deploy(Core);
		await deployer.link(Core, PointX)
		await deployer.link(Core, Getters)

		let getters = await deployer.deploy(Getters);
		await deployer.link(Getters, PointX)

		let px = await deployer.deploy(PointX)
		let tx = await deployer.deploy(TokenX, name, symbol, decimals)
		await px.setToken(TokenX.address)
		await tx.addMinter(PointX.address)

		await tx.renounceMinter()

		// ------------ DEV MIGRATION, REMOVE IT BEFORE A PROD PUB
		let users = mocks.users()
		let partners = mocks.partners()
		let tasks = mocks.tasks()
		let rewards = mocks.rewards()

		await px.increaseContractEthBalance({value: 10**18})

		await px.addUserAndUnlockTasks(users[0].address)
		await px.addUserAndUnlockTasks(users[1].address)
		await px.addUserAndUnlockTasks(users[2].address)

		for (let i = 0; i < partners.length; i++) {
			let p = partners[i]
			await px.addPartner(p.address, p.name, p.description, p.logo)
			await px.addTokenBalance(p.address, 1000000)
			await tx.approve(PointX.address, 1000000, {from: p.address})

			let taskPack = Buffer.concat([
				Buffer.from([3, 3]),
				E16.encodePack(E16.encodeArr(tasks[i].questions))
			])

			await px.addTask(
				tasks[i].caption,
				tasks[i].description,
				tasks[i].imageLink,
				tasks[i].taskType,
				taskPack,
				tasks[i].reward,
				tasks[i].totalAmount,
				{ from: p.address }
			)
			await px.acceptTask(i + 1)

			await px.addReward(
				rewards[i].caption,
				rewards[i].description,
				rewards[i].imageLink,
				rewards[i].price,
				rewards[i].totalAmount,
				{ from: p.address }
			)
			await px.acceptReward(i + 1)
		}
	})
}

