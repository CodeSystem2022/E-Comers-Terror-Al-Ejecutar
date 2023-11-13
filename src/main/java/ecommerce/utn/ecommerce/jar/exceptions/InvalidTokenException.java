package ecommerce.utn.ecommerce.jar.exceptions;

import java.security.SignatureException;

public class InvalidTokenException extends SignatureException {
    public InvalidTokenException(String message) {
        super(message);
    }
}
