const INVALID_TOKEN = "Error code 10";
const INVALID_TOKEN_EXPIRED = "Error code 11";
const INVALID_PASSWORD = "Error code 12";   
const INVALID_SECRET_KEY = "Error code 13";
const INVALID_TOKEN_NOT_AUTHORIZED = "Unauthorized";
const INVALID_USER_BY_CPF = "User not found by CPF";
const INVALID_ROLE_UNAUTHORIZED = "Role unauthorized";
const INVALID_CPF_OR_PASSWORD = "Invalid CPF or password";
const INVALID_UNRECOGNIZED_ERROR = "Ocorreu um erro desconhecido. Contate o suporte!";
const INVALID_UNKNOWN = "Unrecognized error. Contact the support!";

const errors_auth_code = {
    INVALID_TOKEN,
    INVALID_TOKEN_EXPIRED,
    INVALID_PASSWORD,
    INVALID_SECRET_KEY,
    INVALID_TOKEN_NOT_AUTHORIZED,
    INVALID_USER_BY_CPF,
    INVALID_ROLE_UNAUTHORIZED,
    INVALID_CPF_OR_PASSWORD,
    INVALID_UNRECOGNIZED_ERROR,
    INVALID_UNKNOWN
}

const INVALID_USER_BY_ID = "Error code 14";
const INVALID_USER_ALREADY_EXISTS = "User already exists with this CPF";
const INVALID_USER_ROLE_ADMIN = "User dont have admin role permission";

const errors_user_code = {
    INVALID_USER_BY_ID,
    INVALID_USER_BY_CPF,
    INVALID_USER_ALREADY_EXISTS,
    INVALID_UNRECOGNIZED_ERROR,
    INVALID_TOKEN,
    INVALID_USER_ROLE_ADMIN
}  

const INVALID_PRODUCT_ALREADY_EXIST = "Product already exists with this ID";

const errors_product_code = {
    INVALID_UNRECOGNIZED_ERROR,
    INVALID_PRODUCT_ALREADY_EXIST
}

export { errors_auth_code, errors_user_code, errors_product_code };