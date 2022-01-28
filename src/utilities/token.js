const jwt = require('jsonwebtoken');

const token = {
    create_auth_token,
    verify_auth_token,
};

module.exports = token;

function create_auth_token(user_id, auth_code) {
    const payload = { user_id, auth_code };
    const secret = process.env.JWT_SECRET;
    const auth_token = jwt.sign(payload, secret, {
        //! Currently set to never expire
        // expiresIn: '60s'
    });
    return auth_token;
}

async function verify_auth_token(auth_token) {
    try {
        const auth_token_payload = await jwt.verify(auth_token, process.env.JWT_SECRET);
        console.log(`verify_auth_token ~ auth_token_payload`, auth_token_payload);
        return auth_token_payload;
    } catch (error) {
        return null;
    }
}
