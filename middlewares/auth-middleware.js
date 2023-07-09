const JWT = require("jsonwebtoken");
const secretkey = "dayoung";
const rsecretkey = "lee";

module.exports = async (req, res, next) => {
  const { accessToken } = req.cookies;
  const { refreshToken } = req.cookies;
  const [authType, authToken] = (accessToken ?? "").split(" ");
  const [rauthType, rauthToken] = (refreshToken ?? "").split(" ");
  try {
    if (
      !authToken ||
      authType !== "Bearer" ||
      !rauthToken ||
      rauthType !== "Bearer"
    ) {
      return res.status(400).send({
        errorMessage: "로그인 후 이용 가능한 기능입니다.",
      });
    }

    const verified = JWT.verify(authToken, secretkey);
    const rverified = JWT.verify(rauthToken, rsecretkey);

    if (!verified || !rverified) {
      return res.status(400).send({
        errorMessage: "로그인 후 이용 가능한 기능입니다.",
      });
    } else {
      res.locals.userId = verified.userId;
      next();
    }
  } catch (err) {
    return res.status(400).send({
      errorMessage: "로그인 후에 이용하세요.",
    });
  }
};
