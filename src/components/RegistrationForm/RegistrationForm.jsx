import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";

const RegistrationSchema = Yup.object().shape({
  name: Yup.string().min(3, "Name is too short").required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password is too short")
    .required("Password is required"),
});

export const RegisterForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(register(values))
      .unwrap()
      .then(() => {
        console.log("Registration successful");
        resetForm();
      })
      .catch((error) => {
        if (error?.response?.data?.message?.includes("duplicate key")) {
          alert(
            "This email is already registered. Please use a different email."
          );
        } else {
          console.error("Registration failed:", error);
          alert(
            "This email is already registered. Please use a different email."
          );
        }
      });
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={RegistrationSchema}
      onSubmit={handleSubmit}
    >
      <Form autoComplete="off">
        <label>
          Name
          <Field type="text" name="name" />
          <ErrorMessage name="name" component="p" />
        </label>
        <label>
          Email
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="p" />
        </label>
        <label>
          Password
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="p" />
        </label>
        <button type="submit">Register</button>
      </Form>
    </Formik>
  );
};
