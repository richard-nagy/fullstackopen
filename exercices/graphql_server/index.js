const { ApolloServer, UserInputError, gql } = require("apollo-server");
const { v1: uuid } = require("uuid");

let authors = [
    {
        name: "Robert Martin",
        id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
        born: 1952,
    },
    {
        name: "Martin Fowler",
        id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
        born: 1963,
    },
    {
        name: "Fyodor Dostoevsky",
        id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
        born: 1821,
    },
    {
        name: "Joshua Kerievsky", // birthyear not known
        id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    },
    {
        name: "Sandi Metz", // birthyear not known
        id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
    },
];

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conección con el libro
 */

let books = [
    {
        title: "Clean Code",
        published: 2008,
        author: "Robert Martin",
        id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
        genres: ["refactoring"],
    },
    {
        title: "Agile software development",
        published: 2002,
        author: "Robert Martin",
        id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
        genres: ["agile", "patterns", "design"],
    },
    {
        title: "Refactoring, edition 2",
        published: 2018,
        author: "Martin Fowler",
        id: "afa5de00-344d-11e9-a414-719c6709cf3e",
        genres: ["refactoring"],
    },
    {
        title: "Refactoring to patterns",
        published: 2008,
        author: "Joshua Kerievsky",
        id: "afa5de01-344d-11e9-a414-719c6709cf3e",
        genres: ["refactoring", "patterns"],
    },
    {
        title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
        published: 2012,
        author: "Sandi Metz",
        id: "afa5de02-344d-11e9-a414-719c6709cf3e",
        genres: ["refactoring", "design"],
    },
    {
        title: "Crime and punishment",
        published: 1866,
        author: "Fyodor Dostoevsky",
        id: "afa5de03-344d-11e9-a414-719c6709cf3e",
        genres: ["classic", "crime"],
    },
    {
        title: "The Demon ",
        published: 1872,
        author: "Fyodor Dostoevsky",
        id: "afa5de04-344d-11e9-a414-719c6709cf3e",
        genres: ["classic", "revolution"],
    },
];

const typeDefs = gql`
    type Author {
        name: String!
        id: ID!
        born: Int!
        bookCount: Int!
    }

    type Book {
        title: String!
        id: ID!
        published: Int!
        author: String!
        genres: [String]
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
    }

    type Mutation {
        addBook(title: String!, published: Int!, author: String!, genres: [String]): Book
        editAuthor(name: String!, setBornTo: Int!): Author
    }
`;

const resolvers = {
    Query: {
        bookCount: () => books.length,
        authorCount: () => authors.length,
        allBooks: (root, args) => {
            let result = books;

            if (args.author) {
                result = result.filter((book) => book.author === args.author);
            }

            if (args.genre) {
                result = result.filter((book) => book.genres.includes(args.genre));
            }

            return result;
        },
        allAuthors: (root, args) => {
            let result = authors;

            result = result.map((e) => (e.born ? e : { ...e, born: 0 }));

            const countOfBooks = {};

            books.forEach((book) => {
                countOfBooks[book.author]
                    ? (countOfBooks[book.author] += 1)
                    : (countOfBooks[book.author] = 1);
            });

            result = result.map((e) => ({ ...e, bookCount: countOfBooks[e.name] }));

            return result;
        },
    },
    Mutation: {
        addBook: (root, args) => {
            if (books.find((book) => book.title === args.title)) {
                throw new UserInputError("Title must be unique", {
                    invalidArgs: args.name,
                });
            }

            if (
                !authors.find((author) => {
                    author.name === args.author;
                })
            ) {
                authors.push({ name: args.author, id: uuid(), born: 0 });
            }

            const book = { ...args, id: uuid() };
            books = books.concat(book);
            return book;
        },
        editAuthor: (root, args) => {
            const index = authors.findIndex((e) => e.name === args.name);

            if (index < 0) {
                return null;
            }

            authors[index] = { ...authors[index], born: args.setBornTo };

            return authors[index];
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
