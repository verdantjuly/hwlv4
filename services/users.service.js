const UserRepository = require("../repositories/users.repository");
class UserService {
  userRepository = new UserRepository();
  signupUser = async (nickname, password) => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const signupUserData = await this.userRepository.signupUser(
      nickname,
      password
    );

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return {
      nickname: signupUserData.nickname,
    };
  };
}

module.exports = UserService;
