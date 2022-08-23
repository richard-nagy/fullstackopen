const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
    },
    author: {
        type: String,
        required: true,
        minlength: 5,
    },
    url: {
        type: String,
        required: true,
        minlength: 5,
    },
    likes: {
        type: Number,
        required: true,
        set: (value) => (value ? value : 0),
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

blogSchema.set("toJSON", {
    transform: (_, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

module.exports = mongoose.model("Blog", blogSchema);
