import { ICourseStates, initialCourseStates } from '../state/course.states';
import { CourseActions, ECourseActions } from '../actions/course.actions';

export const courseReducers = (
  state: ICourseStates = initialCourseStates,
  action: CourseActions,
): ICourseStates => {
  switch (action.type) {
    case ECourseActions.GetCoursesSuccess:
      return {
        ...state,
        courses: [...action.payload],
      };
    case ECourseActions.DeleteCourseSuccess:
      return {
        ...state,
        courses: state.courses.filter(el => el.id !== action.payload),
      };
    default:
      return state;
  }
};
