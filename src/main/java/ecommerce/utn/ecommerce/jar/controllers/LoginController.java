package ecommerce.utn.ecommerce.jar.controllers;

import ecommerce.utn.ecommerce.jar.dto.AuthUserDTO;
import ecommerce.utn.ecommerce.jar.service.securityService.AuthenticateUserService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    private final AuthenticateUserService authenticateUserService;


    public LoginController(AuthenticateUserService authenticateUserService) {
        this.authenticateUserService = authenticateUserService;
    }

    @PostMapping("/api/login")
    public void login(@RequestBody AuthUserDTO authUserDTO, HttpServletResponse response) {
        authenticateUserService.getUserByCredentials(authUserDTO, response);
    }
}
