import { UserPlusIcon, CheckCircleIcon, MapPinIcon } from "lucide-react";
import { getLanguageFlag } from "./FriendCard";
import { useThemeStore } from "../redux/store";



const LearnerRecommendations = ({ loadingUsers, recommendedUsers, sendRequestMutation, isPending,sender,buttonchanger}) => {

    const {theme}=useThemeStore();
    console.log(recommendedUsers,"recc-user");
   
console.log('buttonchanger value', buttonchanger);


  return (
    <> <div data-theme={theme}>
      <div className="mb-4 mb-sm-5">
        <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-3" style={{color:'var(--primary-color)',borderRadius:'12px'}}>

          <div style={{margin:'auto',marginTop:'8px'}}>
            <h2 >Meet New Learners</h2>
            {/* <p className="text-muted">
              Discover perfect language exchange partners based on your profile
            </p> */}
          </div>
        </div>
      </div>
      <hr/>

      {loadingUsers ? (
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border text-primary" role="status" />
        </div>
      ) : recommendedUsers.length === 0 ? (
        <div className="text-center p-4" style={{ backgroundColor: 'var(--bg-color)',color:'var(--primary-color)'}} >
          <h5 className="fw-semibold mb-2">No recommendations available</h5>
          {/* <p className="text-muted">Check back later for new language partners!</p> */}
        </div>
      ) : (
        <div className="row gy-4" data-theme={theme}>
          {recommendedUsers.map((user) => {

            return (
              <div className="col-12 col-md-6 col-lg-4" key={user._id}>
                <div style={{backgroundColor:'var(--bg-color)',color:'var(--primary-color)',border:'1px dashed var(--primary-color)'}}>

                  <div className="card-body d-flex flex-column gap-2" style={{color:'var(--primmary-color)'}}>

                    {/* User Info */}
                    <div className="d-flex align-items-center gap-3" style={{color:'var(--primary-color)'}}>
                      <div
                        className="rounded-circle overflow-hidden flex-shrink-0"
                        style={{ width: "64px", height: "64px",color:'var(--primary-color)' }}
                      >
                        <img
                          src={user.profilePicture}
                          alt={user.username}
                          className="img-fluid object-fit-cover w-100 h-100"
                        />
                       
                      </div>
                      <div style={{color:'var(--primary-color)'}}>
                        <h5 className="fw-semibold mb-1">{user.username}</h5>
                        {user.location && (
                          <div className="d-flex align-items-center text-muted small" >
                            <MapPinIcon size={14} className="me-1" style={{color:'var(--primary-color)'}} />
                            <span style={{color:'var(--primary-color)'}}>{user.location}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Language Badges */}
                    <div className="d-flex flex-wrap gap-2">
                      <span className="badge bg-secondary text-white text-uppercase">
                        {getLanguageFlag(user.nativeLanguage)}
                        Native: {capitialize(user.nativeLanguage)}
                      </span>
                      <span className="badge border border-secondary text-secondary text-uppercase">
                        {getLanguageFlag(user.learningLanguage)}
                        Learning: {capitialize(user.learningLanguage)}
                      </span>
                    </div>

                    {/* Bio */}
                    {user.bio && (
                      <p  style={{color:'var(--primary-color)'}}>{user.bio}</p>
                    )}
                    {/* Action Button */}
                    <button
                    key={user._id}
                      className={`btn mt-2 d-flex align-items-center justify-content-center ${
                        buttonchanger.has(user._id) ?  "btn-outline-secondary disabled"  : "btn-primary" 
                      }`}
                      onClick={() => {console.log("req-sent to ",user.username,user._id);
                        sendRequestMutation({
                            sentTo:user._id,
                            sendBy:sender
                        });
                       buttonchanger.add(user._id);
                      }}
                      
                      style={{borderRadius:'20px'}}>
                      {buttonchanger.has(user._id) ? (
                        <>
                        <CheckCircleIcon size={16} className="me-2" />
                          Request Sent
                        
                        </>
                      ) : (
                       <>
                          <UserPlusIcon size={16} className="me-2" />
                          Send Friend Request
                       </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      </div>
    </>
  );
};

export default LearnerRecommendations;
function capitialize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}
