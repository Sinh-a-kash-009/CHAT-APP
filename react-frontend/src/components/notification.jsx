import { useThemeStore } from "../redux/store";
import {getfriendreq,acceptreq} from "../redux/axios";
import { useQuery ,useQueryClient} from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { BellIcon, ClockIcon, MessageSquareIcon, UserCheckIcon } from "lucide-react";

function Notification({isLoading,current_user}){
    const queryClient=useQueryClient();
    const {theme}=useThemeStore();
    if(isLoading){
        return <div>loading</div>
    }
    const {data:whoSendMeReq} = useQuery({
        queryKey: ['friendreq'],
        queryFn: ()=>getfriendreq(current_user),
        enabled: !!current_user

      });

      const {mutate:toacceptreq,isPending} = useMutation({
        mutationFn: acceptreq,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['friendreq'] });
          queryClient.invalidateQueries({ queryKey: ['friends'] });
        },
      });

      //

      const incomingReq=whoSendMeReq?.incomingreq ||[];
      const acceptedreq=whoSendMeReq?.acceptreq ||[];
      console.log("in notification page",incomingReq,acceptedreq);



    return <div className="p-4" data-theme={theme}>
  <div className="container mx-auto max-w-4xl space-y-8">
    <h1 className="h3 mb-4 fw-bold" style={{textAlign:'center',color:'var(--primary-color)'}}>Notifications</h1>

    {isLoading ? (
      <div className="d-flex justify-content-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    ) : (
      <>
        {incomingReq.length > 0 && (
          <section className="mb-5">
            <h2 className="h5 d-flex align-items-center gap-2">
              <UserCheckIcon className="me-2 text-primary" />
              Friend Requests
              <span className="badge bg-primary ms-2">{incomingReq.length}</span>
            </h2>

            <div className="mt-3">
              {incomingReq.map((request) => (
                <div key={request._id} className="card mb-3 shadow-sm">
                  <div className="card-body p-4 d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-3">
                      <div className="rounded-circle overflow-hidden" style={{ width: '56px', height: '56px' }}>
                        <img src={request.sender.profilePic} alt={request.sender.fullName} className="img-fluid" />
                      </div>
                      <div>
                        <h3 className="h6 fw-semibold mb-1">{request.sender.fullName}</h3>
                        <div className="d-flex flex-wrap gap-2 mt-1">
                          <span className="badge bg-secondary">
                            Native: {request.sender.nativeLanguage}
                          </span>
                          <span className="badge border border-secondary text-secondary">
                            Learning: {request.sender.learningLanguage}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => toacceptreq(request._id)}
                      disabled={isPending}
                    >
                      Accept
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {acceptedreq.length > 0 && (
          <section className="mb-5">
            <h2 className="h5 d-flex align-items-center gap-2">
              <BellIcon className="me-2 text-success" />
              New Connections
            </h2>

            <div className="mt-3">
              {acceptedreq.map((notification) => (
                <div key={notification._id} className="card mb-3 shadow-sm">
                  <div className="card-body p-4 d-flex align-items-start gap-3">
                    <div className="rounded-circle overflow-hidden mt-1" style={{ width: '40px', height: '40px' }}>
                      <img
                        src={notification.recipient.profilePic}
                        alt={notification.recipient.fullName}
                        className="img-fluid"
                      />
                    </div>
                    <div className="flex-grow-1">
                      <h3 className="h6 fw-semibold mb-1">{notification.recipient.fullName}</h3>
                      <p className="text-muted small mb-1">
                        {notification.recipient.fullName} accepted your friend request
                      </p>
                      <p className="text-muted d-flex align-items-center mb-0" style={{ fontSize: '0.75rem' }}>
                        <ClockIcon className="me-1" size={12} />
                        Recently
                      </p>
                    </div>
                    <span className="badge bg-success d-flex align-items-center">
                      <MessageSquareIcon className="me-1" size={12} />
                      New Friend
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {incomingReq.length === 0 && acceptedreq.length === 0 && (
          <p style={{textAlign:'center',color:'var(--primary-color)'}}>No notifications</p>
        )}
      </>
    )}
  </div>
</div>

}
export default Notification;