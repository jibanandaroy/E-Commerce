const bcrypt = require("bcrypt");

async function hashPassword(password) {
  return bcrypt.hash(password, 12);
}

const userSeedData = [ 
    {
        'name':"Jibon Roy",
        'email':"jibonroy282@gmail.com",
        'role':1,
        'isVerified':true
    },
    {
        'name':"Mr x", 
        'email':"x@gmail.com",
        'role':1,
        'isVerified':true
    },
    {
        'name':"Mr y",
        'email':"y@gmail.com",
        'role':1,
        'isVerified':true
    }
];

(async() => {
    for (const user of userSeedData) {
      user.password = await hashPassword("12345678");
    }
})();

module.exports = {
    userSeedData
}
