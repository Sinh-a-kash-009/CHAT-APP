import React from 'react';
import { gsap } from 'gsap';
import '../App.css';

function FlowingMenu({ items = [] }) {
  return (
    <div className="menu-wrap" style={{ 
      width: '100%',
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: 'black',
      borderRadius: '10px',
      padding: '20px'
    }}>
      <nav className="menu" style={{ height: '100%' }}>
        {items.map((item, idx) => (
          <MenuItem key={idx} {...item} />
        ))}
      </nav>
    </div>
  );
}

function MenuItem({ link, text, image }) {
  const itemRef = React.useRef(null);
  const marqueeRef = React.useRef(null);
  const marqueeInnerRef = React.useRef(null);

  const animationDefaults = { duration: 0.6, ease: 'expo' };

  const findClosestEdge = (mouseX, mouseY, width, height) => {
    const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
    const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  const distMetric = (x, y, x2, y2) => {
    const xDiff = x - x2;
    const yDiff = y - y2;
    return xDiff * xDiff + yDiff * yDiff;
  };

  const handleMouseEnter = (ev) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap.timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
  };

  const handleMouseLeave = (ev) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap.timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0);
  };

  const repeatedMarqueeContent = Array.from({ length: 8 }).map((_, idx) => (
    <React.Fragment key={idx}>
      <span style={{
        color: '#181818',
        whiteSpace: 'nowrap',
        textTransform: 'uppercase',
        fontWeight: 500,
        fontSize: '2rem',
        lineHeight: '1.2',
        padding: '0 40px',
        fontFamily: 'Montserrat, Arial, sans-serif',
        letterSpacing: '0.05em',
        display: 'inline-block',
        verticalAlign: 'middle'
      }}>{text}</span>
      <div
        className="marquee__img"
        style={{
          backgroundImage: `url(${image})`,
        }}
      />
    </React.Fragment>
  ));

  return (
    <div className="menu__item" ref={itemRef} style={{ 
      flex: 1, 
      position: 'relative', 
      overflow: 'hidden', 
      textAlign: 'center', 
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      minHeight: '80px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <a
        className="menu__item-link"
        href={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          position: 'relative',
          cursor: 'pointer',
          textTransform: 'uppercase',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          fontWeight: '600',
          color: '#fff',
          fontSize: '2rem',
          zIndex: 2
        }}
      >
        {text}
      </a>
      <div className="marquee" ref={marqueeRef} style={{
        position: 'absolute',
        top: 0,
        left: 0,
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        background: '#fff',
        transform: 'translate3d(0, 101%, 0)',
        transition: 'transform 0.6s ease-expo',
        zIndex: 1
      }}>
        <div className="marquee__inner-wrap" ref={marqueeInnerRef} style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          transform: 'translateX(0)'
        }}>
          <div className="marquee__inner" aria-hidden="true" style={{
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            height: '100%',
            width: '100%',
            willChange: 'transform',
            animation: 'marquee 20s linear infinite'
          }}>
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
}

export {FlowingMenu};
