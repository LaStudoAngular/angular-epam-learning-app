import { ICourseState, initialCourseState } from '../state/course.state';
import { CourseActions, ECourseActions } from '../actions/course.actions';

export const courseReducers = (
  state: ICourseState = initialCourseState,
  action: CourseActions,
): ICourseState => {
  switch (action.type) {
    case ECourseActions.GetCoursesSuccess:
      return {
        ...state,
        courses: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
