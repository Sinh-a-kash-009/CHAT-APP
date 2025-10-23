import { useState } from 'react';
import { GooeyNav1 } from '../components/gooenav';
import { SpotlightCard } from '../components/spotlightcard';
import {LoginForm} from '../components/form';
import {SignupForm }from '../components/form';
import TextPressure from '../components/textpressure';
import GradientText from '../components/study-sync-title';
import Threads from '../components/threads';
import { FlowingMenu } from '../components/flowingmenu';
import { CircularGallery } from '../components/circulargallery';
import Footer from '../components/footer';
export default function WELCOME() {
    const items = [
        { label: "LOGIN", link: "/" },
        { label: "SIGNUP", link: "/" },
    ];
    const demoItems = [
        { link: '#', text: 'sharing notes and resources', image: 'https://picsum.photos/600/400?random=1' },
        { link: '#', text: 'collaborating on projects', image: 'https://picsum.photos/600/400?random=2' },
        { link: '#', text: 'studying together', image: 'https://picsum.photos/600/400?random=3' },
        { link: '#', text: 'staying organized', image: 'https://picsum.photos/600/400?random=4' }
    ];
    
    const [login, setLogin] = useState(false);
    const [signup, setSignup] = useState(false);
    
    function loginorsignup(e, index) {
        console.log(e, index);
        if (index === 0) {
            setLogin(true);
            setSignup(false);
        }
        else {
            setSignup(true);
            setLogin(false);
        }
        console.log(login, signup);
    }
    
    return (
        <>
        <div style={{ 
            width: '100vw', 
            height: '99.1vh', 
            position: 'relative', 
            backgroundColor: 'black', 
            color: 'white'
        }} className='background'>
            <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 100 }}>
                
            </div>
            <Threads amplitude={1} distance={0} enableMouseInteraction={true} />
            <TextPressure text="WELCOME" />
            <div style={{
                position: 'relative',
                top: '-560px',
                left: '50%',
                transform: 'translate(-50%, -50%) scale(1)',
                zIndex: 10, 
                color: 'var(--text-color)', 
                fontSize: '21px', 
                textAlign: 'center'
            }}>TO</div>
            <div style={{
                position: 'relative',
                top: '-550px',
                left: '50%',
                transform: 'translate(-50%, -50%) scale(2.5)',
                zIndex: 10
            }}>
                <GradientText
                    colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                    animationSpeed={3}
                    showBorder={false}
                    className="custom-class"
                >
                    STUDY-SYNC!
                </GradientText>
            </div>
            <div style={{ 
                height: '600px', 
                backgroundColor: 'black', 
                color: 'var(--text-color)', 
                display: 'flex', 
                justifyContent: 'center', 
                gap: '10px', 
                padding: '10px', 
                position: 'relative', 
                top: '-279px' 
            }}>
                <GooeyNav1
                    items={items}
                    particleCount={15}
                    particleDistances={[90, 10]}
                    particleR={100}
                    initialActiveIndex={0}
                    animationTime={600}
                    timeVariance={300}
                    colors={[1, 2, 3, 1, 2, 3, 1, 4]}
                    handlebutton={loginorsignup}
                />
            </div>
            {login === true && signup === false &&
                <div style={{ 
                    top: '-279px', 
                    backgroundColor: 'black', 
                    color: 'var(--text-color)', 
                    padding: '10px', 
                    position: 'relative' 
                }}>
                    <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
                        <LoginForm></LoginForm>
                    </SpotlightCard>
                </div>
            }
            {login === false && signup === true &&
                <div style={{ 
                    top: '-279px', 
                    backgroundColor: 'black', 
                    color: 'var(--text-color)', 
                    padding: '10px', 
                    position: 'relative' 
                }}>
                    <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
                        <SignupForm></SignupForm>
                    </SpotlightCard>
                </div>
            }
            <div style={{
                height: '500px',
                position: 'relative',
                top: '-430px',
                zIndex: 5,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100vw',
                margin: '0 auto'
            }}>
                <FlowingMenu items={demoItems} />
            </div>
            <div style={{ 
                height: '600px', 
                position: 'relative', 
                backgroundColor: 'black', 
                top: '-439px' 
            }}>
                <CircularGallery bend={3} textColor="var(--text-color)" borderRadius={0.05} />
            </div>
            <Footer></Footer>
        </div>
        </>
    );
}