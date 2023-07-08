const UserRepository = require("../repositories/users.repository");
class UserService {
  userRepository = new UserRepository();
  signupUser = async (nickname, password, refreshToken) => {
    const signupUserData = await this.userRepository.signupUser(
      nickname,
      password,
      refreshToken
    );
    return {
      nickname: signupUserData.nickname,
    };
  };
  loginUser = async (nickname, refreshToken) => {
    const loginUserData = await this.userRepository.loginUser(
      nickname,
      refreshToken
    );
    return {
      nickname: loginUserData.nickname,
    };
  };
}

module.exports = UserService;
