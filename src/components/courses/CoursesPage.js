import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class CoursePage extends React.Component {
	state = {
		redirectToAddCourePage: false
	};
	componentDidMount() {
		const { authors, courses, actions } = this.props;
		if (courses.length === 0) {
			actions.loadCourses().catch(error => {
				"loading curses failed" + error;
			});
		}

		if (authors.length === 0) {
			actions.loadAuthors().catch(error => {
				"loading authors failed" + error;
			});
		}
	}

	handleDeleteCourse = async course => {
		toast.success("Course Deleted!");
		try {
			await this.props.actions.deleteCourse(course);
		} catch (error) {
			toast.error("Delete failed. " + error.message, {
				autoClose: false
			});
		}
	};

	render() {
		return (
			<>
				{this.state.redirectToAddCourePage && (
					<Redirect to="/course/" />
				)}
				<h2>Courses</h2>
				{this.props.loading ? (
					<Spinner />
				) : (
					<>
						<button
							style={{ marginBottom: 20 }}
							className="btn btn-primary add-course"
							onClick={() =>
								this.setState({ redirectToAddCourePage: true })
							}
						>
							Add Course
						</button>
						<CourseList
							onDeleteClick={this.handleDeleteCourse}
							courses={this.props.courses}
						/>
					</>
				)}
			</>
		);
	}
}

CoursePage.propTypes = {
	actions: PropTypes.object.isRequired,
	courses: PropTypes.array.isRequired,
	authors: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
	return {
		courses:
			state.authors.length === 0
				? []
				: state.courses.map(course => {
						return {
							...course,
							authorName: state.authors.find(
								a => a.id === course.authorId
							).name
						};
				  }) /* eslint-disable-line no-mixed-spaces-and-tabs*/,
		authors: state.authors,
		loading: state.apiCallsInProgress > 0
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			loadCourses: bindActionCreators(
				courseActions.loadCourses,
				dispatch
			),
			loadAuthors: bindActionCreators(
				authorActions.loadAuthors,
				dispatch
			),
			deleteCourse: bindActionCreators(
				courseActions.deteleCourse,
				dispatch
			)
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CoursePage);
