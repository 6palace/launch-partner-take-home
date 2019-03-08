import React from 'react';
import { Form, Field, ErrorMessage, withFormik } from 'formik';
import DisplayPic from './DisplayPic';

const ProfileForm = (props) => {
  const { isSubmitting, setFieldValue, values, profile } = props;
  const { displayPic } = values;
  return (<Form>
    <div>
      <label htmlFor="name">Name: </label>
      <Field type="text" name="name" />
    </div>
    <div>
      <label htmlFor="description">Description: </label>
      <Field type="text" name="description" />
    </div>
    <div>
      <label htmlFor="displayPic">Profile Picture: </label>
      <input name="displayPic" type="file" onChange={(e) => {
        setFieldValue('displayPic', e.currentTarget.files[0]);
      }} />
    </div>
    <div>
      {(displayPic || profile.displayPicUrl) && <DisplayPic file={displayPic} fileUrl={profile.displayPicUrl}/>}
    </div>
    <button type="submit" disabled={isSubmitting}>
      Update
    </button>
  </Form>);
};

export default withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return {
      name: props.profile.name,
      description: props.profile.description,
    };
  },
  handleSubmit: (values, { props, setSubmitting }) => {
    props.onSubmit(values).then(() => {
      setSubmitting(false);
    });
    console.log('submitting', values);
  },
})(ProfileForm);
