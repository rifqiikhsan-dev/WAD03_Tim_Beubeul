//IMPL ABOUT US ROUTE
const express = require("express");
const router = express.Router();

const anggota = [
    {
        name: "Rigan Nur Fauzi",
        NIM: "24120300008"
    },
    {
        name: "Adit Praditia",
        NIM: "24120300004"
    },
    {
        name: "Rifqi Ikhsan Rizkillah",
        NIM: "24120300007"
    }
]

router.get('/:user', (req, res) => {
    const requestedUser = req.params.user;

    const foundUser = anggota.find(user => {
    return user.name.toLowerCase().replace(/\s/g, '') === requestedUser.toLowerCase().replace(/\s/g, '') ||
           user.NIM === requestedUser;
  });

  if (foundUser) {
    // Jika pengguna ditemukan
    res.json(foundUser);
  } else {
    // Jika pengguna tidak ditemukan
    res.status(404).json({
      message: "User not found"
    });
  }
});

module.exports = router;