export const GET_QUESTIONS = "GET_QUESTIONS";

export default function receiveQuestions(questions) {
	return {
		type: GET_QUESTIONS,
		questions,
	};
}
