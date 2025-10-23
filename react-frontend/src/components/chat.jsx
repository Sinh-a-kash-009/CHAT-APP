import { useParams } from 'react-router-dom';
import useAuthUser from '../hooks/useAuthUser';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getStreamToken } from '../redux/axios';
import {
  Chat,
  Channel,
  MessageInput,
  MessageList,
  Thread,
  Window,
  useChannelStateContext,
} from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import ChatLoader from '../components/chatLoader';
import { useThemeStore } from "../redux/store";
import CallButton from '../components/callbutton';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// ✅ Custom ChannelHeader
function CustomChannelHeader({ user }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '0.75rem 1rem',
      backgroundColor: 'white',
      borderRadius:'15px'
    }}>
      <img
        src={user?.profilePicture || 'https://avatar.iran.liara.run/public/boy'}
        alt="User Avatar"
        style={{ width: '40px', height: '40px', borderRadius: '50%' }}
      />
      <h4 style={{ margin: 0 }}>{user?.username || 'You'}</h4>
    </div>
  );
}

function Chatbox() {
  const navigate=useNavigate();
  const { theme } = useThemeStore();
  const { id: targetUser } = useParams();
  const [chatclient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const { authUser } = useAuthUser();
  const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

  const { data: messageData } = useQuery({
    queryKey: ['streamtoken'],
    queryFn: () => getStreamToken(authUser._id),
    enabled: !!authUser,
  });

  useEffect(() => {
    if (!messageData?.token || !authUser || !targetUser) return;
    if (chatclient) {
      chatclient.disconnectUser();
    }

    const initChat = async () => {
      setLoading(true);
      try {
        const client = StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.username,
            image: authUser.profilePicture,
          },
          messageData.token
        );

        const channelId = [authUser._id, targetUser].sort().join('-');
        const currChannel = client.channel('messaging', channelId, {
          members: [authUser._id, targetUser],
        });

        await currChannel.watch();

        setChatClient(client);
        setChannel(currChannel);
      } catch (error) {
        console.error('Error initializing Stream Chat:', error);
      } finally {
        setLoading(false);
      }
    };

    initChat();
  }, [messageData, authUser, targetUser]);

  const handleVideoCall =  () => {

    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;
      channel.sendMessage({
        text: `I've started a video call. Join me here: ${callUrl}`,
      });
     

      toast.success("Video call link sent successfully!");
    }
  };

  if (!chatclient || !channel || !targetUser || loading) {
    return <ChatLoader />;
  }

  return (
    <div data-theme={theme}>
      <div style={{ height: '90.8vh', backgroundColor: 'var(--bg-color)' }}>
        <Chat client={chatclient} theme="messaging dark">
          <Channel channel={channel}>
            <div className="position-relative" style={{ width: '99%' }}>
              <Window>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <CustomChannelHeader user={authUser} />
                  <div style={{ marginRight: '1rem' }}>
                    <CallButton handleVideoCall={handleVideoCall} />
                  </div>
                </div>
                <hr />
                <MessageList />
                <MessageInput focus />
              </Window>
            </div>
            <Thread />
          </Channel>
        </Chat>
      </div>
    </div>
  );
}

export default Chatbox;
