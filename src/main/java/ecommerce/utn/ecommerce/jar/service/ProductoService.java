package ecommerce.utn.ecommerce.jar.service;

import ecommerce.utn.ecommerce.jar.models.Productos;

import java.util.List;
import java.util.Optional;

public interface ProductoService {
    List<Productos> findAll();

    Optional<Productos> findById(Long id);

    void save(Productos productos);

    void deleteById(Long id);
}
