import User from "../../../entities/User";
import {
  FacebookConnectMutationArgs,
  FacebookConnectResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Mutation: {
    FacebookConnect: async (
      _,
      args: FacebookConnectMutationArgs
    ): Promise<FacebookConnectResponse> => {
      const { fbId } = args;
      try {
        // typeORM helps you find objects
        const existingUser = await User.findOne({ fbId })
        if(existingUser) {
          return {
            ok: true,
            error: null,
            token: "Coming soon, already"
          };
        }
      } catch(error) {
        return {
          ok: false,
          error: error.message,
          token: null
        };
      }
      try {
        await User.create({ 
          ...args, 
          profilePhoto: `http://graph.facebook.com/${fbId}/picture?type=square` 
        }).save();
        return {
          ok: true,
          error: null,
          token: "Coming soon, created"
        }
      } catch(error) {
        return {
          ok: false,
          error: error.message,
          token: null
        }
      }
    }
  }
};

export default resolvers;