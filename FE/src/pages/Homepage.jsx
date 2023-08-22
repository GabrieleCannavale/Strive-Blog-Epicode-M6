import NewPostModal from "../components/newPostModal/NewPostModal";
import PostContainer from "../components/postContainer/PostContainer";
import NavigationBar from "../components/navigationBar/NavigationBar";

const Homepage = () => {
	return (
		<>
			<NavigationBar />
			<NewPostModal />
			<PostContainer />
		</>
	)
};

export default Homepage;