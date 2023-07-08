const UserService = require("../services/users.service");

class UsersController {
  userService = new UserService();

  signupUser = async (req, res, next) => {
    const idcheck = /^[0-9a-z]{3,}$/gi;
    const { nickname, password, confirm } = req.body;

    try {
      if (!nickname || !password || !confirm) {
        res.status(400).json({
          errorMessage: "미입력된 항목이 있습니다. 모두 입력하여 주세요.",
        });
      } else if (!idcheck.test(nickname)) {
        res.status(400).json({
          errorMessage:
            "닉네임은 최소 3자 이상, 알파벳 대소문자(a~z, A~Z), 숫자(0~9)로 구성해 주세요.",
        });
      } else if (password.length < 4 || password.includes(nickname)) {
        res.status(400).json({
          errorMessage:
            "비밀번호는 최소 4자 이상, 닉네임과 같은 값이 포함될 수 없습니다.",
        });
      } else if (password !== confirm) {
        res.status(400).json({
          errorMessage: "비밀번호와 비밀번호 확인이 일치하지 않습니다..",
        });
      }

      const signupUserData = await this.userService.signupUser(
        nickname,
        password,
        confirm
      );
      res.status(201).json({
        message: "회원 가입에 성공하였습니다.",
      });
    } catch (err) {
      if (err.message === "중복된 닉네임이 존재합니다.") {
        return res
          .status(400)
          .json({ errorMessage: "중복된 닉네임이 존재합니다." });
      }
      return res.status(400).json({ errorMessage: err });
    }
  };
}

module.exports = UsersController;
