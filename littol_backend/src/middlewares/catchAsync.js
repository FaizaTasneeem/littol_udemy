const errorMap = {
    VALIDATION_ERROR: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    CONFLICT_ERROR: 409,
};

export const catchAsync = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            const error_status_code = errorMap[error.code] || 500;
            const message = error.message || 'Internal server error'; 
            return res.status(error_status_code).json({message}); 
        }
    };
};