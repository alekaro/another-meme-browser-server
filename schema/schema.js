const { GraphQLSchema } = require("graphql");
const _ = require("lodash");
const Book = require("../models/book");
const Author = require("../models/author");

const graphql = require("graphql");
const User = require("../models/user");
const Meme = require("../models/meme");
const MemeComment = require("../models/memeComment");

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
      resolve(parent, args) {
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
      resolve(parent, args) {
        return User.findById(parent.userId);
      },
    },
    comments: {
      type: new GraphQLList(MemeCommentType),
      resolve(parent, args) {
        return MemeComment.find({ memeId: parent.id });
      },
    },
  }),
});

const MemeCommentType = new GraphQLObjectType({
  name: "MemeComment",
  fields: () => ({
    id: { type: GraphQLID },
    content: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      },
    },
    meme: {
      type: MemeType,
      resolve(parent, args) {
        return Meme.findById(parent.memeId);
      },
    },
  }),
});

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // return _.find(authors, { id: parent.authorId });
        return Author.findById(parent.authorId);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return _.filter(books, { authorId: parent.id });
        return Book.find({ authorId: parent.id });
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
      resolve(parent, args) {
        return User.findById(args.id);
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({});
      },
    },
    meme: {
      type: MemeType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Meme.findById(args.id);
      },
    },
    memes: {
      type: new GraphQLList(MemeType),
      resolve(parent, args) {
        return Meme.find({});
      },
    },
    memeComment: {
      type: MemeCommentType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return MemeComment.findById(args.id);
      },
    },
    memeCommentsByMeme: {
      type: new GraphQLList(MemeCommentType),
      args: { memeId: { type: GraphQLID } },
      resolve(parent, args) {
        return MemeComment.find({ memeId: memeId });
      },
    },
    memeCommentsByUser: {
      type: new GraphQLList(MemeCommentType),
      args: { userId: { type: GraphQLID } },
      resolve(parent, args) {
        return MemeComment.find({ userId: userId });
      },
    },
    memeCommentsByMemeAndUser: {
      type: new GraphQLList(MemeCommentType),
      args: { memeId: { type: GraphQLID }, userId: { type: GraphQLID } },
      resolve(parent, args) {
        return MemeComment.find({ memeId: memeId, userId: userId });
      },
    },

    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(books, { id: args.id });
        return Book.findById(args.id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(authors, { id: args.id });
        return Author.findById(args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books;
        return Book.find({});
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // return books;
        console.log("test1");
        // return Author.find({});
        const authorList = Author.find({});
        console.log(authorList);
        return authorList;
      },
    },
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
      resolve(parent, args) {
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
      resolve(parent, args) {
        let meme = new Meme({
          title: args.title,
          content: args.content,
          userId: args.userId,
        });
        return meme.save();
      },
    },
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age,
        });
        return author.save();
      },
    },

    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });

        return book.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
