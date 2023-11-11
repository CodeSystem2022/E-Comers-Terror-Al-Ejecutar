package ecommerce.utn.ecommerce.jar.dto;


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
