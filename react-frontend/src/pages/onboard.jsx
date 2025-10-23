import useAuthUser from '../hooks/useAuthUser';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { completeOnboarding } from '../redux/axios';
import {SpotlightCard2} from '../components/spotlightcard';
import { CameraIcon, MessageCircleHeart } from 'lucide-react';
import { LANGUAGES } from '../constant';

function ONBOARD() {
  const queryClient = useQueryClient();
  const { authUser } = useAuthUser();

  // Main state
  const [formstate, setformstate] = useState({
    username: authUser?.username || '',
    bio: authUser?.bio || '',
    nativeLanguage: authUser?.nativeLanguage || '',
    learningLanguage: authUser?.learningLanguage || '',
    profilePicture: authUser?.profilePicture || '',
    location: '',
  });

  // React Query mutation
  const { mutate, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      alert('Profile onboarded successfully');
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
    },
  });

  // Submit handler
  function handleSubmit(e) {
    e.preventDefault();
    const { username, bio, nativeLanguage, learningLanguage, location } = formstate;

    if (!username || !bio || !nativeLanguage || !learningLanguage || !location) {
      alert('Please fill all the fields');
      return;
    }

    mutate(formstate);
  }

  // Avatar generator
  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    setformstate({ ...formstate, profilePicture: randomAvatar });
  };

  return (
    <div style={{ 
      backgroundColor: 'black', 
      color: 'white',
      width: '100vw', 
      height: '100vh' 
    }}>
      <div
        style={{
          width: '24vw',
          height: '70vh',
          borderRadius: '0px',
          margin: 'auto',
          position: 'relative',
          top: '29px',
          padding: '20px',
        }}
      >
        <SpotlightCard2 className="custom-spotlight-card" spotlightColor="rgba(6, 212, 40, 0.2)">
          <form onSubmit={handleSubmit}>
            <span style={{ color: '#8b5cf6' }}>
              <MessageCircleHeart strokeWidth={0.75} /> --ONBOARDING
            </span>
            <hr style={{ borderColor: '#8b5cf6' }} />

            {/* Profile Picture */}
            <div
              className="d-flex flex-column align-items-center justify-content-center gap-2"
              style={{ height: '16vh' }}
            >
              <div
                className="rounded-circle d-flex justify-content-center align-items-center overflow-hidden"
                style={{ backgroundColor: '#8b5cf6', width: '50px', height: '50px' }}
              >
                {formstate.profilePicture ? (
                  <img
                    src={formstate.profilePicture}
                    alt="Profile"
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                ) : (
                  <CameraIcon style={{ width: '48px', height: '48px', color: 'black' }} />
                )}
              </div>

              <button type="button" className="btn" style={{ backgroundColor: '#8b5cf6', color: 'white' }} onClick={handleRandomAvatar}>
                Generate Random Avatar
              </button>
            </div>

            {/* Username */}
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={formstate.username}
                className="form-control"
                placeholder="Enter your username"
                onChange={(e) => setformstate({ ...formstate, username: e.target.value })}
                style={{ backgroundColor: 'black', color: 'white', borderColor: '#8b5cf6' }}
              />
            </div>

            {/* Bio */}
            <div className="mb-3">
              <label htmlFor="bio" className="form-label">
                Bio
              </label>
              <textarea
                name="bio"
                id="bio"
                value={formstate.bio}
                className="form-control"
                placeholder="Enter your bio"
                onChange={(e) => setformstate({ ...formstate, bio: e.target.value })}
              />
            </div>

            {/* Native Language */}
            <div className="mb-3">
              <label className="form-label">Native Language</label>
              <select
                name="nativeLanguage"
                value={formstate.nativeLanguage}
                onChange={(e) => setformstate({ ...formstate, nativeLanguage: e.target.value })}
                className="form-select"
              >
                <option value="">Select your native language</option>
                {LANGUAGES.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            {/* Learning Language */}
            <div className="mb-3">
              <label className="form-label">Learning Language</label>
              <select
                name="learningLanguage"
                value={formstate.learningLanguage}
                onChange={(e) => setformstate({ ...formstate, learningLanguage: e.target.value })}
                className="form-select"
              >
                <option value="">Select language to learn</option>
                {LANGUAGES.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div className="mb-3">
              <input
                type="text"
                name="location"
                id="location"
                value={formstate.location}
                className="form-control"
                placeholder="Enter your location"
                onChange={(e) => setformstate({ ...formstate, location: e.target.value })}
              />
            </div>

            {/* Submit */}
            <button type="submit" className="btn btn-success" style={{ position:'relative',left:'23px',width:'300px'}}>
              Complete Onboarding
            </button>
            <p className="text-center mt-2">Click the button to get onboarded</p>
          </form>
        </SpotlightCard2>
      </div>
    </div>
  );
}

export default ONBOARD;
