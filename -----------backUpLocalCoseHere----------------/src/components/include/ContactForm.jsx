import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useFormik } from "formik";
import * as Yup from 'yup';

const FormValidation = Yup.object({
  user_name: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Name should contain only alphabets.")  // Only alphabets and spaces
    .min(3, "Name must be at least 3 characters long.")
    .required("Please enter your name."),
  user_email: Yup.string()
    .email("Please enter a valid email address.")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address."
    )
    .required("Please enter your email."),
//   country_code: Yup.string()
//     .matches(/^\+\d{1,3}$/, "Please enter a valid country code (e.g., +1, +44 etc.).")
//     .required("Please enter your country code."),
  user_phone: Yup.string()
    .matches(/^[0-9]{3,20}$/, "Please enter a valid phone number.")
    .required("Please enter your phone number."),
  user_message: Yup.string().min(2, "Message must be at least 2 characters long."),
});

const initialValues = {
  user_name: "",
  user_email: "",
  country_code: "",
  user_phone: "",
  user_message: "",
}

function ContactForm() {
  const form = useRef();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: FormValidation,
    onSubmit: (values, { resetForm }) => {
      emailjs.sendForm('service_naawjgt', 'template_a4uikdp', form.current, 'AfE4HvuZzuzIll5hy')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
      resetForm();
    }
  });

  return (
    <>
      <form ref={form} onSubmit={formik.handleSubmit} className="form_area contact_us">
        <div className="row">
            <div className="col-xs-12">
                <input 
                    type="text" 
                    name="user_name"
                    placeholder="Your Name"
                    className="form-control input_area"
                    value={formik.values.user_name} 
                    onBlur={formik.handleBlur} 
                    onChange={formik.handleChange} 
                    title="Name must contain only alphabets."
                />
                {formik.errors.user_name && formik.touched.user_name && <small>{formik.errors.user_name}</small>}
            </div>{/*--cols--*/}
            <div className="col-xs-12 col-md-6">
                <input 
                    type="email" 
                    name="user_email"
                    placeholder="Your Email Address"
                    className="form-control input_area" 
                    value={formik.values.user_email} 
                    onBlur={formik.handleBlur} 
                    onChange={formik.handleChange} 
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" 
                    title="Please enter a valid email address." 
                />
                {formik.errors.user_email && formik.touched.user_email && <small>{formik.errors.user_email}</small>}
            </div>{/*--cols--*/}
            <div className="col-xs-12 col-md-6">
                <input 
                    type="text" 
                    name="user_phone" 
                    placeholder="Your Phone Number"
                    className="form-control input_area" 
                    value={formik.values.user_phone} 
                    onBlur={formik.handleBlur} 
                    onChange={formik.handleChange} 
                    pattern="[0-9]{3,20}" 
                    title="Please enter a valid phone number with 3 to 20 digits." 
                />
                {formik.errors.user_phone && formik.touched.user_phone && <small>{formik.errors.user_phone}</small>}
            </div>{/*--cols--*/}
            <div className="col-xs-12">
                <textarea 
                    name="user_message"
                    placeholder="Enter a message..." 
                    className="form-control text_area"
                    value={formik.values.user_message} 
                    onBlur={formik.handleBlur} 
                    onChange={formik.handleChange} 
                />
                {formik.errors.user_message && formik.touched.user_message && <small>{formik.errors.user_message}</small>}
            </div>{/*--cols--*/}
            <div className="col-xs-12">
                <button type="submit" className="c_btn">Submit</button>
            </div>{/*--cols--*/}
        </div>{/*--row--*/}
      </form>
    </>
  );
}

export default ContactForm;
