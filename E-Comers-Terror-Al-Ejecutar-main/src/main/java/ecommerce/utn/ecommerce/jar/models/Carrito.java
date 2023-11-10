package ecommerce.utn.ecommerce.jar.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "carrito")
@AllArgsConstructor
@NoArgsConstructor
public class Carrito {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "usuario_id")
    private User usuario;
    @Column(name = "total")
    private Integer total;

    //coments
}
