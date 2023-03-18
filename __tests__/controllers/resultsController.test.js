const resultsController = require("../../server/controllers/resultsController");
const Result = require("../../server/models/ResultModel.js");
const User = require("../../server/models/UserModel.js");


describe("resultsController", () => {
  beforeEach(() => {
    // Reset the mock implementations before each test to ensure they don't interfere with each other
    jest.clearAllMocks();
  });

  describe("getResults", () => {
    // Write your tests for the getResults function here
    it("should get poll results from the database and store them in res.locals.results", async () => {
      const mockResults = { pollResults: { 1: 5, 2: 3 } };
      Result.findOne = jest.fn().mockResolvedValue(mockResults);

      const req = {};
      const res = { locals: {} };
      const next = jest.fn();

      await resultsController.getResults(req, res, next);

      expect(Result.findOne).toHaveBeenCalledTimes(1);
      expect(res.locals.results).toEqual(mockResults.pollResults);
      expect(next).toHaveBeenCalledTimes(1);
    });
  });

  describe("updateResults", () => {
    // Write your tests for the updateResults function here
    it("should update poll results based on user's favorite Pokemon", async () => {
      //Mock results data for testing
      const mockResults = {
        _id: "63f7e7b98329d735e21de9ae",
        pollResults: { 1: 0, 2: 0, 3: 0 },
      };

      //mock user data for testing
      const mockUsers = [
        { favoritePokemon: 1 },
        { favoritePokemon: 2 },
        { favoritePokemon: 3 },
      ];

      //mock database operations
      Result.findOne = jest.fn().mockResolvedValue(mockResults);
      User.find = jest.fn().mockResolvedValue(mockUsers);

      Result.findByIdAndUpdate = jest.fn().mockImplementation((id, update, options) => {
        const updatedResults = {
          ...mockResults,
          pollResults: {
            1: 1,
            2: 1,
            3: 1,
          },
        };
        return Promise.resolve(updatedResults);
      });

      const req = {};
      const res = { locals: { favPokemon_id: 1 } };
      const next = jest.fn();

      await resultsController.updateResults(req, res, next);

      expect(Result.findOne).toHaveBeenCalledTimes(1);
      expect(User.find).toHaveBeenCalledTimes(1);
      expect(Result.findByIdAndUpdate).toHaveBeenCalledTimes(1);
      expect(res.locals.newResults.pollResults).toEqual({ 1: 1, 2: 1, 3: 1 });
      expect(next).toHaveBeenCalledTimes(1);
    });
  });
});
