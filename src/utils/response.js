const success = (res, data = null) => {
    return res.json({
        code: 200,
        message: 'Success',
        data
    });
};

const error = (res, code = 500, message = 'Internal Server Error') => {
    return res.status(code).json({
        code,
        message
    });
};

export default { success, error };
