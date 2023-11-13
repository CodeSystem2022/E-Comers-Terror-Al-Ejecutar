package ecommerce.utn.ecommerce.jar.service.securityService;

import ecommerce.utn.ecommerce.jar.dto.AuthUserDTO;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthenticateUserService {

    void getUserByCredentials(AuthUserDTO authUserDTO, HttpServletResponse response);
}
