import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

export const ManageCoursePage = ({
	authors,
	courses,
	loadAuthors,
	loadCourses,
	saveCourse,
	history,
	...props
}) => {
	const [course, setCourse] = useState({ ...props.course });
	const [errors, setErrors] = useState({});
	const [saving, setSaving] = useState(false);

	useEffect(() => {
		if (courses.length === 0) {
			loadCourses().catch(error => {
				"loading curses failed" + error;
			});
		} else {
			setCourse({ ...props.course });
		}

		if (authors.length === 0) {
			loadAuthors().catch(error => {
				"loading authors failed" + error;
			});
		}
	}, [props.course]);

	const handleChange = event => {
		const { name, value } = event.target;
		setCourse(prevCourse => ({
			...prevCourse,
			[name]: name === "authorId" ? parseInt(value, 10) : value
		}));
	};

	const formIsValid = () => {
		const { title, authorId, category } = course;
		const errors = {};

		if (!title) errors.title = "Title is required";
		if (!authorId) errors.author = "Author is required";
		if (!category) errors.category = "Category is required";

		setErrors(errors);
		//Form is valid if errors still has no properties
		return Object.keys(errors).length === 0;
	};

	const handleSave = event => {
		event.preventDefault();
		if (!formIsValid()) return;
		setSaving(true);
		saveCourse(course)
			.then(() => {
				toast.success("Course Saved!");
				history.push("/courses/");
			})
			.catch(error => {
				setSaving(false);
				setErrors({ onSave: error.message });
				toast.error(error.message);
			});
	};

	return courses.length !== 0 && authors.length !== 0 ? (
		<CourseForm
			course={course}
			errors={errors}
			authors={authors}
			onChange={handleChange}
			onSave={handleSave}
			saving={saving}
		/>
	) : (
		<Spinner />
	);
};

ManageCoursePage.propTypes = {
	course: PropTypes.object.isRequired,
	courses: PropTypes.array.isRequired,
	authors: PropTypes.array.isRequired,
	loadAuthors: PropTypes.func.isRequired,
	loadCourses: PropTypes.func.isRequired,
	saveCourse: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired
};

const getCoursesBySlug = (courses, slug) => {
	return courses.find(course => course.slug === slug) || null;
};

function mapStateToProps(state, ownProps) {
	const slug = ownProps.match.params.slug;
	const course =
		slug && state.courses.length > 0
			? getCoursesBySlug(state.courses, slug)
			: newCourse;
	return {
		course,
		courses: state.courses,
		authors: state.authors,
		apiCallsInProgress: state.apiCallsInProgress
	};
}

const mapDispatchToProps = {
	loadCourses: courseActions.loadCourses,
	saveCourse: courseActions.saveCourse,
	loadAuthors: authorActions.loadAuthors
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ManageCoursePage);
