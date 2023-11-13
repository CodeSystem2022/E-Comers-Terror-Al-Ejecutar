package ecommerce.utn.ecommerce.jar.service;

import ecommerce.utn.ecommerce.jar.models.Productos;
import ecommerce.utn.ecommerce.jar.repository.ProductosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoServiceImp implements ProductoService {

    @Autowired
    private ProductosRepository productosRepository;
    @Override
    public List<Productos> findAll() {
        return productosRepository.findAll();
    }

    @Override
    public Optional<Productos> findById(Long id) {
        return productosRepository.findById(id);
    }

    @Override
    public void save(Productos productos) {
        productosRepository.save(productos);
    }

    @Override
    public void deleteById(Long id) {
        productosRepository.deleteById(id);

    }
}
