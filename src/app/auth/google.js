import axiosInstance from "../../components/utility/axios";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { token } = req.query;
    res.setHeader("Set-Cookie", `token=${token}; Path=/; HttpOnly; Secure`);
    res.redirect("/");
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
