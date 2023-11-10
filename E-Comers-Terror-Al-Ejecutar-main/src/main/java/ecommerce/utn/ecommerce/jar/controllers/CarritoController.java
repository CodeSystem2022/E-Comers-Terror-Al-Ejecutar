package ecommerce.utn.ecommerce.jar.controllers;

import ecommerce.utn.ecommerce.jar.dto.CarritoDto;
import ecommerce.utn.ecommerce.jar.exceptions.InvalidTokenException;
import ecommerce.utn.ecommerce.jar.security.ValidateToken;
import ecommerce.utn.ecommerce.jar.service.CarritoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CarritoController {
    @Autowired
    private CarritoService carritoService;
    @Autowired
    private ValidateToken validateToken;


    @GetMapping("/api/carrito")
    public List<CarritoDto> findAll(){
        return carritoService.findAll();
    }

    @GetMapping("api/carrito/{id}")
    public CarritoDto findCarritoById(@PathVariable Long id){
        return carritoService.findById(id);
    }

    @PostMapping("/api/carrito")
    public ResponseEntity<String> saveCarrito(@RequestHeader(value="Authorization") String token,
                                              @RequestBody CarritoDto carritoDto) throws InvalidTokenException {
        if (!validateToken.isValidToken(token)){
            return ResponseEntity.badRequest().body("token invalido");
        }else{
            carritoService.save(carritoDto);
            return ResponseEntity.ok("carrito creado");
        }

    }

    @DeleteMapping("/api/carrito/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Long id){
        carritoService.deleteById(id);
        return ResponseEntity.ok("carrito eliminado con exito");
    }
}
