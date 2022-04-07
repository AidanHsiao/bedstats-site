interface Validity {
  code: number;
  msg: string;
}

export default async function checkKeyValidity(
  apiKey: string,
  uuid: string
): Promise<Validity> {
  const keyData = await fetch(`https://api.hypixel.net/key?key=${apiKey}`)
    .then((res) => res.json())
    .catch((e) => {
      return {
        code: 3,
        msg: "Connection lost. Make sure you are connected to the internet.",
      };
    });
  if (!keyData?.success) {
    return {
      code: 2,
      msg: "The inputted API key is invalid. Check that it's spelt correctly.",
    };
  }
  const keyUUID = keyData.record.owner;
  if (keyUUID !== uuid) {
    return {
      code: 1,
      msg: "This key's owner doesn't match with your username.",
    };
  }
  return { code: 0, msg: "API key valid." };
}
