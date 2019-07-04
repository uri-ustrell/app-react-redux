import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

class CoursePage extends React.Component {
	state = {
		course: {
			title: "title of course"
		}
	};

	handleChange = event => {
		const course = {
			...this.state.course.title,
			title: event.target.value
		};
		this.setState({ course });
	};

	handleSubmit = event => {
		event.preventDefault();
		this.props.actions.createCourse(this.state.course);
	};

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<h2>Courses</h2>
				<h3>Add Course</h3>
				<input
					type="text"
					onChange={this.handleChange}
					value={this.state.course.title}
				/>
				<input type="submit" value="Save" />
				{this.props.courses.map(course => (
					<div key={course.title}>{course.title}</div>
				))}
			</form>
		);
	}
}

CoursePage.propTypes = {
	actions: PropTypes.object.isRequired,
	courses: PropTypes.array.isRequired
};

function mapStateToProps(state) {
	return {
		courses: state.courses
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(courseActions, dispatch)
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CoursePage);
