

export const errorHandler = (err, req, res, next) => {
    // console.error('Error:', err);

    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    // Handle specific Mongoose errors nicely
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(err.errors).map(val => val.message).join(', ');
    }

    if (err.code && err.code === 11000) {
        statusCode = 400;
        message = 'Duplicate Email value entered.';
    }

    if (err.name === 'CastError') {
        statusCode = 400;
        message = `Invalid ${err.path}: ${err.value}`;
    }

    res.status(statusCode).json({
        status: 'error',
        message,
    });
};
