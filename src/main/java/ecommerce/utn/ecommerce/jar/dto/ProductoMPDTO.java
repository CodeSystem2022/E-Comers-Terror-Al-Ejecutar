package ecommerce.utn.ecommerce.jar.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductoMPDTO implements Serializable {
    private String nombre;
    private Integer precio;
    private String categoria;
    private String imagen;
    private int quantity;
}
