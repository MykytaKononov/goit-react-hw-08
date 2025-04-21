import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";

const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .required("Required field")
    .min(3, "Too short name")
    .max(50, "Too long name"),
  number: Yup.string()
    .required("Required field")
    .min(3, "Too short number")
    .max(50, "Too long number"),
});

export default function ContactForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    const contact = {
      name: values.name.trim(),
      number: values.number.trim(),
    };
    console.log("Data to be sent to backend:", contact);

    if (!contact.name || !contact.number) {
      console.error("Missing required fields: name or number");
      alert("Please fill in both name and number.");
      return;
    }
    dispatch(addContact(contact))
      .unwrap()
      .then(() => {
        console.log("Contact added successfully");
        resetForm();
      })
      .catch((error) => {
        console.error("Failed to add contact:", error);
      });
  };

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      <Form>
        <div>
          <label htmlFor="name">Name</label>
          <Field type="text" name="name" id="name" />
          <ErrorMessage name="name" component="p" />
        </div>
        <div>
          <label htmlFor="number">Number</label>
          <Field type="tel" name="number" id="number" />
          <ErrorMessage name="number" component="p" />
        </div>
        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
}
