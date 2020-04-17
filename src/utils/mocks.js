
class Mocks {


	constructor (accounts) {
		this.admin = accounts[0];
		this.partner1 = accounts[1];
		this.partner2 = accounts[2];
		this.partner3 = accounts[3];
		this.user1 = accounts[4];
		this.user2 = accounts[5];
		this.user3 = accounts[6];
		this.moderator = accounts[7];

		this.QUESTIONNAIRE = 0;
		this.RANKING = 1;
		this.FREEFORM_ANSWER = 2;
	}

/*			["0x77cBFd20156d5a3dA59aF105853B3279abf84fb8", "Admin"],
			["0x281ba3dcC5d8C1D881287cdd637Fcb4Bd488Ae7d", "Partner 1"],
			["0x3643DbdD6cddeF41525d561D44Edf55dDa531a9C", "Partner 2"],
			["0x714DA679bA53Ac4423027dA81458c9095484a9b8", "Partner 3"],
			["0x21338334d837526e16D370148DBF7234bE45839c", "User 1"],
			["0xB89a894F618E9420765e9EdE22d523B6e211C610", "User 2"],
			["0xaf0ED3787deAc9d296020C923A103b041D84B956", "User 3"],
			["0x540Cb57f30586a81c5357bAbF4E6d1c50f548806", "Moderator"]
	*/
	partners () {
		return [{
				address:  this.partner1,
				name: 'Amazon',
				description: 'Amazon.com, Inc., is an American multinational technology company based in Seattle, Washington, that focuses on e-commerce, cloud computing, digital streaming, and artificial intelligence.',
				logo: 'https://mms.businesswire.com/media/20190228005194/en/3799/23/logo_white_.jpg',
			},
			{
				address: this.partner2,
				name: 'Google',
				description: 'Google LLC is an American multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, search engine, cloud computing, software, and hardware.',
				logo: 'https://storage.googleapis.com/gd-wagtail-prod-assets/images/evolving_google_identity_2x.max-4000x2000.jpegquality-90.jpg',
			},
			{
				address: this.partner3,
				name: 'Apple',
				description: 'Apple Inc. is an American multinational technology company headquartered in Cupertino, California, that designs, develops, and sells consumer electronics, computer software, and online services.',
				logo: 'https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png',
			}]
	}

	rewards () {
		return [
			{
				caption: 'Ketchup Heinz',
				description: 'Tomato ketchup, also known as catsup, ketsup, catchup, red sauce, and tomato sauce, is a sauce used as a condiment. Although original recipes used egg whites, mushrooms, oysters, grapes, mussels, or walnuts, among other ingredients, the unmodified modern recipe refers to tomato-based ketchup.',
				price: 3,
				imageLink: 'https://images-na.ssl-images-amazon.com/images/I/71ZI9Qn9StL._SL1500_.jpg',
				totalAmount: 100
			},
			{
				caption: 'Nike sneakers React Element 55',
				description: `trendy React Element 55 sneakers from Nike. Futuristic look with decorative elements inspired by the design of the Nike Internationalist series. 6-hole lacing with loops for a personalized fit. Soft, light textile upper material offers high wearing comfort. Discreet logo print on the tongue outside. Decorative heel seam`,
				price: 250,
				imageLink: 'https://cdn.def-shop.com/original/nike-sneaker-weiss-697919.jpg',
				totalAmount: 3
			},
			{
				caption: 'Two concert tickets',
				description: 'YouTube has expanded concert ticket integration on artist videos to the U.K. and Ireland via partnerships with Ticketmaster, See Tickets and Eventbrite. Beginning this week, fans will start seeing ticket listings on some official music videos, which if clicked will lead to partner sites.',
				price: 10,
				imageLink: 'https://www.billboard.com/files/media/concert-crowd-audience-stock-2019-u-billboard-1548.jpg',
				totalAmount: 20
			},
		]
	}

	tasks () {
		return [{
			caption: 'Souces. Questionnaire',
			description: 'In cooking, a sauce is a liquid, cream, or semi-solid food, served on or used in preparing other foods. Most sauces are not normally consumed by themselves; they add flavor, moisture, and visual appeal to a dish. Sauce is a French word taken from the Latin salsa, meaning salted. Possibly the oldest recorded European sauce is garum, the fish sauce used by the Ancient Romans; while doubanjiang, the Chinese soy bean paste is mentioned in Rites of Zhou in the 3rd century BC.',
			reward: 10,
			imageLink: 'https://www.rsp-group.com/images/sos.jpg',
			totalAmount: 50,
			questions: [
				['Do you like ketchup?', 'Yes', 'No', 'Maybe'],
				['Do you like mustard?', 'Yes', 'No', 'Maybe'],
				['Do you like mayo?', 'Yes', 'No', 'Maybe'],
				['Do you like barbecue sauce?', 'Yes', 'No', 'Maybe'],
				['Do you like marinara sauce?', 'Yes', 'No', 'Maybe'],
			],
			taskType: this.QUESTIONNAIRE
		},
		{
			caption: 'IPhone: prototype',
			description: "That’s when the next iPhone is arriving, and that model — the iPhone 12 — will reportedly be Apple's first to support 5G networking. Other reports point to an all-new iPhone 12 design that gets rid of the iPhone’s distinctive notch while adding in-display Touch ID functionality. And there could be more iPhone models than usual.",
			reward: 10,
			imageLink: 'https://cdn.mos.cms.futurecdn.net/CyVg4bf9L2fWWiec67kaZj-1024-80.jpeg',
			totalAmount: 100,
			questions: [
				[
					'Do you like this new IPhone 12 prototype? Rate it from 1 to 5:',
					'https://cdn.mos.cms.futurecdn.net/jHj2UEbwCbTguyPDm63mPj-970-80.jpeg'
				]
			],
			taskType: this.RANKING
		},
		{
			caption: 'McDonalds: do you like it?',
			description: 'McDonald\'s Corporation is an American fast food company, founded in 1940 as a restaurant operated by Richard and Maurice McDonald, in San Bernardino, California, United States.',
			reward: 10,
			imageLink: 'https://mia-prod-s3-cdn.s3.amazonaws.com/wp-content/uploads/2016/02/MCD-LOGO-002.jpg',
			totalAmount: 100,
			questions: [
				[
					'Do you like McDonalds? Rate it from 0 to 10:'
				]
			],
			taskType: this.FREEFORM_ANSWER
		}]
	}

	roles () {
		return {
			admin: this.admin,
			partner1: this.partner1,
			partner2: this.partner2,
			partner3: this.partner3,
			user1: this.user1,
			user2: this.user2,
			user3: this.user3,
			moderator: this.moderator,
		}
	}

	users () {
		return [
			{
				address: '0x21338334d837526e16D370148DBF7234bE45839c'
			},

			{
				address: '0xB89a894F618E9420765e9EdE22d523B6e211C610'
			},

			{
				address: '0xaf0ED3787deAc9d296020C923A103b041D84B956'
			}
		]
	}
}

module.exports = {
	Mocks: Mocks,
};