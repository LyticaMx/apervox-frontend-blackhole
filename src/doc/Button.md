# Componente boton

### `Propiedades`

| Propiedad | Descripción                                                | Opciones                          | Valor por defecto |
| --------- | ---------------------------------------------------------- | --------------------------------- | ----------------- |
| type      | Tipo de boton (Se pasa directamente a la etiqueta button). | "sm" / "md" / "lg"                | "md"              |
| size      | Controla el tamaño del contenedor y contenido.             | "button" / "submit" / "reset"     | "button"          |
| variant   | Controla el aspecto del boton.                             | "text" / "outlined" / "contained" | "text"            |

## Personalización

Para obtener un boton cyan

### `type text`

```
className='text-cyan-500 hover:bg-cyan-100'
```

### `type outlined`

```
className='text-cyan-500 border-cyan-500 hover:bg-cyan-100'
```

### `type contained`

```
className='text-cyan-500 bg-cyan-100 hover:bg-cyan-200'
```
