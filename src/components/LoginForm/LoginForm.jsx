import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password is too short")
    .required("Password is required"),
});

export const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(logIn(values))
      .unwrap()
      .then(() => {
        console.log("login success");
        resetForm();
      })
      .catch(() => {
        console.log("login error");
      });
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={handleSubmit}
    >
      <Form autoComplete="off">
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
        <button type="submit">Log In</button>
      </Form>
    </Formik>
  );
};
