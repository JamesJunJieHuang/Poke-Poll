const User = require("../../server/models/UserModel");
const userController = require("../../server/controllers/userController");
const bcrypt = require("bcrypt");

describe("userController", () => {
  //before each CLEAR mocks to prevent test cross contamination
  beforeEach(() => {
    jest.clearAllMocks();
  });
  //CREATE USER TEST
  describe("createUser", () => {
    //CREATE USER SCENARIO 1
    it("should create user in database and pass it to the next middleware if username doesnt exist", async () => {
      //req.body
      const req = {
        body: {
          username: "testuser",
          password: "testpassword",
        },
      };
      //res.locals , status, send
      const res = {
        locals: {},
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      //next function
      const next = jest.fn();

      User.findOne = jest.fn().mockResolvedValue(null);
      User.create = jest.fn().mockResolvedValue({
        username: "testuser",
        favoritePokemon: 0,
      });

      await userController.createUser(req, res, next);

      //expects
      expect(User.findOne).toHaveBeenCalledWith({ username: "testuser" });
      expect(User.create).toHaveBeenCalledWith({
        username: "testuser",
        password: "testpassword",
        favoritePokemon: 0,
      });
      expect(res.locals.newUser).toEqual({
        username: "testuser",
        favoritePokemon: 0,
      });
      expect(next).toHaveBeenCalledTimes(1);
    });
    //CREATE USER SCENARIO 2
    it("should send error response if user already exists", async () => {
      const req = {
        body: {
          username: "testuser",
          password: "testpassword",
        },
      };
      const res = {
        locals: {},
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      const next = jest.fn();

      User.findOne = jest.fn().mockResolvedValue({
        username: "testuser",
        favoritePokemon: 1,
      });

      await userController.createUser(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith({ username: "testuser" });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        message: "Username already exists",
      });
    });
  });

  describe("loginUser", () => {
    //LOGIN USER TEST
    //login scenario 1
    it("should log in with correct username and password", async () => {
      //const req,res,next
      const req = {
        body: {
          username: "testuser",
          password: "testpassword",
        },
        session: {
          isAuth: undefined,
          username: undefined,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        locals: {},
      };
      const next = jest.fn();

      User.findOne = jest.fn().mockResolvedValue({
        username: "testuser",
        password: await bcrypt.hash("testpassword", 10),
      });

      //invoke userController.loginUser with test constants
      await userController.loginUser(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith({
        username: "testuser",
      });
      expect(res.locals).toEqual({ user: { username: "testuser" } });
      expect(req.session.isAuth).toEqual(true);
      expect(req.session.username).toEqual("testuser");
      expect(next).toHaveBeenCalledTimes(1);
    });
    //login scenario 2
    it("should send a 401 if login credentials are not correct", async () => {
      //const req,res,next
      const req = {
        body: {
          username: "testuser",
          password: "testpassword",
        },
        session: {
          isAuth: undefined,
          username: undefined,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        locals: {},
      };
      const next = jest.fn();

      User.findOne = jest.fn().mockResolvedValue(null);
      //invoke userController.loginUser with test constants
      await userController.loginUser(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith({
        username: "testuser",
      });
      expect(res.locals).toEqual({});
      expect(req.session.isAuth).toEqual(undefined);
      expect(req.session.username).toEqual(undefined);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(next).toHaveBeenCalledTimes(0);

      // Test scenario when bcrypt.compare() function returns false
      User.findOne = jest.fn().mockResolvedValue({
        username: "testuser",
        password: "encryptedpassword",
      });
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      await userController.loginUser(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith({ username: "testuser" });
      expect(res.locals).toEqual({});
      expect(req.session.isAuth).toEqual(undefined);
      expect(req.session.username).toEqual(undefined);
      expect(res.status).toHaveBeenCalledWith(401);
    });

    it("should send an error when theres an error coming back from DB call", async () => {
      //const req,res,next
      const req = {
        body: {
          username: "testuser",
          password: "testpassword",
        },
        session: {
          isAuth: undefined,
          username: undefined,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        locals: {},
      };
      const next = jest.fn();

      // Test scenario when User.findOne() function throws an error
      User.findOne = jest.fn().mockImplementation(() => {
        throw new Error("Database error");
      });
      bcrypt.compare = jest.fn().mockResolvedValue(true);

      await userController.loginUser(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith({ username: "testuser" });
      expect(next).toHaveBeenCalledWith({
        log: "error caught in loginUser middleware!",
        status: 400,
        message: { err: new Error("Database error") },
      });
    });
  });

  //GETCURRFAVE TEST
  describe("getCurrFave", () => {
    it("should obtain the users favorite pokemon id", async () => {
      //const req,res,next
      const req = {
        session: {
          username: undefined,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        locals: {},
      };
      const next = jest.fn();

      //test scenario where user is returned from database
      User.findOne = jest
        .fn()
        .mockResolvedValue({ username: "testuser", favoritePokemon: 1 });
      //test invocation
      await userController.getCurrFave(req, res, next);

      expect(res.locals).toEqual({ currFave: 1 });
      expect(next).toHaveBeenCalledTimes(1);
    });

    it("should send 401 status if users aren't found", async () => {
      //const req,res,next
      const req = {
        session: {
          username: undefined,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        locals: {},
      };
      const next = jest.fn();

      //test scenario where null is returned from database
      User.findOne = jest.fn().mockResolvedValue(null);
      //test invocation
      await userController.getCurrFave(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith({
        message: "user can't be found",
      });
      expect(next).toHaveBeenCalledTimes(1);
    });
  });

  //VOTEBYUSER TEST
  describe("voteByUser", () => {
    //const req,res,next
    const req = {
      body: {
        favPokemon_id: 1,
      },
      session: {
        isAuth: undefined,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      locals: {},
    };
    const next = jest.fn();

    it("should set favpokemonid into res.locals and invoke next", async () => {
      User.findOne = jest
        .fn()
        .mockResolvedValue({ username: "testuser", favoritePokemon: 0 });
      User.findByIdAndUpdate = jest
        .fn()
        .mockResolvedValue({ username: "testuser", favoritePokemon: 1 });

      //invocation test
      await userController.voteByUser(req, res, next);

      expect(res.locals).toEqual({ favPokemon_id: 1 });
      expect(next).toHaveBeenCalledTimes(1);
    });
  });

  //ISAUTH TEST
  describe("isAuth", () => {
    //const req,res,next
    const req = {
      session: {
        isAuth: undefined,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      locals: {},
    };
    const next = jest.fn();

    it("should follow through to the next middleware if isAuth is truthy", async () => {
      req.session.isAuth = true;

      //test invocation
      await userController.isAuth(req, res, next);

      //expect
      expect(next).toHaveBeenCalledTimes(1);
    });

    it("should send a 401 status if isAuth is falsy", async () => {
      req.session.isAuth = undefined;

      //test invocation
      await userController.isAuth(req, res, next);

      //expect
      expect(next).toHaveBeenCalledTimes(0);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: "Unauthorized" });
    });
  });
});
