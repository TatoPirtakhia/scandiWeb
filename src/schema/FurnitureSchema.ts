import * as yup from "yup";

const FurnitureSchema = yup.object().shape({
  id: yup.string().required("Please provide an ID."),
  name: yup.string().required("Please provide a name."),
  price: yup.number().required("Please provide a price."),
  Furniture: yup.object().shape({
    Height: yup.number().required("Please provide a height."),
    Width: yup.number().required("Please provide a width."),
    Length: yup.number().required("Please provide a length."),
  }),
});

export default FurnitureSchema;
