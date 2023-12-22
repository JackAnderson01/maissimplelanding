import BlackListTokenEntity from "../../../schema/auth/BlackListTokenSchema";

export default async function blackListToken(req, res) {
  try {
    const token = req.headers.authorization || req.headers.token;

    const existingToken = await BlackListTokenEntity.findOne({ token: token });

    if (existingToken != null) {
      return true;
    }

    const newBlackList = new BlackListTokenEntity({
      token: token,
    });

    const blackListRecord = await newBlackList.save();

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
