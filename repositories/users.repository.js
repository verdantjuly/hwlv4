const { Users } = require("../models");

class UserRepository {
  signupUser = async (nickname, password) => {
    // ORM인 Sequelize에서 Posts 모델의 create 메소드를 사용해 데이터를 요청합니다.
    const signupUserData = await Users.create({ nickname, password });
    return signupUserData;
  };
}

module.exports = UserRepository;
