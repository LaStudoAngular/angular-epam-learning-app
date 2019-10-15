import { ICourseStates, initialCourseStates } from '../state/course.states';
import { CourseActions, ECourseActions } from '../actions/course.actions';
import { Course } from 'src/app/@models/course';

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
    case ECourseActions.AddCourseSuccess:
      return {
        ...state,
        courses: [...state.courses.concat(action.payload)],
      };
    case ECourseActions.EditCourseSuccess:
      return {
        ...state,
        courses: state.courses.map((el: Course) => {
          if (el.id === action.payload.id) {
            return {
              name: action.payload.name,
              description: action.payload.description,
              isTopRated: action.payload.isTopRated,
              date: action.payload.date,
              authors: action.payload.authors,
              length: action.payload.length,
              id: action.payload.id,
            };
          } else {
            return el;
          }
        })
      }
    case ECourseActions.SearchCourseSuccess:
      console.log(action.payload);
      return {
        ...state,
        courses: [...action.payload]
      }
    default:
      return state;
  }
};
