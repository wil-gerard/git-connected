"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: __dirname + "/../.env" });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var express_session_1 = __importDefault(require("express-session"));
var passport_1 = __importDefault(require("passport"));
var index_1 = __importDefault(require("./routes/index"));
var connect_mongo_1 = __importDefault(require("connect-mongo"));
// Middleware
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.static("../../client/build"));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: "".concat(process.env.FRONTEND_DEV_URL),
    methods: 'GET,PUT,POST,DELETE',
    credentials: true,
}));
app.use((0, morgan_1.default)(process.env.NODE_ENV !== 'production' ? 'dev' : 'combined', {
    skip: function (req, res) {
        return res.statusCode >= 400;
    },
    stream: process.stdout,
}));
app.set('trust proxy', 1);
var URI = "".concat(process.env.MONGODB_URI_START).concat(process.env.MONGODB_USERNAME, ":").concat(process.env.MONGODB_PASSWORD).concat(process.env.MONGODB_URI_END);
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: connect_mongo_1.default.create({
        mongoUrl: "".concat(URI),
    }),
}));
app.use(function (err, req, res, next) {
    if (!err.status)
        err.status = 500;
    return res.status(err.status).json({ error: err.toString() });
});
// Passport
require("./config/passport/passport");
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// Routes
app.use('/api', index_1.default);
// Database
require("./config/database");
// Production Deploy
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static('client/build'));
    app.get('*', function (req, res) {
        res.sendFile(path_1.default.join(__dirname, '../client', 'build', 'index.html'));
    });
}
var PORT = process.env.PORT || process.env.BACKEND_DEV_PORT;
app.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
});
//# sourceMappingURL=index.js.map