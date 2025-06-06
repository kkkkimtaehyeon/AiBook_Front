// import {useEffect, useState} from "react";
// import {useNavigate} from "react-router-dom";
// import {api} from "../common/CustomAxios.js";
//
// const useStorySelection = () => {
//     const [activeTab, setActiveTab] = useState('all');
//     const [stories, setStories] = useState([]);
//     const [selectedStory, setSelectedStory] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();
//
//     // 더미 데이터
//     const mockStories = [
//         {
//             id: 1,
//             title: "The Little Bear's Adventure",
//             description: "A heartwarming tale of a young bear's journey through the forest.",
//             thumbnail: "/src/assets/image_loading.jpg",
//             writer: "Author One",
//             viewCount: 150,
//             likeCount: 23,
//             tags: [{ id: 1, name: "모험" }, { id: 2, name: "동물" }]
//         },
//         {
//             id: 2,
//             title: "The Magical Treehouse",
//             description: "Two siblings discover a treehouse that takes them on incredible adventures.",
//             thumbnail: "/src/assets/image_loading.jpg",
//             writer: "Author Two",
//             viewCount: 203,
//             likeCount: 45,
//             tags: [{ id: 3, name: "마법" }, { id: 4, name: "형제자매" }]
//         },
//         {
//             id: 3,
//             title: "The Princess and the Dragon",
//             description: "A brave princess befriends a dragon and learns valuable lessons.",
//             thumbnail: "/src/assets/image_loading.jpg",
//             writer: "Author Three",
//             viewCount: 89,
//             likeCount: 12,
//             tags: [{ id: 5, name: "공주" }, { id: 6, name: "용" }]
//         }
//     ];
//
//     const tabs = [
//         { value: 'all', label: '전체 동화' },
//         { value: 'my', label: '내 동화' }
//     ];
//
//     useEffect(() => {
//         fetchStories();
//     }, [activeTab]);
//
//     const fetchStories = async () => {
//         setLoading(true);
//         setError(null);
//
//         try {
//             // 실제 API 호출 시 사용할 코드
//             if (process.env.NODE_ENV === 'production') {
//                 const endpoint = activeTab === 'all' ? '/api/stories' : '/api/stories/my';
//                 const response = await api.get(`${endpoint}`);
//
//                 if (response.status === 200) {
//                     setStories(response.data.data.content || response.data.data);
//                 }
//             } else {
//                 // 개발 환경에서는 더미 데이터 사용
//                 await new Promise(resolve => setTimeout(resolve, 500)); // 로딩 시뮬레이션
//                 setStories(mockStories);
//             }
//         } catch (error) {
//             console.error("Error fetching stories:", error);
//             setError(error);
//             // 에러 발생 시에도 더미 데이터 사용
//             setStories(mockStories);
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     const handleTabChange = (tab) => {
//         setActiveTab(tab);
//         setSelectedStory(null); // 탭 변경 시 선택 초기화
//     };
//
//     const handleStorySelect = (story) => {
//         setSelectedStory(story);
//     };
//
//     const handleNext = () => {
//         if (selectedStory) {
//             navigate('/dubbing/recording', { state: { selectedStory } });
//         }
//     };
//
//     const handleBack = () => {
//         navigate(-1);
//     };
//
//     return {
//         activeTab,
//         stories,
//         selectedStory,
//         loading,
//         error,
//         tabs,
//         handleTabChange,
//         handleStorySelect,
//         handleNext,
//         handleBack,
//         refetch: fetchStories
//     };
// };
//
// export default useStorySelection;