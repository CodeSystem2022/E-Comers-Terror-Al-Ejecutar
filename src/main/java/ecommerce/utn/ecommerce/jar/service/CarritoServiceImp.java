package ecommerce.utn.ecommerce.jar.service;

import ecommerce.utn.ecommerce.jar.dto.CarritoDto;
import ecommerce.utn.ecommerce.jar.dto.ProductoEnCarritoDTO;
import ecommerce.utn.ecommerce.jar.models.Carrito;
import ecommerce.utn.ecommerce.jar.models.CarritoProductos;
import ecommerce.utn.ecommerce.jar.models.Productos;
import ecommerce.utn.ecommerce.jar.models.User;
import ecommerce.utn.ecommerce.jar.repository.CarritoProductosRepository;
import ecommerce.utn.ecommerce.jar.repository.CarritoRepository;
import ecommerce.utn.ecommerce.jar.repository.ProductosRepository;
import ecommerce.utn.ecommerce.jar.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CarritoServiceImp implements CarritoService{
    @Autowired
    private CarritoRepository carritoRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductosRepository productosRepository;

    @Autowired
    private CarritoProductosRepository carritoProductosRepository;





    @Override
    public List<CarritoDto> findAll() {
        return carritoRepository.findAll()
                .stream()
                .map(this::convertEntityToDtoList)
                .collect(Collectors.toList());
    }



    @Override
    public CarritoDto findById(Long id) {
        return carritoRepository.findById(id).stream().map(this::convertEntityToDtoList).collect(Collectors.toList()).get(0);
    }

    @Override
    public void save(CarritoDto carritoDto) {
        User usuario = userRepository.findById(carritoDto.getUserId()).get();
        Carrito newCarrito = new Carrito();
        newCarrito.setUsuario(usuario);
        int total = 0;
        List<Productos> productosList = new ArrayList<>();
        List<ProductoEnCarritoDTO> productoEnCarritoDTOList = carritoDto.getProductosList();
        List<CarritoProductos> carritoProductosList = new ArrayList<>();

        for (ProductoEnCarritoDTO producto : productoEnCarritoDTOList) {
            Productos productos = productosRepository.findById(producto.getProductoId()).get();
            if (productos!=null){
                total += productos.getPrecio() * producto.getQuantity();
                productosList.add(productos);
                CarritoProductos carritoProductos = new CarritoProductos();

                carritoProductos.setCarrito(newCarrito);
                carritoProductos.setProductos(productos);
                carritoProductos.setQuantity(producto.getQuantity());
                carritoProductos.setDateTime(LocalDateTime.now());
                carritoProductosList.add(carritoProductos);
            }
            newCarrito.setTotal(total);
            carritoRepository.save(newCarrito);

            carritoProductosRepository.saveAll(carritoProductosList);
            carritoRepository.save(newCarrito);
        }
    }

    @Override
    public void deleteById(Long id) {
        List<CarritoProductos> carritoProductos = carritoProductosRepository.findAllByCarritoId(id);
        carritoProductosRepository.deleteAll(carritoProductos);
        carritoRepository.deleteById(id);
    }

    public CarritoDto convertEntityToDtoList(Carrito carrito){
        CarritoDto carritoDto = new CarritoDto();
        carritoDto.setId(carrito.getId());
        carritoDto.setUserId(carrito.getUsuario().getId());
        carritoDto.setUserName(carrito.getUsuario().getNombre());
        List<CarritoProductos> carritoProductosList = carritoProductosRepository.findAllByCarritoId(carrito.getId());
        List<ProductoEnCarritoDTO> productoEnCarritoDTOList = new ArrayList<>();


        carritoProductosList.stream().forEach(carritoProductos ->{
            ProductoEnCarritoDTO productoEnCarritoDTO = new ProductoEnCarritoDTO();
            productoEnCarritoDTO.setProductoId(carritoProductos.getProductos().getId());
            productoEnCarritoDTO.setQuantity(carritoProductos.getQuantity());
            productoEnCarritoDTOList.add(productoEnCarritoDTO);
        });

        productoEnCarritoDTOList.stream().forEach(producto -> {
            Productos productos = productosRepository.findById(producto.getProductoId()).get();
        });

        carritoDto.setTotal(carrito.getTotal());
        carritoDto.setProductosList(productoEnCarritoDTOList);
        return carritoDto;
    }
}
