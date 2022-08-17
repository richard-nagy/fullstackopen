const mongoose = require("mongoose");

if (!(process.argv.length === 3 || process.argv.length === 5)) {
    console.log("Please give good datas");
    console.log("Process argv length:", process.argv.length);
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://userNR:${password}@cluster0.0jec0s6.mongodb.net/phonebook?retryWrites=true&w=majority`;

const userSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const User = mongoose.model("User", userSchema);

if (process.argv.length === 3) {
    mongoose
        .connect(url)
        .then(() => {
            User.find({}).then((result) => {
                console.log("Phonebook:");
                result.forEach((user) => {
                    console.log(`${user.name} ${user.number}`);
                });
                mongoose.connection.close();
            });
        })
        .catch((err) => console.log(err));
    return;
}

const name = process.argv[3];
const number = process.argv[4];

mongoose
    .connect(url)
    .then(() => {
        const user = new User({
            name: name,
            number: number,
        });

        return user.save();
    })
    .then(() => {
        console.log(`Added ${name} number ${number} to phonebook`);
        return mongoose.connection.close();
    })
    .catch((err) => console.log(err));
