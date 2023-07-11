import * as yup from "yup";

const BookSchema = yup.object().shape({
  id: yup.string().required("Please provide an ID."),
  name: yup.string().required("Please provide a name."),
  price: yup.number().required("Please provide a price."),
  Book: yup.object().shape({
    Weight: yup.number().required("Please provide a weight."),
  }),
});

export default BookSchema;
