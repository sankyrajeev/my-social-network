const router = require('express').Router();

const{allUsers , createUser, oneUser, deleteUser,updateUser, addNewFriend, deleteFriend} = require('../../controllers/user_controller');


router.route('/')
.get(allUsers)
.post(createUser);

router.route('/:Id')
.get(oneUser)
.delete(deleteUser)
.put(updateUser)

router.route('/:userId/friends/:friendId')
.post(addNewFriend)
.delete(deleteFriend)


module.exports = router;