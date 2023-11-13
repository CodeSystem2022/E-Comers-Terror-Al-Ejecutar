package ecommerce.utn.ecommerce.jar.dto;


import ecommerce.utn.ecommerce.jar.models.Productos;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PreferenceItem implements Serializable {

    private List<ProductoMPDTO> productosList;
}
