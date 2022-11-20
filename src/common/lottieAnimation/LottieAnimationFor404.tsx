import  {useLottie} from 'lottie-react';
import groovyWalkAnimation from "./ton_duck_agadqrmaauj1qes.json";
import {CSSProperties} from 'react';


const style:CSSProperties = {
    overflow: 'hidden',
    borderRadius: 100,
    width: 450,
    height: 450,
    position:'absolute',
    bottom:-20,
    left:-40
};
export const Animation404 = () => {
    const options = {
        animationData: groovyWalkAnimation,
        loop: true,
        autoplay: true,
    }

    const { View } = useLottie(options, style);

    return View;
}