const { GraphQLSchema } = require("graphql");
const _ = require("lodash");

const graphql = require("graphql");
const User = require("../models/user");
const Meme = require("../models/meme");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    login: { type: GraphQLString },
    password: { type: GraphQLString },
    nickname: { type: GraphQLString },
    email: { type: GraphQLString },
    memes: {
      type: new GraphQLList(MemeType),
      resolve(parent: any, args: any) {
        return Meme.find({ userId: parent.id });
      },
    },
  }),
});

const MemeType = new GraphQLObjectType({
  name: "Meme",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent: any, args: any) {
        return User.findById(parent.userId);
      },
    },
    comments: {
      type: new GraphQLList(CommentType),
    },
  }),
});

const CommentType = new GraphQLObjectType({
  name: "Comment",
  fields: () => ({
    id: { type: GraphQLID },
    content: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent: any, args: any) {
        return User.findById(parent.userId);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent: any, args: any) {
        return User.findById(args.id);
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent: any, args: any) {
        return User.find({});
      },
    },
    meme: {
      type: MemeType,
      args: { id: { type: GraphQLID } },
      resolve(parent: any, args: any) {
        return Meme.findById(args.id);
      },
    },
    memes: {
      type: new GraphQLList(MemeType),
      resolve(parent: any, args: any) {
        return Meme.find({});
      },
    },
    // memeComment: {
    //   type: MemeCommentType,
    //   args: { id: { type: GraphQLID } },
    //   resolve(parent: any, args: any) {
    //     return MemeComment.findById(args.id);
    //   },
    // },
    // memeCommentsByMeme: {
    //   type: new GraphQLList(MemeCommentType),
    //   args: { memeId: { type: GraphQLID } },
    //   resolve(parent: any, args: any) {
    //     return MemeComment.find({ memeId: args.memeId });
    //   },
    // },
    // memeCommentsByUser: {
    //   type: new GraphQLList(MemeCommentType),
    //   args: { userId: { type: GraphQLID } },
    //   resolve(parent: any, args: any) {
    //     return MemeComment.find({ userId: args.userId });
    //   },
    // },
    // memeCommentsByMemeAndUser: {
    //   type: new GraphQLList(MemeCommentType),
    //   args: { memeId: { type: GraphQLID }, userId: { type: GraphQLID } },
    //   resolve(parent: any, args: any) {
    //     return MemeComment.find({ memeId: args.memeId, userId: args.userId });
    //   },
    // },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        login: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        nickname: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent: any, args: any) {
        let user = new User({
          login: args.login,
          password: args.password,
          email: args.email,
          nickname: args.nickname,
        });
        return user.save();
      },
    },
    addMeme: {
      type: MemeType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent: any, args: any) {
        let meme = new Meme({
          title: args.title,
          content: args.content,
          userId: args.userId,
          comments: args.comments,
        });
        return meme.save();
      },
    },
    addComment: {
      type: CommentType,
      args: {
        memeId: { type: new GraphQLNonNull(GraphQLID) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
        content: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent: any, args: any) {
        let meme = Meme.find({ memeId: args.memeId });

        meme.comments.push(new Comment());

        return meme.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
