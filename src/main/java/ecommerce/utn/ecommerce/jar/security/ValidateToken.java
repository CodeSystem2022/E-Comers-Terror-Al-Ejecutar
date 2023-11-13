package ecommerce.utn.ecommerce.jar.security;

import ecommerce.utn.ecommerce.jar.exceptions.InvalidTokenException;
import lombok.Getter;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.SignatureException;

@Component

public class ValidateToken {


    private final JWTUtil jwtUtil;
    @Getter
    private Long userID;

    public ValidateToken(JWTUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    public boolean isValidToken(String token) throws InvalidTokenException {

        //filtramos que el token no sea nulo y que además venga con el formato correcto
        if(token != null && token.startsWith("Bearer ")) {
            System.out.println("si empieza con bearer:" + token);
            //debemos quitar la frase incial para no tener problemas con el token
            token = token.replace("Bearer ", "");
            System.out.println("sin el bearer antes del try" + token);

            try {
                // no retorna el ID, si el token es correcto, de lo contrario lanza una excepción
                String validToken = jwtUtil.getKey(token);
                System.out.println("sin el bearer" + token);
                userID = Long.valueOf(validToken);
                return true;
            }catch(SignatureException e){
                throw new InvalidTokenException(e.getMessage());
            }

        }
        return  false;
    }

}
