// import jwtAxios from "../common/JwtAxios.js";
// import useStoryStore from "../store/useStoryStore.js";
//
// const useStoryGenerator = () => {
//
//     const {} = useStoryStore()
//
//     const requestFirstContentOptions = () => {
//         const data = {
//             "baseStory": baseStory
//         }
//         jwtAxios.post(`http://localhost:8000/ai/stories/${storyId}/init`, data)
//             .then(res => {
//                 if (res.status === 200) {
//                     setStoryContext(res.data.storyContext);
//                     setSentenceOptions(res.data.sentenceOptions);
//                 }
//             })
//             .catch(error => {
//                 console.log(error);
//             })
//     }
//
//     return {
//         requestFirstContentOptions,
//
//     }
// }
//
// export default useStoryGenerator;