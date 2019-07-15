import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput.js";
import SelectInput from "../common/SelectInput.js";
import ManageCoursePage from "./ManageCoursePage.js";

const CourseForm = ({
	course,
	authors,
	onSave,
	onChange,
	saving = false,
	errors = {}
}) => {
	return (
		<form onSubmit={onSave}>
			<h2>{course.id ? "Edit" : "Add"}</h2>
			{errors.onSave && (
				<div className=" alert alert-danger" role="alert">
					{errors.onSave}
				</div>
			)}
			<TextInput
				name="title"
				label="Title"
				value={course.title}
				onChange={onChange}
				error={errors.title}
			/>

			<SelectInput
				name="authorId"
				label="Author"
				value={course.authorId || ""}
				defaultOption="SelectAuthor"
				options={authors.map(a => ({
					value: a.id,
					text: a.name
				}))}
				onChange={onChange}
				error={errors.author}
			/>

			<TextInput
				name="category"
				label="Category"
				value={course.category}
				onChange={onChange}
				error={errors.category}
			/>
			<button type="submit" disabled={saving} className="btn btn-primary">
				{saving ? "Saving..." : "Save"}
			</button>
		</form>
	);
};

CourseForm.propTypes = {
	course: PropTypes.object.isRequired,
	errors: PropTypes.object,
	authors: PropTypes.array.isRequired,
	onSave: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	saving: PropTypes.bool
};

export default CourseForm;
