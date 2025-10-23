import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../constant/index";
import { useQuery } from "@tanstack/react-query";
import { fetch_friends } from "../redux/axios";
import useAuthUser  from '../hooks/useAuthUser'


const friendsCard = () => {
    const { isLoading, authUser } = useAuthUser();
     
     const {data:friends_data=[],isloading:friends_loading}=useQuery({
        queryKey:['friends'],
        queryFn:()=>fetch_friends(authUser._id),

     })
     if(friends_loading){
        return <div>loading</div>
     }
  console.log("friendss in friendscard",friends_data);
  console.log("id od the friend ",friends_data[0]._id);

  return (
  <>
    {friends_data.map((friend) => (
      <div className="card border bg-light shadow-sm hover-shadow transition mb-3" key={friend._id}>
        <div className="card-body p-3">

          {/* USER INFO */}
          <div className="d-flex align-items-center gap-3 mb-3">
            <div
              className="rounded-circle overflow-hidden"
              style={{ width: "48px", height: "48px" }}
            >
              <img
                src={friend.profilePicture}
                alt={friend.username}
                className="img-fluid object-fit-cover h-100 w-100"
              />
            </div>
            <h5 className="mb-0 text-truncate fw-semibold">{friend.username}</h5>
          </div>

          {/* LANGUAGE BADGES */}
          <div className="d-flex flex-wrap gap-2 mb-3">
            <span className="badge bg-secondary text-light text-uppercase">
              {getLanguageFlag(friend.nativeLanguage)}
              Native: {friend.nativeLanguage}
            </span>
            <span className="badge border border-secondary text-secondary text-uppercase">
              {getLanguageFlag(friend.learningLanguage)}
              Learning: {friend.learningLanguage}
            </span>
          </div>

          {/* MESSAGE BUTTON */}
          <Link to={`/group/${friend._id}`} className="btn btn-outline-primary w-100">
            Message
          </Link>
        </div>
      </div>
    ))}
  </>
);

};

export default friendsCard;

export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 mr-1 inline-block"
      />
    );
  }
  return null;
}