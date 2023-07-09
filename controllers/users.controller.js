const UserService = require("../services/users.service");
const { Users } = require("../models");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secretkey = "dayoung";
const rsecretkey = "lee";

class UsersController {
  userService = new UserService();

  signupUser = async (req, res) => {
    const idcheck = /^[0-9a-z]{3,}$/gi;
    const { nickname, password, confirm } = req.body;

    try {
      if (!nickname || !password || !confirm) {
        return res.status(400).json({
          errorMessage: "미입력된 항목이 있습니다. 모두 입력하여 주세요.",
        });
      } else if (!idcheck.test(nickname)) {
        return res.status(400).json({
          errorMessage:
            "닉네임은 최소 3자 이상, 알파벳 대소문자(a~z, A~Z), 숫자(0~9)로 구성해 주세요.",
        });
      } else if (password.length < 4 || password.includes(nickname)) {
        return res.status(400).json({
          errorMessage:
            "비밀번호는 최소 4자 이상, 닉네임과 같은 값이 포함될 수 없습니다.",
        });
      } else if (password !== confirm) {
        return res.status(400).json({
          errorMessage: "비밀번호와 비밀번호 확인이 일치하지 않습니다.",
        });
      }

      const saltRound = 10;
      const salt = await bcrypt.genSalt(saltRound);
      const hashedPassword = await bcrypt.hash(password, salt);
      const refreshToken = JWT.sign({}, rsecretkey, {
        expiresIn: "7d",
      });
      await this.userService.signupUser(nickname, hashedPassword, refreshToken);
      return res
        .cookie("refreshToken", `Bearer ${refreshToken}`, {
          expiresIn: "7d",
        })
        .status(201)
        .json({
          message: "회원 가입에 성공하였습니다.",
        });
    } catch (err) {
      if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({ errorMessage: "중복된 닉네임입니다." });
      }
    }
  };

  loginUser = async (req, res) => {
    const { nickname, password } = req.body;
    if (!nickname || !password) {
      return res
        .status(400)
        .json({ errorMessage: "닉네임 또는 패스워드를 확인해주세요." });
    }
    const target = await Users.findOne({ where: { nickname } });
    const match = await bcrypt.compare(password, target.password);
    const userId = target.userId;
    if (!match) {
      return res
        .status(400)
        .json({ errorMessage: "닉네임 또는 패스워드를 확인해주세요." });
    } else {
      // cookies 에 리프레시 토큰이 없거나 만료 시간 체크 하여 만료일 때 재발급
      const existRefreshToken = req.cookies.refreshToken;
      const [authType, authToken] = (existRefreshToken ?? "").split(" ");
      if (
        (target.token == authToken && !JWT.verify(authToken, rsecretkey)) ||
        !existRefreshToken
      ) {
        const refreshToken = JWT.sign({}, rsecretkey, {
          expiresIn: "7d",
        });
        res.cookie("refreshToken", `Bearer ${refreshToken}`, {
          expiresIn: "7d",
        });
        await this.userService.loginUser(nickname, refreshToken);
      } else if (target.token !== authToken) {
        console.log(`비정상적인 접근 userId:${userId}`);
        return res.status(400).json({ message: "로그인에 실패하였습니다." });
      }

      const accessToken = JWT.sign({ userId }, secretkey, {
        expiresIn: 3600,
      });
      res.cookie("accessToken", `Bearer ${accessToken}`, {
        expiresIn: 3600,
      });
      return res.status(200).json({ message: "로그인에 성공하였습니다." });
    }
  };
}

module.exports = UsersController;
