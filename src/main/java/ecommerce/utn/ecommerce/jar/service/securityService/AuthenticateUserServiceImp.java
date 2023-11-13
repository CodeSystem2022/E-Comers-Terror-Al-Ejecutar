package ecommerce.utn.ecommerce.jar.service.securityService;

import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import ecommerce.utn.ecommerce.jar.dto.AuthUserDTO;
import ecommerce.utn.ecommerce.jar.models.User;
import ecommerce.utn.ecommerce.jar.repository.UserRepository;
import ecommerce.utn.ecommerce.jar.exceptions.AuthenticationErrorException;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ecommerce.utn.ecommerce.jar.security.JWTUtil;

@Service
public class AuthenticateUserServiceImp implements AuthenticateUserService{
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JWTUtil jwtUtil;


    @Override
    public void getUserByCredentials(AuthUserDTO authUserDTO, HttpServletResponse response) {

        //permite consultar el usuario por el email
        User authenticatedUser = userRepository.findUserByEmail(authUserDTO.getEmail())
                .orElseThrow(() -> new AuthenticationErrorException("Error when authenticating data"));

        //Obtenemos la contraseña Hasheada del usario
        String passwordHashed = authenticatedUser.getPassword();
        //instanciamos el argon2 para poder verificar las contraseñas
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);

        //verificamos que la contraseña en la BD y la que envian para autenticar sean iguales
        if(argon2.verify(passwordHashed, authUserDTO.getPassword())) {
            //generamos el token con él, id y el email
            String token = jwtUtil.create(String.valueOf(authenticatedUser.getId()), authenticatedUser.getEmail());
            //regresamos el token creado por header
            response.addHeader("Authorization", "Bearer " + token);
            System.out.println(token);
        }
        else{
            //se lanzará una excepción aquí de autenticación
            throw new AuthenticationErrorException("Error when authenticating data");
        }
    }
}
