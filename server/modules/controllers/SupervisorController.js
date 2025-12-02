const { Encrypt, Compare } = require("../../services/Encryption");
const GenerateTokens = require("../../services/GenerateTokens");
const {
  CreateSupervisor,
  UpdateSupervisor,
  GetSupervisor,
} = require("../repositories/SupervisorRepo");

const AddSupervisor = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All Fields Are Required" });

    const HashedPassword = await Encrypt(password);

    const supervisorData = { name, email, password: HashedPassword };

    const newSupervisor = await CreateSupervisor(supervisorData);

    if (!newSupervisor)
      return res.status(400).json({ message: "Failed to create supervisor" });

    return res.status(201).json({ message: "Supervisor created successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const UpdateTheSupervisor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const supervisorData = { name };

    const supervisor = await GetSupervisor(email);

    if (!supervisor)
      return res.status(400).json({ message: "تعذر العثور على المشرف" });

    const UpdatedSupervisor = await UpdateSupervisor(id, supervisorData);

    if (!UpdatedSupervisor)
      return res.status(400).json({ message: "Failed to create supervisor" });

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

    return res.status(201).json({
      message: "Supervisor updated successfully",
      supervisor: Payload,
      token: RefreshToken,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = { AddSupervisor, UpdateTheSupervisor };
