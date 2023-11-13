package ecommerce.utn.ecommerce.jar.controllers;

import ecommerce.utn.ecommerce.jar.models.Productos;
import ecommerce.utn.ecommerce.jar.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class ProductoController {
    @Autowired
    private ProductoService productoService;
    @GetMapping("/api/producto")
    public List<Productos> findAll(){
        return productoService.findAll();
    }

    @GetMapping("api/producto/{id}")
    public Optional<Productos> findProductoById(@PathVariable Long id){
        return productoService.findById(id);
    }

    @PostMapping("/api/producto")
    public ResponseEntity<String> saveUser(@RequestBody Productos productos){
        productoService.save(productos);
        return ResponseEntity.ok("producto creado con exitoooo");
    }

    @DeleteMapping("/api/producto/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Long id){
        productoService.deleteById(id);
        return ResponseEntity.ok("producto eliminado con exito");
    }

}
