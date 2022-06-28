export interface StatsObject {
  kills?: number;
  fkdr: number;
  bblr: number;
  wlr: number;
  stars: number;
  finals: number;
  beds: number;
  wins: number;
  score: number;
  timestamp: number;
}

export interface Friend {
  username: string;
  uuid: string;
}

export interface User {
  username: string;
  uuid: string;
  password: string;
  hypixelAPIKey: string;
  friends: Friend[];
  settings: {
    theme: string;
    animationEnabled: boolean;
    animationRate: string;
    hypixelAPIKey: string;
    pollingRate: string;
    loggingConfig: string;
    scoreCutoff: number;
    scoreConstant: number;
    equations: {
      stars: string;
      fkdr: string;
      bblr: string;
      wlr: string;
      finals: string;
      beds: string;
      wins: string;
      fkdrMargin: number;
      bblrMargin: number;
      wlrMargin: number;
      fkdrSecond: string;
      bblrSecond: string;
      wlrSecond: string;
    };
  };
}

export interface ResourceRatio {
  forge: number;
  diamond: number;
  emerald: number;
}

export interface KillDeathRatios {
  damage: KDRatioObject;
  void: KDRatioObject;
}

export interface KDRatioObject {
  kills: number;
  deaths: number;
  finalKills: number;
  finalDeaths: number;
}
