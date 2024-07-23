const { jwt, config } = require("../packages");

class JwtService {
  constructor(accessKey, refreshKey, accessTime, refreshTime) {
    this.accessKey = accessKey;
    this.refreshKey = refreshKey;
    this.accessTime = accessTime;
    this.refreshTime = refreshTime;
  }

  async verifyAccess(token) {
    return jwt.verify(token, this.accessKey, {});
  }

  async verifyRefresh(token) {
    return jwt.verify(token, this.refreshKey, {});
  }

  generateTokens(payload) {
    const accessToken = jwt.sign(payload, this.accessKey, {
      expiresIn: this.accessTime,
    });
    const refreshToken = jwt.sign(payload, this.refreshKey, {
      expiresIn: this.refreshTime,
    });
    return {
      accessToken,
      refreshToken,
    };
  }
}

module.exports = new JwtService(
  config.get("ACCESS_TOKEN_KEY"),
  config.get("REFRESH_TOKEN_KEY"),
  config.get("ACCESS_TOKEN_TIME"),
  config.get("REFRESH_TOKEN_TIME")
);
