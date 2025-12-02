const { Compare, Encrypt } = require("../../services/Encryption");
const GenerateTokens = require("../../services/GenerateTokens");
const {
  GetSupervisor,
  UpdateSupervisor,
} = require("../repositories/SupervisorRepo");

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const supervisor = await GetSupervisor(email);

    if (!supervisor)
      return res
        .status(400)
        .json({ message: "This Email Is Not Sign With Any User" });

    // Match The Password With The hashed One Saved On The DATABASE
    const isMatch = await Compare(password, supervisor.password);

    if (!isMatch)
      return res.status(400).json({ message: "Wrong Email Or Password" });

    const Payload = {
      id: supervisor.id,
      name: supervisor.name,
      email: supervisor.email,
    };

    const AccessToken = GenerateTokens.accessToken(Payload);
    const RefreshToken = GenerateTokens.refreshToken(Payload);

    res.cookie("refreshtoken", RefreshToken, {
      path: "/",
      // signed: true,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 12,
      // domain: `.${process.env.DASHBOARD_HOST_URL}`,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    });

    return res.status(200).json({
      message: "Login Successfully",
      supervisor: { ...Payload },
      token: AccessToken,
    });
    // Send Notification
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const Logout = async (req, res) => {
  try {
    const refreshtoken = req.cookies.refreshtoken;
    if (!refreshtoken)
      return res.status(400).json({ message: "Invalid Token" });

    const payload = GenerateTokens.verifyToken(refreshtoken);
    if (!payload) return res.status(400).json({ message: "Invalid Token" });

    res.clearCookie("refreshtoken");
    return res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const RefreshToken = async (req, res) => {
  try {
    const refreshtoken = req.cookies.refreshtoken;
    if (!refreshtoken)
      return res.status(400).json({ message: "Invalid Token" });

    const payload = GenerateTokens.verifyToken(refreshtoken);

    if (!payload) return res.status(400).json({ message: "Invalid Token" });

    const supervisor = await GetSupervisor(payload?.email);

    if (!supervisor)
      return res.status(400).json({ message: "Supervisor Not Found" });

    const SupervisorPayload = {
      id: supervisor?.id,
      name: supervisor?.name,
      email: supervisor?.email,
    };

    const token = GenerateTokens.accessToken(SupervisorPayload, "15m");

    return res.status(200).json({
      message: "Token Refreshed Successfully",
      token,
      supervisor: SupervisorPayload,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const ResetPassword = async (req, res) => {
  try {
    const { email, currentPassword, newPassword, confirmPassword } = req.body;
    const supervisorData = { newPassword };
    const supervisor = await GetSupervisor(email);

    if (!supervisor)
      return res.status(400).json({ message: "تعذر العثور على المشرف" });

    const isMatch = await Compare(currentPassword, supervisor.password);

    if (!isMatch)
      return res.status(400).json({ message: "كلمة المرور القديمة غير صحيحة" });

    if (newPassword !== confirmPassword)
      return res.status(400).json({ message: "كلمة المرور غير متطابقة" });

    if (newPassword) {
      const HashedPassword = await Encrypt(newPassword);
      supervisorData.password = HashedPassword;
    }

    const UpdatedSupervisor = await UpdateSupervisor(
      supervisor.id,
      supervisorData
    );

    if (!UpdatedSupervisor)
      return res.status(400).json({ message: "فشل تحديث كلمة المرور" });

    const Payload = {
      id: supervisor.id,
      name: supervisor.name,
      email: supervisor.email,
    };

    const RefreshToken = GenerateTokens.refreshToken(Payload);

    res.cookie("refreshtoken", RefreshToken, {
      path: "/",
      // signed: true,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 12,
      domain: `.${process.env.DASHBOARD_HOST_URL}`,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    });

    return res.status(200).json({
      message: "تم تحديث كلمة السر بنجاح",
      supervisor: Payload,
      token: RefreshToken,
    });
  } catch (error) {
    console.log("Internal Server Error", error.message);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  Login,
  Logout,
  RefreshToken,
  ResetPassword,
};
