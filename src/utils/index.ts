
const calcRest = (rest: number, total: number) : number =>
  Math.round((rest / total) * 100);


const FULL_MOCKS = [
  {
    name: 'Amazon',
    image: 'https://mms.businesswire.com/media/20190228005194/en/3799/23/logo_white_.jpg',
    description: 'Amazon.com, Inc. is an American multinational conglomerate technology company based in Seattle, with 750,000 employees',
    rewards: [
      {
        title: `Alexa`,
        value: 20000,
        company: 'Amazon',
        expiration: '175 days left',
        amountLeft: 20,
        totalAmount: 175,
        description: 'Amazon Alexa, also known simply as Alexa, is a virtual assistant AI technology developed by Amazon, first used in the Amazon Echo smart speakers developed ..',
        image: `https://voiceapp.ru/wp-content/uploads/2017/09/amazon-echo-2017-black-2.jpg`
      }
    ],
    history: [
      {
        name: `Alexa`,
        value: 20000,
        date: 'Dec 11.',
        company: 'Amazon',
        description: 'Amazon Alexa, also known simply as Alexa, is a virtual assistant AI technology developed by Amazon, first used in the Amazon Echo smart speakers developed ..',
        image: `https://voiceapp.ru/wp-content/uploads/2017/09/amazon-echo-2017-black-2.jpg`
      }
    ]
  },
  {
    name: 'Google',
    description: 'Google LLC is an American multinational technology company that specializes in Internet-related services and products, which include online advertising.',
    image: 'https://storage.googleapis.com/gd-wagtail-prod-assets/images/evolving_google_identity_2x.max-4000x2000.jpegquality-90.jpg',
    value: +100,
    date: 'Nov 3.',
    _description: 'Completed task',
    rewards: [
      {
        title: `Pixel 2`,
        value: 15000,
        company: 'Google',
        expiration: '175 days left',
        description: 'Pixel 2 and Pixel 2 XL are Android smartphones designed and developed by HTC and LG respectively, and marketed by Google.',
        amountLeft: 94,
        totalAmount: 500,
        image: 'https://static.price.ru/images/models/-/mobilniy-telefon/google-pixel-2/3a2a6277730707ebc1412a93397b3b02.PNG'
      }
    ],
    history: [
      {
        name: `Pixel 2`,
        description: 'Pixel 2 and Pixel 2 XL are Android smartphones designed and developed by HTC and LG respectively, and marketed by Google.',
        value: -15000,
        company: 'Google',
        date: 'Nov 23.',
        image: 'https://static.price.ru/images/models/-/mobilniy-telefon/google-pixel-2/3a2a6277730707ebc1412a93397b3b02.PNG'
      }
    ]
  },
  {
    name: 'Apple',
    image: 'https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png',
    description: 'Apple Inc. is an American multinational technology company headquartered in Cupertino.',
    history: [
      {
        name: 'IPhone: prototype',
        description: "That’s when the next iPhone is arriving, and that model — the iPhone 12 — will reportedly be Apple's first to support 5G networking. Other reports point to an all-new iPhone 12 design that gets rid of the iPhone’s distinctive notch while adding in-display Touch ID functionality. And there could be more iPhone models than usual.",
        image: 'https://cdn.mos.cms.futurecdn.net/CyVg4bf9L2fWWiec67kaZj-1024-80.jpeg',
        value: +10,
        company: 'Apple',
        date: 'Sep 2.',
      },
      {
        name: `Apple Watch Series 3`,
        description: 'The Apple Watch is a smartwatch that connects to your iPhone to deliver notifications, make calls, send texts and run apps.',
        value: -16000,
        date: 'July 2.',
        company: 'Apple',
        image: 'https://www.apple.com/newsroom/images/product/watch/standard/watch_series_3_incoming_two-wrap_big.gif.large.gif'
      }
    ],
    rewards: [
      {
        title: `Apple Watch Series 3`,
        value: 16000,
        company: 'Apple',
        description: 'The Apple Watch is a smartwatch that connects to your iPhone to deliver notifications, make calls, send texts and run apps.',
        expiration: '175 days left',
        amountLeft: 50,
        totalAmount: 175,
        image: 'https://www.apple.com/newsroom/images/product/watch/standard/watch_series_3_incoming_two-wrap_big.gif.large.gif'
      }
    ]
  },
  {
    name: 'Nike',
    image: 'https://c.static-nike.com/a/images/w_1920,c_limit/mdbgldn6yg1gg88jomci/image.jpg',
    description: 'Nike, Inc. is an American multinational corporation that is engaged in the design, development, manufacturing, and worldwide marketing and sales of footwear, apparel, equipment, accessories, and services.',
    rewards: [
      {
        title: `Nike Air Force I`,
        value: 8900,
        company: 'Nike',
        expiration: '31 days left',
        description: 'Nike Air Force I is the legendary model connected with streetwear and Hip - Hop.',
        amountLeft: 46,
        totalAmount: 800,
        image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto/i1-512bfa8a-01a0-4971-bd34-9cef18a159e0/%D0%BA%D1%80%D0%BE%D1%81%D1%81%D0%BE%D0%B2%D0%BA%D0%B8-air-force-1-07-yATkW1Bp.jpg'
      }
    ],
    history: [
      {
        name: `Nike Air Force I`,
        description: 'Nike Air Force I is the legendary model connected with streetwear and Hip - Hop.',
        value: -8900,
        company: 'Nike',
        date: 'June 28.',
        image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto/i1-512bfa8a-01a0-4971-bd34-9cef18a159e0/%D0%BA%D1%80%D0%BE%D1%81%D1%81%D0%BE%D0%B2%D0%BA%D0%B8-air-force-1-07-yATkW1Bp.jpg'
      }
    ]
  },
  {
    history: [
      {
        name: 'Souces. Questionnaire',
        description: 'In cooking, a sauce is a liquid, cream, or semi-solid food, served on or used in preparing other foods. Most sauces are not normally consumed by themselves; they add flavor, moisture, and visual appeal to a dish. Sauce is a French word taken from the Latin salsa, meaning salted. Possibly the oldest recorded European sauce is garum, the fish sauce used by the Ancient Romans; while doubanjiang, the Chinese soy bean paste is mentioned in Rites of Zhou in the 3rd century BC.',
        value: 10,
        date: 'June 24.',
        company: '',
        image: 'https://www.rsp-group.com/images/sos.jpg',
      },
      {
        name: 'McDonalds: do you like it?',
        description: 'McDonald\'s Corporation is an American fast food company, founded in 1940 as a restaurant operated by Richard and Maurice McDonald, in San Bernardino, California, United States.',
        value: 10,
        company: '',
        date: 'May 26.',
        image: 'https://mia-prod-s3-cdn.s3.amazonaws.com/wp-content/uploads/2016/02/MCD-LOGO-002.jpg'
      }
    ]
  },
  {
    name: 'Starbucks',
    description: 'Starbucks Corporation is an American coffee company and coffeehouse chain. Starbucks was founded in Seattle, Washington, in 1971.',
    image: 'https://upload.wikimedia.org/wikipedia/ru/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/199px-Starbucks_Corporation_Logo_2011.svg.png',
    rewards: [
      {
        title: `Free Capuccino`,
        value: 170,
        company: 'Starbucks',
        description: 'Outside of Italy, cappuccino is a coffee drink that today is typically composed of a single espresso shot and hot milk, with the surface topped with foamed milk.',
        expiration: '90 days left',
        amountLeft: 80,
        totalAmount: 780,
        image: `https://sbermarket.ru/spree/products/166381/preview/174545.jpg?1566502806`
      }
    ],
    history: [
      {
        name: 'Free Capuccino',
        company: 'Starbucks',
        image: `https://sbermarket.ru/spree/products/166381/preview/174545.jpg?1566502806`,
        date: 'May 17.',
        value: -170,
        description: 'Outside of Italy, cappuccino is a coffee drink that today is typically composed of a single espresso shot and hot milk, with the surface topped with foamed milk.'
      }
    ]
  }
];

const getMocksByName = (name: string) => FULL_MOCKS.find((i) => i.name === name);


export {
  calcRest,
  FULL_MOCKS,
  getMocksByName
}
