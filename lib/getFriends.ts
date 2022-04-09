export default async function getFriends(
  apiKey: string,
  uuid: string
): Promise<string[]> {
  const friends = await fetch(
    `https://api.hypixel.net/friends?key=${apiKey}&uuid=${uuid}`
  )
    .then((res) => res.json())
    .catch((e) => {});
  const friendsData = filterFriends(friends);
  if (friendsData.length > 50) {
    friendsData.length = 50;
  }
  return friendsData;
}

interface HypixelFriends {
  success: boolean;
  uuid: string;
  records: {
    _id: string;
    uuidSender: string;
    uuidReceiver: string;
    started: number;
  }[];
}

export function filterFriends(friends: HypixelFriends): string[] {
  if (!friends.records.length) {
    return [];
  }
  const records = friends.records;
  const baseUuid = friends.uuid;
  const tempUuids = records.map((record) => {
    if (record.uuidSender === baseUuid) {
      return record.uuidReceiver;
    } else {
      return record.uuidSender;
    }
  });
  const uuids = removeDuplicates(tempUuids);
  return uuids;
}

export function removeDuplicates(array: string[]) {
  return array.filter((item, index) => {
    return array.indexOf(item) === index && item !== "";
  });
}
