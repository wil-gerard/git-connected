"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_1 = __importDefault(require("../middleware/auth"));
var userControllers_1 = require("../controllers/userControllers");
var router = express_1.default.Router();
router.put('/user/update', auth_1.default, userControllers_1.userUpdate);
router.put('/user/removeConnection', auth_1.default, userControllers_1.removeConnection);
router.post('/user/followall', auth_1.default, userControllers_1.userFollowAll);
router.get('/user/getuser', auth_1.default, userControllers_1.getUser);
router.get('/user/getallusers', userControllers_1.getAllUsers);
exports.default = router;
//# sourceMappingURL=userRouter.js.map