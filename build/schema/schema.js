"use strict";
var GraphQLSchema = require("graphql").GraphQLSchema;
var _ = require("lodash");
var graphql = require("graphql");
var User = require("../models/user");
var Meme = require("../models/meme");
var MemeComment = require("../models/memeComment");
var GraphQLObjectType = graphql.GraphQLObjectType, GraphQLString = graphql.GraphQLString, GraphQLID = graphql.GraphQLID, GraphQLInt = graphql.GraphQLInt, GraphQLList = graphql.GraphQLList, GraphQLNonNull = graphql.GraphQLNonNull;
var UserType = new GraphQLObjectType({
    name: "User",
    fields: function () { return ({
        id: { type: GraphQLID },
        login: { type: GraphQLString },
        password: { type: GraphQLString },
        nickname: { type: GraphQLString },
        email: { type: GraphQLString },
        memes: {
            type: new GraphQLList(MemeType),
            resolve: function (parent, args) {
                return Meme.find({ userId: parent.id });
            },
        },
    }); },
});
var MemeType = new GraphQLObjectType({
    name: "Meme",
    fields: function () { return ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        user: {
            type: UserType,
            resolve: function (parent, args) {
                return User.findById(parent.userId);
            },
        },
        comments: {
            type: new GraphQLList(MemeCommentType),
            resolve: function (parent, args) {
                return MemeComment.find({ memeId: parent.id });
            },
        },
    }); },
});
var MemeCommentType = new GraphQLObjectType({
    name: "MemeComment",
    fields: function () { return ({
        id: { type: GraphQLID },
        content: { type: GraphQLString },
        user: {
            type: UserType,
            resolve: function (parent, args) {
                return User.findById(parent.userId);
            },
        },
        meme: {
            type: MemeType,
            resolve: function (parent, args) {
                return Meme.findById(parent.memeId);
            },
        },
    }); },
});
var RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve: function (parent, args) {
                return User.findById(args.id);
            },
        },
        users: {
            type: new GraphQLList(UserType),
            resolve: function (parent, args) {
                return User.find({});
            },
        },
        meme: {
            type: MemeType,
            args: { id: { type: GraphQLID } },
            resolve: function (parent, args) {
                return Meme.findById(args.id);
            },
        },
        memes: {
            type: new GraphQLList(MemeType),
            resolve: function (parent, args) {
                return Meme.find({});
            },
        },
        memeComment: {
            type: MemeCommentType,
            args: { id: { type: GraphQLID } },
            resolve: function (parent, args) {
                return MemeComment.findById(args.id);
            },
        },
        memeCommentsByMeme: {
            type: new GraphQLList(MemeCommentType),
            args: { memeId: { type: GraphQLID } },
            resolve: function (parent, args) {
                return MemeComment.find({ memeId: memeId });
            },
        },
        memeCommentsByUser: {
            type: new GraphQLList(MemeCommentType),
            args: { userId: { type: GraphQLID } },
            resolve: function (parent, args) {
                return MemeComment.find({ userId: userId });
            },
        },
        memeCommentsByMemeAndUser: {
            type: new GraphQLList(MemeCommentType),
            args: { memeId: { type: GraphQLID }, userId: { type: GraphQLID } },
            resolve: function (parent, args) {
                return MemeComment.find({ memeId: memeId, userId: userId });
            },
        },
    },
});
var Mutation = new GraphQLObjectType({
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
            resolve: function (parent, args) {
                var user = new User({
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
            resolve: function (parent, args) {
                var meme = new Meme({
                    title: args.title,
                    content: args.content,
                    userId: args.userId,
                });
                return meme.save();
            },
        },
    },
});
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
