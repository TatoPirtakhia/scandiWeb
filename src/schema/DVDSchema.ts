import * as yup from 'yup';

const DVDSchema = yup.object().shape({
  id: yup.string().required("Please provide an ID."),
  name: yup.string().required("Please provide a name."),
  price: yup.number().required("Please provide a price."),
  DVD: yup.object().shape({
    size: yup.number().required("Please provide a size."),
  }),
});

export default DVDSchema;
