const logger = require("./logger");
const jwt = require("jsonwebtoken");

const requestLogger = (request, response, next) => {
    logger.info("Method:", request.method);
    logger.info("Path:  ", request.path);
    logger.info("Body:  ", request.body);
    logger.info("---");
    next();
};

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
    logger.error(error.message);

    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" });
    } else if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message });
    }

    next(error);
};

const checkTitleUrl = (request, response, next) => {
    if (!request.body.title || !request.body.url) {
        console.log("Missing Information");
        return response.status(400).send({ error: "Bad request!" });
    }

    next();
};

// Take the auth token, derypt it and set it
// as request.token
const tokenExtractor = (request, response, next) => {
    const authorization = request.get("authorization");
    if (!(authorization && authorization.toLowerCase().startsWith("bearer "))) {
        return response.status(400).send({ error: "Bad token!" });
    }

    const token = authorization.substring(7);

    request.token = jwt.verify(token, process.env.SECRET);

    next();
};

const userExtractor = (request, response, next) => {
    request.user = request.token.id;
    next();
};

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    checkTitleUrl,
    tokenExtractor,
    userExtractor,
};
