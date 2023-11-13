package ecommerce.utn.ecommerce.jar.repository;

import ecommerce.utn.ecommerce.jar.models.Productos;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductosRepository extends JpaRepository<Productos, Long> {
}
