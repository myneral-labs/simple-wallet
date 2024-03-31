interface EndpointInterface {
  name: string;
  values: {
    ask: number;
    totalAsk: number;
    bid: number;
    totalBid: number;
    time: number;
  };
}

interface PricesInterface {
  success: boolean;
  data?: Array<EndpointInterface>;
}

export async function getPrices(): Promise<PricesInterface> {
  const currency = 'usd';
  const tokens = ['eth', 'dai'];

  let promises = [];

  tokens.map((token) => {
    promises.push({ name: token, url: `https://criptoya.com/api/tiendacrypto/${token}/${currency}/0.5` });
  });

  const data = await Promise.all(
    promises.map(async ({ name, url }) => {
      const resp = await fetch(url);
      const body = await resp.text();

      if (body) {
        return { name, values: JSON.parse(body) };
      }
    }),
  );

  // Manually add 'ghc' token with fixed exchange rate
  const ghcToken = {
    name: 'ghc',
    values: {
      ask: 100, // replace with your fixed ask value
      totalAsk: 100, // replace with your fixed totalAsk value
      bid: 100, // replace with your fixed bid value
      totalBid: 100, // replace with your fixed totalBid value
      time: Date.now(), // replace with your fixed time value
    },
  };

  if (data) {
    return {
      success: true,
      data: [...data, ghcToken], // add ghcToken to the data array
    };
  } else {
    return {
      success: false,
    };
  }
}
