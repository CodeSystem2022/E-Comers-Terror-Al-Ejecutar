package ecommerce.utn.ecommerce.jar.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "carrito_productos")
@AllArgsConstructor
@NoArgsConstructor
public class CarritoProductos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "carrito_id")
    private Carrito carrito;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "productos_id")
    private Productos productos;
    @Column(name = "quantity")
    private int quantity;
    @Column(name = "date_time")
    private LocalDateTime dateTime;
}
