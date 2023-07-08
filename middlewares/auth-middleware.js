const JWT = require("jsonwebtoken");
const secretkey = "dayoung";
const rsecretkey = "lee";

module.exports = async (req, res, next) => {
  const { accessToken } = req.cookies;
  const { refreshToken } = req.cookies;
  const [authType, authToken] = (accessToken ?? "").split(" ");
  const [rauthType, rauthToken] = (refreshToken ?? "").split(" ");
  const verified = JWT.verify(authToken, secretkey);
  const rverified = JWT.verify(rauthToken, rsecretkey);

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
    } else if (!verified || !rverified) {
      return res.status(400).send({
        errorMessage: "로그인 후 이용 가능한 기능입니다.",
      });
    }
    res.locals.userId = verified.userId;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다.",
    });
  }
};
