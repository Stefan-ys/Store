import React, { useState, useRef, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { FaInfoCircle } from 'react-icons/fa';
import styles from '../css/info-button.module.css';

const InfoButton = ({ text }) => {
    const ref = useRef(null);
    const [toggle, setToggle] = useState(true);
    const [style, animate] = useSpring(() => ({ height: "0px" }));

    useEffect(() => {
        animate({
            height: toggle ? `${ref.current.offsetHeight}px` : "0px",
        });
    }, [animate, ref, toggle]);

    return (
        <div className={styles.infoButtonContainer}>
            <button className={styles.infoButton} onClick={() => setToggle(!toggle)}>
                <FaInfoCircle className={styles.infoIcon} />
            </button>
            <animated.div className={styles.infoBox} style={style}>
                {toggle && <p className={styles.infoText} ref={ref}>{text}</p>}
            </animated.div>
        </div>
    );
}

export default InfoButton;
