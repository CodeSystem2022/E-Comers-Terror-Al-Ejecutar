package ecommerce.utn.ecommerce.jar.repository;

import ecommerce.utn.ecommerce.jar.models.CarritoProductos;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CarritoProductosRepository extends CrudRepository<CarritoProductos, Long> {

    List<CarritoProductos> findAllByCarritoId(Long CarritoId);
}
