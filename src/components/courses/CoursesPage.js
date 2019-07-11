import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

class CoursePage extends React.Component {
	componentDidMount() {
		this.props.actions.loadCourses().catch(error => {
			"loading curses failed" + error;
		});
	}

	render() {
		return (
			<>
				<h2>Courses</h2>
				{this.props.courses.map(course => (
					<div key={course.title}>{course.title}</div>
				))}
			</>
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
